import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
console.log(process.env.REACT_APP_APIKEY);

const app = firebase.initializeApp({});

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
