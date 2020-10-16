import * as Google from "expo-google-app-auth";
import { firebase } from "../firebase/config";
import firebaseUtils from "../firebase/firebaseUtils";
import firebaseStorage from "../firebase/firebaseStorage";
import { ANDROID_CLIENT_ID } from "@env";

const usersRef = firebase.firestore().collection("users");

const retrievePersistedAuthUser = () => {
  // check if there is a token persisted already in AsyncStorage
  return new Promise((resolve) => {
    return firebase.auth().onAuthStateChanged((response) => {
      if (response) {
        const { uid } = response;
        // access our firestore to get additional information regarding this user
        usersRef
          .doc(uid)
          .get()
          .then((document) => {
            const userData = document.data();
            resolve({
              user: { ...userData, id: uid, userID: uid },
              accountCreated: false,
            });
          });
        return;
      } else {
        return resolve({ user: null });
      }
    });
  });
};

const signinWithGoogleAsync = () => {
  return new Promise(async (resolve) => {
    try {
      const result = await Google.logInAsync({
        androidClientId: ANDROID_CLIENT_ID,
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        const userData = await signinWithGoogleFirebase(result);
        return resolve(userData);
      } else {
        return resolve({ cancelled: true });
      }
    } catch (e) {
      return resolve({ error: true });
    }
  });
};

const signinWithGoogleFirebase = (googleUser) => {
  return new Promise(async (resolve) => {
    // console.log("Google Auth Response", googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged(function (firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!firebaseUtils.isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          const credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInWithCredential(credential)
            .then(async (response) => {
              const isNewUser = response.additionalUserInfo.isNewUser;
              const {
                given_name,
                family_name,
              } = response.additionalUserInfo.profile;
              const { uid, email, phoneNumber, photoURL } = response.user;

              if (isNewUser) {
                // get the current timestamp
                const timestamp = firebase.firestore.FieldValue.serverTimestamp();
                const user = {
                  uid,
                  firstName: given_name,
                  lastName: family_name,
                  email,
                  phoneNumber,
                  photoURL,
                  timestamp,
                };

                // add user to firestore
                const userResult = await firebaseUtils.addUserToFirestore(user);
                resolve(userResult);
              }
            })
            // error passed in as an argument
            .catch((e) => {
              console.log(e);
              // Handle Errors here.
              // const errorCode = error.code;
              // const  errorMessage = error.message;
              // The email of the user's account used.
              // const email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              // const credential = error.credential;
              // ...
            });
        } else {
          // if the user is equal (has already logged in via Firebase authentication system)
          const { uid } = firebaseUser;
          usersRef
            .doc(uid)
            .get()
            .then((document) => {
              const userData = document.data();
              resolve({
                user: { ...userData, id: uid, userID: uid },
                accountCreated: false,
              });
            });
        }
      });
  });
};

const createAccountWithEmailAndPassword = (userDetails) => {
  // main function representing promise for creating account
  const accountCreationTask = (userDetails) => {
    return new Promise((resolve) => {
      const { email, password, photoURI } = userDetails;
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async (response) => {
          const timestamp = firebase.firestore.FieldValue.serverTimestamp();
          // grab the user uid from firebase authentication
          const uid = response.user.uid;

          const user = { uid, email, timestamp };
          const userResult = await firebaseUtils.addUserToFirestore(user);

          // if a custom photoURI is provided (from the local device)
          if (photoURI) {
            firebaseStorage
              .uploadImageAsync(photoURI)
              .then(async (response) => {
                if (response.error) {
                  // handling upload file/photo error
                  // should still log user in - but profile photo url not updated?
                } else {
                  // handling upload file success
                  // we now have the correct file url hosted in firebase storage
                  const downloadURL = response.downloadURL;
                  await firebaseUtils.updateProfilePicture(uid, downloadURL);
                  userResult.user.profilePictureURL = downloadURL;
                  resolve(userResult);
                }
              });
          } else {
            // no custom photo to be uploaded - just return the user
            resolve(userResult);
          }
        })
        .catch(function (error) {
          // Handle Errors here.
          // when we fail to sign in with firebase authentication
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode == "auth/weak-password") {
            resolve({ error: "The password is too weak." });
          } else {
            resolve({ error: errorMessage });
          }
        });
    });
  };

  return new Promise(async (resolve) => {
    const userResult = await accountCreationTask(userDetails);
    resolve(userResult);
  });
};

const authManager = {
  retrievePersistedAuthUser,
  signinWithGoogleAsync,
  createAccountWithEmailAndPassword,
};

export default authManager;
