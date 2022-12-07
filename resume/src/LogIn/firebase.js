// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByN7DhMcDhkqo3gzBUCnvm9nsSArtCIaM",
  authDomain: "resume-68edd.firebaseapp.com",
  projectId: "resume-68edd",
  storageBucket: "resume-68edd.appspot.com",
  messagingSenderId: "850817282125",
  appId: "1:850817282125:web:3bb9298c49d7e3c0f06c04"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)
export default getFirestore();