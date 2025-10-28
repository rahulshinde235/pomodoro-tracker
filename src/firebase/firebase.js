import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBuDpWrQdNSX1KrAiMqf-eizOLXWcF7KP0",
  authDomain: "pomofocus-9d8c5.firebaseapp.com",
  projectId: "pomofocus-9d8c5",
  storageBucket: "pomofocus-9d8c5.firebasestorage.app",
  messagingSenderId: "1088519550319",
  appId: "1:1088519550319:web:20010e6732dbbf7c0e649a",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
