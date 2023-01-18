import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_SENDERID,
  appId: process.env.REACT_APP_APPID,
});

export const auth = app.auth();
export const firestore = firebase.firestore();
export default app;

export async function createUserDocument(user) {
  const firestore = firebase.firestore();

  const data = {
    UniqueID: user.uid,
    Street: "",
    PostalCode: "",
    City: "",
    Country: "",
    DateCreated: new Date(),
  };

  return firestore.collection("users").doc(user.uid).set(data);
}
