import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firestore";

export async function buscarUsuario(uid) {
  const snap = await getDoc(doc(db, "usuarios", uid));
  return snap.exists() ? snap.data() : null;
}

export function criarUsuario(uid, dados) {
  return setDoc(doc(db, "usuarios", uid), { ...dados });
}
