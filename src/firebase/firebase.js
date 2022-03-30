import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBV5RJwlxpGoe8en_Vz7uV9UeEu2RG1Ga8",
  authDomain: "fir-app-a710e.firebaseapp.com",
  projectId: "fir-app-a710e",
  storageBucket: "fir-app-a710e.appspot.com",
  messagingSenderId: "277573945401",
  appId: "1:277573945401:web:bc834c372e5cd90a8a25e8",
};
// initialize firebase app
const app = initializeApp(firebaseConfig);

// initialize services

export const db = getFirestore(app);

// initailizing auth service
export const auth = getAuth(app);
