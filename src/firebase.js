import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCiJ_csy4dFuYqYHuNc9xus4_yo_yHYHZQ",
  authDomain: "onus-cdbb0.firebaseapp.com",
  projectId: "onus-cdbb0",
  storageBucket: "onus-cdbb0.firebasestorage.app",
  messagingSenderId: "393535021899",
  appId: "1:393535021899:web:debd085aa3cde482463ece",
  measurementId: "G-WNDS8C7BN2",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
