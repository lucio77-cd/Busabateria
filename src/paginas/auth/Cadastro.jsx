import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase/config';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import '../../estilos/Home.css';

const Cadastro = ({ mode }) => {
  const navigate = useNavigate();
  const isLogin = mode === 'login';

  const [tipo, setTipo] = useState(null); // "cliente" | "loja"
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const redirecionar = (tipoUsuario) => {
    if (tipoUsuario === 'loja') {
      navigate('/admin/cadastrar');
    } else {
      navigate('/');
    }
  };

  const loginComGoogle = async () => {
    if (!isLogin && !tipo) {
      alert("Escolha se você é Cliente ou Loja antes de continuar.");
      return;
    }

    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const uid = result.user.uid;
      const userRef = doc(db, "usuarios", uid);
      const userSnap = await getDoc(userRef);

      let tipoFinal;
      if (!userSnap.exists()) {
        tipoFinal = tipo || 'cliente';
        await setDoc(userRef, {
          nome: result.user.displayName || '',
          email: result.user.email,
          tipo: tipoFinal,
          dataCadastro: serverTimestamp()
        });
      } else {
        tipoFinal = userSnap.data().tipo;
      }

      redirecionar(tipoFinal);
    } catch (error) {
      console.error("Erro ao logar com Google:", error.message);
      alert("Erro ao acessar com Google. Tente novamente.");
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const result = await signInWithEmailAndPassword(auth, email, senha);
        const userSnap = await getDoc(doc(db, "usuarios", result.user.uid));
        redirecionar(userSnap.exists() ? userSnap.data().tipo : 'cliente');
      } else {
        if (!tipo) {
          alert("Escolha se você é Cliente ou Loja antes de continuar.");
          return;
        }
        const result = await createUserWithEmailAndPassword(auth, email, senha);
        await setDoc(doc(db, "usuarios", result.user.uid), {
          nome: '',
          email,
          tipo,
          dataCadastro: serverTimestamp()
        });
        redirecionar(tipo);
      }
    } catch (error) {
      console.error("Erro no cadastro/login:", error.message);
      alert("Erro: " + error.message);
    }
  };

  return (
    <div className="home-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div style={{ textAlign: 'center', width: '90%', maxWidth: '400px', background: '#1a1a1a', padding: '40px', borderRadius: '15px', border: '1px solid #FF4500' }}>
        <div className="logo" style={{ marginBottom: '20px', cursor: 'pointer' }} onClick={() => navigate('/')}>
          BUSCA<span>BAT</span>
        </div>
        
        <h2 style={{ color: 'white', marginBottom: '20px' }}>
          {isLogin ? 'Entrar na Conta' : 'Criar Nova Conta'}
        </h2>

        {!isLogin && (
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <button
              type="button"
              onClick={() => setTipo('cliente')}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '8px',
                border: tipo === 'cliente' ? '2px solid #FF4500' : '1px solid #333',
                background: tipo === 'cliente' ? '#2a1000' : '#0a0a0a',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              Sou Cliente
            </button>
            <button
              type="button"
              onClick={() => setTipo('loja')}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '8px',
                border: tipo === 'loja' ? '2px solid #FF4500' : '1px solid #333',
                background: tipo === 'loja' ? '#2a1000' : '#0a0a0a',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              Sou Loja
            </button>
          </div>
        )}

        <button 
          onClick={loginComGoogle}
          style={{ 
            width: '100%', 
            padding: '12px', 
            borderRadius: '8px', 
            border: '1px solid #ffffff', 
            background: 'white', 
            color: '#000', 
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="20" alt="google" />
          {isLogin ? 'Entrar com Google' : 'Cadastrar com Google'}
        </button>

        <div style={{ color: '#555', marginBottom: '20px' }}>———— ou ————</div>

        <form onSubmit={handleEmailSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #333', background: '#0a0a0a', color: 'white' }}
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            minLength={6}
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #333', background: '#0a0a0a', color: 'white' }}
          />

          <button type="submit" className="btn-buscar" style={{ padding: '12px', borderRadius: '8px' }}>
            {isLogin ? 'ACESSAR' : 'CADASTRAR'}
          </button>
        </form>

        <p style={{ color: '#a1a1aa', marginTop: '20px', fontSize: '0.9rem' }}>
          {isLogin ? 'Não tem conta?' : 'Já tem conta?'} 
          <span 
            onClick={() => navigate(isLogin ? '/registrar' : '/login')} 
            style={{ color: '#FF4500', cursor: 'pointer', marginLeft: '5px', fontWeight: 'bold' }}
          >
            {isLogin ? 'Cadastre-se' : 'Faça Login'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Cadastro;
