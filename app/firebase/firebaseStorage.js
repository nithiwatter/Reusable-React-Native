import { firebase } from "./config";
import ErrorCode from "../config/errorCode";

const getBlob = async (uri) => {
  return await new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      resolve(xhr.response);
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });
};

const uploadImageAsync = async (uri) => {
  // official Expo example of how to upload images as blob to firebase storage
  return new Promise(async (resolve, _reject) => {
    console.log("uri: ", uri);
    // use filename as uuid for the storage image instance
    const filename = uri.substring(uri.lastIndexOf("/") + 1);
    // get the blob as a response from http request
    const blob = await getBlob(uri);

    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(filename);
    const uploadTask = fileRef.put(blob);

    // official way to upload to firebase storage
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // observe the progress of uploading this snapshot
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        // for file upload error
        console.log("upload error:", error);
        resolve({ error: ErrorCode.photoUploadFailed });
      },
      () => {
        // for file upload success
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("File available at", downloadURL);
          resolve({ downloadURL: downloadURL });
        });
      }
    );
  });
};

export default { uploadImageAsync };
