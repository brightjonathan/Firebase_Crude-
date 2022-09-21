import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyA6NIkmIUqaN5bA0od95FNlGtkdP4wH0ak",
  authDomain: "fileupload-4d58e.firebaseapp.com",
  projectId: "fileupload-4d58e",
  storageBucket: "fileupload-4d58e.appspot.com",
  messagingSenderId: "419031689169",
  appId: "1:419031689169:web:a27a6ff7e418dcaf10e2f0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
export const db = getFirestore(app); // for storing data into firestore 

