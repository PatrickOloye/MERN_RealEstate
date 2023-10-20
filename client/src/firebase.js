// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// apiKey: "AIzaSyCMNhmUOB1a2HgY_Td6XaPTYl4a1Vr7hAk",
const firebaseConfig = {
  // apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  apiKey: "AIzaSyCMNhmUOB1a2HgY_Td6XaPTYl4a1Vr7hAk",
  authDomain: "realestate-mern-4b0bb.firebaseapp.com",
  projectId: "realestate-mern-4b0bb",
  storageBucket: "realestate-mern-4b0bb.appspot.com",
  messagingSenderId: "813618239823",
  appId: "1:813618239823:web:c697a84b2aa4791a0b8d3a"
};

// Initialize Firebase
export  const app = initializeApp(firebaseConfig);