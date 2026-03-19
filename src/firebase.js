// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRTkwyvnLLc_YoDP8iIr9J1nCoMjh_AUQ",
  authDomain: "sinergia-salud-integral.firebaseapp.com",
  projectId: "sinergia-salud-integral",
  storageBucket: "sinergia-salud-integral.firebasestorage.app",
  messagingSenderId: "459970609387",
  appId: "1:459970609387:web:6d3fc0994589e9c6943eae",
  measurementId: "G-B28BF3XSHP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);