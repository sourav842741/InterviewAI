
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
 authDomain: "interviewai-60908.firebaseapp.com",
  projectId: "interviewai-60908",
  storageBucket: "interviewai-60908.firebasestorage.app",
  messagingSenderId: "522991448122",
  appId: "1:522991448122:web:1de0412678002a64de4503"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export {auth , provider}