
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCcJQZjP3LmK3o8c6kFyMG85h6gK4rjxnw",
  authDomain: "notes-app-bd632.firebaseapp.com",
  projectId: "notes-app-bd632",
  storageBucket: "notes-app-bd632.appspot.com",
  messagingSenderId: "242371127581",
  appId: "1:242371127581:web:9a370db1a7024efc24d9f4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);