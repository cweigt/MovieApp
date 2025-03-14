// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3iYjQ9kC7mRuekKXvheWlSVsbRBBR1Mw",
  authDomain: "movieapp-4aa9b.firebaseapp.com",
  databaseURL: "https://movieapp-4aa9b-default-rtdb.firebaseio.com",
  projectId: "movieapp-4aa9b",
  storageBucket: "movieapp-4aa9b.firebasestorage.app",
  messagingSenderId: "241823742767",
  appId: "1:241823742767:web:12c50f0393b123b17affda",
  measurementId: "G-HBY69K0ZCF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };
