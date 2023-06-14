// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWUP3a9k10iJ3aEjL7bgQQ27lkHqV3Jj0",
  authDomain: "react-chat-241a2.firebaseapp.com",
  projectId: "react-chat-241a2",
  storageBucket: "react-chat-241a2.appspot.com",
  messagingSenderId: "444481245679",
  appId: "1:444481245679:web:ea5aca28b51684bdb0a61a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);