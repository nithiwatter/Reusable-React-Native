import { firebase } from "../firebase/config";

const usersRef = firebase.firestore().collection("users");

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

const getUserFromFirestore = (uid) => {
  return new Promise((resolve) => {
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
        return resolve({ error });
      });
  });
};

const updateUserToFirestore = (uid, updatedData) => {
  return new Promise((resolve) => {
    usersRef
      .doc(uid)
      .update({ ...updatedData })
      .then(() => {
        const updatedUserRef = usersRef.doc(uid);
        updatedUserRef.get().then((doc) => {
          return resolve({ success: true, updatedUser: doc.data() });
        });
      })
      .catch((error) => {
        return resolve({ error });
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

export default {
  addUserToFirestore,
  getUserFromFirestore,
  updateProfilePicture,
  updateUserToFirestore,
  isUserEqual,
};
