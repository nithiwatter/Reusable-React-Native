import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBtsKFSaNkFS5YGPUAWEas8PZh_jVHguQk",
  authDomain: "reusable-react-native.firebaseapp.com",
  databaseURL: "https://reusable-react-native.firebaseio.com",
  projectId: "reusable-react-native",
  storageBucket: "reusable-react-native.appspot.com",
  messagingSenderId: "1093895850743",
  appId: "1:1093895850743:web:1c4b61430350f2daf1a1f2",
  measurementId: "G-KLS9BRTMVB",
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

export { firebase };
