import * as Google from "expo-google-app-auth";
import { firebase } from "../firebase/config";
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

const addUserToFirestore = (user) => {
  const {
    uid,
    firstName,
    lastName,
    email,
    phoneNumber,
    photoURL,
    timestamp,
  } = user;

  return new Promise((resolve) => {
    const userData = {
      id: uid,
      email: email || "",
      firstName: firstName || "",
      lastName: lastName || "",
      phone: phoneNumber || "",
      profilePictureURL: photoURL || "",
      userID: uid,
      created_at: timestamp,
      createdAt: timestamp,
    };

    // save this user to the firestore collection
    usersRef
      .doc(uid)
      .set(userData)
      .then(() => {
        resolve({
          user: { ...userData, id: uid, userID: uid },
          accountCreated: true,
        });
      });
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
        if (!isUserEqual(googleUser, firebaseUser)) {
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
                const userResult = await addUserToFirestore(user);
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

const isUserEqual = (googleUser, firebaseUser) => {
  if (firebaseUser) {
    const providerData = firebaseUser.providerData;
    for (let i = 0; i < providerData.length; i++) {
      if (
        // googleUser returned by/redirected from expo browser
        // check if this id has already been registered in our firebase authentication server
        providerData[i].providerId ===
          firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
        providerData[i].uid === googleUser.user.id
      ) {
        // We don't need to reauth the Firebase connection.
        return true;
      }
    }
  }
  return false;
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
          const userResult = await addUserToFirestore(user);

          // if a custom photoURI is provided (from the local device)
          if (photoURI) {
            firebaseStorage
              .uploadImageAsync(photoURI)
              .then(async (response) => {
                if (response.error) {
                  // handling upload file error
                  // will need to handle this later
                } else {
                  // handling upload file success
                  // we now have the correct file url hosted in firebase storage
                  const downloadURL = response.downloadURL;
                  await updateProfilePicture(uid, downloadURL);
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

const updateProfilePicture = (userId, downloadURI) => {
  return new Promise((resolve) => {
    usersRef
      .doc(userId)
      .update({ profilePictureURL: downloadURI })
      .then(() => {
        resolve({ success: true });
      })
      .catch((error) => {
        resolve({ error });
      });
  });
};

const authManager = {
  retrievePersistedAuthUser,
  signinWithGoogleAsync,
  createAccountWithEmailAndPassword,
};

export default authManager;
