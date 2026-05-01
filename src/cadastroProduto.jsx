import React, { useState } from 'react';
import { db, auth } from './firebase.config';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const CadastroProduto = () => {
  const [nome, setNome] = useState('');
  const [marca, setMarca] = useState('');
  const [amperagem, setAmperagem] = useState('');
  const [veiculos, setVeiculos] = useState(''); 
  const navigate = useNavigate();

  const salvarProduto = async (e) => {
    e.preventDefault();
    
    try {
      // Transforma o texto em uma lista (array) para a busca funcionar depois
      const listaVeiculos = veiculos.split(',').map(v => v.trim().toLowerCase());

      await addDoc(collection(db, "baterias"), {
        nome,
        marca,
        amperagem: parseInt(amperagem),
        compatibilidade: listaVeiculos,
        lojaId: auth.currentUser ? auth.currentUser.uid : "anonimo", 
        dataCadastro: new Date()
      });

      alert("Bateria cadastrada com sucesso!");
      setNome(''); setMarca(''); setAmperagem(''); setVeiculos('');
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao salvar. Verifique se o Firebase está configurado.");
    }
  };

  return (
    <div className="home-container" style={{ padding: '20px', color: 'white', minHeight: '100vh' }}>
      <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer', textAlign: 'center', marginBottom: '30px' }}>
        BUSCA<span>BAT</span>
      </div>

      <div style={{ background: '#1a1a1a', padding: '30px', borderRadius: '15px', border: '1px solid #FF4500', maxWidth: '500px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '20px', textAlign: 'center', color: 'white' }}>Cadastrar Nova Bateria</h2>
        
        <form onSubmit={salvarProduto} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="text" placeholder="Nome/Modelo (Ex: M60GD)" 
            value={nome} onChange={(e) => setNome(e.target.value)} required
            style={{ padding: '12px', borderRadius: '8px', background: '#0a0a0a', color: 'white', border: '1px solid #333' }}
          />
          <input 
            type="text" placeholder="Marca (Ex: Moura)" 
            value={marca} onChange={(e) => setMarca(e.target.value)} required
            style={{ padding: '12px', borderRadius: '8px', background: '#0a0a0a', color: 'white', border: '1px solid #333' }}
          />
          <input 
            type="number" placeholder="Amperagem (Ah)" 
            value={amperagem} onChange={(e) => setAmperagem(e.target.value)} required
            style={{ padding: '12px', borderRadius: '8px', background: '#0a0a0a', color: 'white', border: '1px solid #333' }}
          />
          <textarea 
            placeholder="Carros compatíveis (separe por vírgula)" 
            value={veiculos} onChange={(e) => setVeiculos(e.target.value)} required
            style={{ padding: '12px', borderRadius: '8px', background: '#0a0a0a', color: 'white', border: '1px solid #333', minHeight: '100px' }}
          />
          <p style={{ fontSize: '0.8rem', color: '#888' }}>Ex: Civic 2007, Corolla 2010, Hilux diesel</p>

          <button type="submit" className="btn-buscar" style={{ padding: '15px', marginTop: '10px', cursor: 'pointer' }}>
            SALVAR NO BANCO DE DADOS
          </button>
        </form>
      </div>
    </div>
  );
};

export default CadastroProduto;
