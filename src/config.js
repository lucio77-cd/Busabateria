import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyANJCB3peETT_RsdQz9zN8Fb5DZbveiEVk",
  authDomain: "busca--bat.firebaseapp.com",
  projectId: "busca--bat",
  storageBucket: "busca--bat.firebasestorage.app",
  messagingSenderId: "780453102818",
  appId: "1:780453102818:web:b90f577a5a1114084d0abb",
  measurementId: "G-K5SNBTLXE3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

