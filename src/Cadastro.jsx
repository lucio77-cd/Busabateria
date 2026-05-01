import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Cadastro = ({ mode }) => {
  const navigate = useNavigate();
  const isLogin = mode === 'login';

  return (
    <div className="home-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div style={{ textAlign: 'center', width: '90%', maxWidth: '400px', background: '#1a1a1a', padding: '40px', borderRadius: '15px', border: '1px solid #FF4500' }}>
        <div className="logo" style={{ marginBottom: '20px', cursor: 'pointer' }} onClick={() => navigate('/')}>
          BUSCA<span>BAT</span>
        </div>
        
        <h2 style={{ color: 'white', marginBottom: '20px' }}>
          {isLogin ? 'Entrar na Conta' : 'Criar Nova Conta'}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {!isLogin && <input type="text" placeholder="Nome Completo" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #333', background: '#0a0a0a', color: 'white' }} />}
          <input type="email" placeholder="E-mail" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #333', background: '#0a0a0a', color: 'white' }} />
          <input type="password" placeholder="Senha" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #333', background: '#0a0a0a', color: 'white' }} />
          
          <button className="btn-buscar" style={{ padding: '12px', borderRadius: '8px', marginTop: '10px' }}>
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
