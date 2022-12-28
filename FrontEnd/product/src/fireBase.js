// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC9IFq8k9KgiUs-CjL8y2T9Quxxsytxzr0",
    authDomain: "blogs-fd812.firebaseapp.com",
    projectId: "blogs-fd812",
    storageBucket: "blogs-fd812.appspot.com",
    messagingSenderId: "920274053365",
    appId: "1:920274053365:web:d7476607018be54bd1fdbc",
    measurementId: "G-QGK0MYPGGX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);