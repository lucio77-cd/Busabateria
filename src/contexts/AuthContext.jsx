import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tipo, setTipo] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (usuarioAtual) => {
      if (usuarioAtual) {
        setUser(usuarioAtual);
        try {
          const snap = await getDoc(doc(db, 'usuarios', usuarioAtual.uid));
          setTipo(snap.exists() ? snap.data().tipo : null);
        } catch (error) {
          console.error('Erro ao buscar tipo do usuário:', error.message);
          setTipo(null);
        }
      } else {
        setUser(null);
        setTipo(null);
      }
      setCarregando(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, tipo, carregando }}>
      {children}
    </AuthContext.Provider>
  );
};
