import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/auth";
import { buscarUsuario } from "../servicos/usuarioService";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [role, setRole] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const dados = await buscarUsuario(firebaseUser.uid);
        setUsuario(firebaseUser);
        setRole(dados?.role ?? null);
      } else {
        setUsuario(null);
        setRole(null);
      }
      setCarregando(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, role, carregando }}>
      {children}
    </AuthContext.Provider>
  );
}
