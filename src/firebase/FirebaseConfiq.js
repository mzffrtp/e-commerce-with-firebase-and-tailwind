/*

import "firebase/storage"
*/

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYNMipg0_NxF46GZA7683hG4Adv7zVvcw",
  authDomain: "e-commerce-with-react-redu.firebaseapp.com",
  projectId: "e-commerce-with-react-redu",
  storageBucket: "e-commerce-with-react-redu.appspot.com",
  messagingSenderId: "742480657204",
  appId: "1:742480657204:web:400b54b4f370f2e06f0361"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// authentication
const auth = getAuth(app);
const providerGoogle = new GoogleAuthProvider();

const userInfo = getFirestore(app);


/*

const storage = firebase.storage(); */

export {auth, providerGoogle, userInfo}