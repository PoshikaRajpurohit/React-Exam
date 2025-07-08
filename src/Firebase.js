
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDpA7KQUPHjFVPLLiQ4mGG8tvx2kf4dg3s",
  authDomain: "hotel-management-5d6ae.firebaseapp.com",
  projectId: "hotel-management-5d6ae",
  storageBucket: "hotel-management-5d6ae.firebasestorage.app",
  messagingSenderId: "594180734252",
  appId: "1:594180734252:web:07e04dc8deede9d6c24089",
  measurementId: "G-B1B59ZM8RS"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);