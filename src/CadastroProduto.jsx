import React, { useState } from 'react';
import { db, auth } from './firebase.config';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const CadastroProduto = () => {
  const [nome, setNome] = useState('');
  const [marca, setMarca] = useState('');
  const [amperagem, setAmperagem] = useState('');
  const [veiculos, setVeiculos] = useState(''); // Ex: "Civic 2007, Corolla 2010, Golf"
  const navigate = useNavigate();

  const salvarProduto = async (e) => {
    e.preventDefault();
    
    try {
      // Transformamos a linha de texto em uma lista (array) para facilitar a busca depois
      const listaVeiculos = veiculos.split(',').map(v => v.trim().toLowerCase());

      await addDoc(collection(db, "baterias"), {
        nome,
        marca,
        amperagem: parseInt(amperagem),
        compatibilidade: listaVeiculos,
        lojaId: auth.currentUser.uid, // Vincula o produto à loja que está logada
        dataCadastro: new Date()
      });

      alert("Produto cadastrado com sucesso!");
      setNome(''); setMarca(''); setAmperagem(''); setVeiculos('');
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao salvar. Verifique se você está logado.");
    }
  };

  return (
    <div className="home-container" style={{ padding: '20px', color: 'white' }}>
      <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer', textAlign: 'center', marginBottom: '30px' }}>
        BUSCA<span>BAT</span>
      </div>

      <div style={{ background: '#1a1a1a', padding: '30px', borderRadius: '15px', border: '1px solid #FF4500', maxWidth: '500px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Cadastrar Bateria</h2>
        
        <form onSubmit={salvarProduto} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="text" placeholder="Nome da Bateria (Ex: M60GD)" 
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
            placeholder="Veículos compatíveis (separe por vírgula)" 
            value={veiculos} onChange={(e) => setVeiculos(e.target.value)} required
            style={{ padding: '12px', borderRadius: '8px', background: '#0a0a0a', color: 'white', border: '1px solid #333', minHeight: '100px' }}
          />
          <p style={{ fontSize: '0.8rem', color: '#888' }}>Ex: Civic 2007, Corolla 2010, Hilux diesel</p>

          <button type="submit" className="btn-buscar" style={{ padding: '15px', marginTop: '10px' }}>
            SALVAR PRODUTO
          </button>
        </form>
      </div>
    </div>
  );
};

export default CadastroProduto;

