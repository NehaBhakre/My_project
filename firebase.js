import * as firebase from "firebase/app";
import { auth } from 'firebase/app';


const firebaseConfig = {
    apiKey: "AIzaSyA7sWqTmcUX-8Tu4tLCydFalAxLnZgej3Q",
    authDomain: "otp-demo-7ced7.firebaseapp.com",
    projectId: "otp-demo-7ced7",
    storageBucket: "otp-demo-7ced7.appspot.com",
    messagingSenderId: "422189147365",
    appId: "1:422189147365:web:3a06495f19be8ebbb9a00c"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;
