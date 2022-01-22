// Import the functions you need from the SDKs you need

import firebase from "firebase/compat/app";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyCzqu-uyn1sWXsMqh5zzWU-2mfF_9TRs7Q",

  authDomain: "mern-auth-2b1f6.firebaseapp.com",

  projectId: "mern-auth-2b1f6",

  storageBucket: "mern-auth-2b1f6.appspot.com",

  messagingSenderId: "964893376843",

  appId: "1:964893376843:web:adab01a517a632b05ce8ce"

};


// Initialize Firebase

export const app = firebase.initializeApp(firebaseConfig);