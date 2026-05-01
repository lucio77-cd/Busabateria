import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="logo">BUSCA<span>BAT</span></div>
        <button onClick={() => navigate('/login')} className="btn-login">Login</button>
      </nav>

      <main className="hero">
        <div className="raio-container">
          <svg viewBox="0 0 24 24" className="raio-icon">
            <path d="M13 10V3L4 14H11V21L20 10H13Z" />
          </svg>
        </div>
        <h1>Encontre a bateria certa. <span>Vapt-Vupt.</span></h1>
        
        <div className="search-box">
          <input type="text" placeholder="Digite o modelo do carro, moto..." />
          <button className="btn-buscar">BUSCAR</button>
        </div>
      </main>
    </div>
  );
};

export default Home;
