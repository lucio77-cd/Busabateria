import {
  collection, addDoc, updateDoc, deleteDoc, doc,
  query, where, getDocs, limit, orderBy,
} from "firebase/firestore";
import { db } from "../firebase/firestore";

export async function listarBateriasPorLoja(lojaId) {
  const q = query(
    collection(db, "baterias"),
    where("lojaId", "==", lojaId),
    orderBy("criadoEm", "desc"),
    limit(50)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export function criarBateria(lojaId, dados) {
  return addDoc(collection(db, "baterias"), {
    lojaId,
    marca: dados.marca,
    modelosCompativeis: dados.modelosCompativeis,
    precoCentavos: Math.round(Number(dados.preco) * 100),
    estoque: Number(dados.estoque),
    criadoEm: new Date(),
  });
}

export function atualizarBateria(bateriaId, dados) {
  const payload = { ...dados };
  if (dados.preco !== undefined) {
    payload.precoCentavos = Math.round(Number(dados.preco) * 100);
    delete payload.preco;
  }
  if (dados.estoque !== undefined) payload.estoque = Number(dados.estoque);
  return updateDoc(doc(db, "baterias", bateriaId), payload);
}

export function excluirBateria(bateriaId) {
  return deleteDoc(doc(db, "baterias", bateriaId));
}
