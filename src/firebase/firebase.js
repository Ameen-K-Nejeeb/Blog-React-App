// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Use full Firestore for real-time features
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDW2swgV1w4GFJ4fS0UKayRC89LprRnrGc",
  authDomain: "blog-app-a70ab.firebaseapp.com",
  projectId: "blog-app-a70ab",
  storageBucket: "blog-app-a70ab.firebasestorage.app",
  messagingSenderId: "453959222514",
  appId: "1:453959222514:web:f9a67467ef61230df1bc6b",
  measurementId: "G-8C0X25NMEF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export instances with "export const" for named imports
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);