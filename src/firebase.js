// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCI7zl2SRNW01xqXN0H8YIRrpCS9JpApfo",
  authDomain: "chat-app-full-version-8c250.firebaseapp.com",
  projectId: "chat-app-full-version-8c250",
  storageBucket: "chat-app-full-version-8c250.appspot.com",
  messagingSenderId: "244690319585",
  appId: "1:244690319585:web:725f779893adb0ddb35fa0",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
