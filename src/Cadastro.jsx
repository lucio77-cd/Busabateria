import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase.config'; // Importando seu config
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import './Home.css';

const Cadastro = ({ mode }) => {
  const navigate = useNavigate();
  const isLogin = mode === 'login';

  const loginComGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Usuário logado:", result.user);
      navigate('/'); // Volta para a home após logar
    } catch (error) {
      console.error("Erro ao logar com Google:", error.message);
      alert("Erro ao acessar com Google. Tente novamente.");
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

        {/* BOTÃO DO GOOGLE - O DESTAQUE DO VAPT-VUPT */}
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

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input type="email" placeholder="E-mail" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #333', background: '#0a0a0a', color: 'white' }} />
          <input type="password" placeholder="Senha" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #333', background: '#0a0a0a', color: 'white' }} />
          
          <button className="btn-buscar" style={{ padding: '12px', borderRadius: '8px' }}>
            {isLogin ? 'ACESSAR' : 'CADASTRAR'}
          </button>
        </div>

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

