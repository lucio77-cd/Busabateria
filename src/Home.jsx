import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [busca, setBusca] = useState('');
  const navigate = useNavigate();

  const aoBuscar = (e) => {
    e.preventDefault();
    console.log("Procurando por:", busca);
    // No futuro, aqui faremos a busca no Firestore
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="logo">
          BUSCA<span>BAT</span>
        </div>
        {/* LINK ATIVADO: Leva para a tela de Login */}
        <nav className="nav-links">
          <button onClick={() => navigate('/login')} className="btn-login-texto">
            Login
          </button>
        </nav>
      </header>

      <main className="home-main">
        <div className="icon-bolt">⚡</div>
        <h1>Encontre a bateria certa. <span>Vapt-Vupt.</span></h1>
        
        <form onSubmit={aoBuscar} className="search-box">
          <input 
            type="text" 
            placeholder="Digite o modelo do carro, moto..." 
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <button type="submit" className="btn-buscar">BUSCAR</button>
        </form>
      </main>
    </div>
  );
};

export default Home;
