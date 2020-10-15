import * as Google from "expo-google-app-auth";
import { firebase } from "../firebase/config";
import { ANDROID_CLIENT_ID } from "@env";

const retrievePersistedAuthUser = () => {
  // check if there is a token persisted already in AsyncStorage
  return new Promise((resolve) => {
    return firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        return resolve(user);
      } else {
        return resolve(null);
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
        const res = await signinWithGoogleFirebase(result);
        console.log(res);
        console.log("---------");
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
            .then((result) => {
              console.log("User signed-in successfully");
              resolve(result);
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
          resolve(1);
          console.log("User already signed-in Firebase.");
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

const authManager = { retrievePersistedAuthUser, signinWithGoogleAsync };

export default authManager;
