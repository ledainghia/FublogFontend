import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBhwLJds7XoVRGr5WDhR70PlPq4RFVJRFg",
  authDomain: "fublog-6a7cf.firebaseapp.com",
  projectId: "fublog-6a7cf",
  storageBucket: "fublog-6a7cf.appspot.com",
  messagingSenderId: "1049392706843",
  appId: "1:1049392706843:web:f566b2b843fc8a0e14cfbe",
  measurementId: "G-CX3TEFL2HJ",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
