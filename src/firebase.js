// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1tNuns3qnCDQKGjTaI5CPmbF5Y19235Q",
  authDomain: "chat-app-deploy.firebaseapp.com",
  projectId: "chat-app-deploy",
  storageBucket: "chat-app-deploy.appspot.com",
  messagingSenderId: "778363721980",
  appId: "1:778363721980:web:a492bdf27aa9d0a6439f79",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
