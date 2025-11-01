import firebase from 'firebase/app';
import 'firebase/auth';  
import 'firebase/firestore';  
import 'firebase/functions'; 

const firebaseConfig = {
    apiKey: "AIzaSyD8vEDTgw2KZ6BQW3lI30xv0hQ998WbJEI",
    authDomain: "samsonadidela-cmsc5373.firebaseapp.com",
    projectId: "samsonadidela-cmsc5373",
    storageBucket: "samsonadidela-cmsc5373.firebasestorage.app",
    messagingSenderId: "141101084587",
    appId: "1:141101084587:web:9c815f0a565b12833f6cee"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebaseApp.auth();
const firestore = firebaseApp.firestore();
const functions = firebaseApp.functions();

export { auth, firestore, functions };
