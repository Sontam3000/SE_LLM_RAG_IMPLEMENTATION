import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyD8vEDTgw2KZ6BQW3lI30xv0hQ998WbJEI",
    authDomain: "samsonadidela-cmsc5373.firebaseapp.com",
    projectId: "samsonadidela-cmsc5373",
    storageBucket: "samsonadidela-cmsc5373.firebasestorage.app",
    messagingSenderId: "141101084587",
    appId: "1:141101084587:web:9c815f0a565b12833f6cee"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app); 
export const storage = getStorage(app);