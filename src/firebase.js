import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const app = firebase.initializeApp({
  apiKey: "AIzaSyCNcjQC6KdwcZ29BEdO_XgmWS44YQc6JmA",
  authDomain: "veggiexpress-74a47.firebaseapp.com",
  databaseURL: "https://veggiexpress-74a47-default-rtdb.firebaseio.com",
  projectId: "veggiexpress-74a47",
  storageBucket: "veggiexpress-74a47.appspot.com",
  messagingSenderId: "426954000328",
  appId: "1:426954000328:web:1aafe5206e0817b482a2fd",
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
