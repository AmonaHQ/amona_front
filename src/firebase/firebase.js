import firebase from 'firebase/app'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyD5N43wqEU4fqgShlq_0LSZm2Tqdk-vN4M",
    authDomain: "amona-front.firebaseapp.com",
    projectId: "amona-front",
    storageBucket: "amona-front.appspot.com",
    messagingSenderId: "129160297455",
    appId: "1:129160297455:web:367ac3094780ec0493141a",
    measurementId: "G-FFYDLW9XQM"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  const storage = firebase.storage()


export  {
   storage, firebase as default
 }
