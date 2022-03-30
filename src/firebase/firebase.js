import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};
// initialize firebase app
const app = initializeApp(firebaseConfig);

// initialize services

export const db = getFirestore(app);

// initailizing auth service
export const auth = getAuth(app);
