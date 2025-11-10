import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDAJusAIxSBm55rCIbOxvjalRwXyshbKT4",
  authDomain: "habbit-tracker-5ca57.firebaseapp.com",
  projectId: "habbit-tracker-5ca57",
  storageBucket: "habbit-tracker-5ca57.firebasestorage.app",
  messagingSenderId: "982641129101",
  appId: "1:982641129101:web:3862769e170df6af3b94c4"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
