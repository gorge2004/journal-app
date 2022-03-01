import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey:  process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIRABASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
/* const firebaseConfigTesting = {
  apiKey: "AIzaSyC-WDC12CbEMZmeEb9TpVrHsK6ep56e9iM",
  authDomain: "testing-app-b2135.firebaseapp.com",
  projectId: "testing-app-b2135",
  storageBucket: "testing-app-b2135.appspot.com",
  messagingSenderId: "126330098273",
  appId: "1:126330098273:web:03242c44df25576ef95020"
}; */

/* if (process.env.NODE_ENV === 'test') {
  //testing environment
firebase.initializeApp(firebaseConfigTesting);

}else{
  //dev/prod
  firebase.initializeApp(firebaseConfig);
} */
// Initialize Firebase

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
