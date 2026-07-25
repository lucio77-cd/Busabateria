import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { app } from "./config";

export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export function login(email, senha) {
  return signInWithEmailAndPassword(auth, email, senha);
}

export function loginComGoogle() {
  return signInWithPopup(auth, googleProvider);
}

export function logout() {
  return signOut(auth);
}

export function cadastrar(email, senha) {
  return createUserWithEmailAndPassword(auth, email, senha);
}
