import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyB4re54cb3SmA6hdg6EdpDt1m-u62WCMtk",
    authDomain: "nifty-jet-389015.firebaseapp.com",
    projectId: "nifty-jet-389015",
    storageBucket: "nifty-jet-389015.appspot.com",
    messagingSenderId: "418515988040",
    appId: "1:418515988040:web:d662a50e4a1e3abb1e327d"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export {db}