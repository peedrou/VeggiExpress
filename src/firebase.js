import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyCNcjQC6KdwcZ29BEdO_XgmWS44YQc6JmA",
  authDomain: "veggiexpress-74a47.firebaseapp.com",
  projectId: "veggiexpress-74a47",
  storageBucket: "veggiexpress-74a47.appspot.com",
  messagingSenderId: "426954000328",
  appId: "1:426954000328:web:1aafe5206e0817b482a2fd",

  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

export const auth = app.auth();
export default app;
