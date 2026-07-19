import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase/config';
import '../../estilos/Home.css';

const cardStyle = {
  background: '#1a1a1a', border: '1px solid #333', borderRadius: '12px',
  padding: '20px', display: 'flex', flexDirection: 'column',
  alignItems: 'center', gap: '5px'
};
const numStyle = { fontSize: '2rem', fontWeight: 'bold', color: '#FF4500' };
const labelStyle = { fontSize: '0.85rem', color: '#a1a1aa', textAlign: 'center' };

const PainelLoja = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ baterias: 0, pendentes: 0, confirmados: 0, concluidos: 0 });
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarDados = async () => {
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      try {
        const bateriasSnap = await getDocs(query(collection(db, 'baterias'), where('lojaId', '==', uid)));
        const agendamentosSnap = await getDocs(query(collection(db, 'agendamentos'), where('lojaId', '==', uid)));

        let pendentes = 0, confirmados = 0, concluidos = 0;
        agendamentosSnap.forEach((docSnap) => {
          const status = docSnap.data().status;
          if (status === 'pendente') pendentes++;
          if (status === 'confirmado' || status === 'a_caminho') confirmados++;
          if (status === 'concluido') concluidos++;
        });

        setStats({ baterias: bateriasSnap.size, pendentes, confirmados, concluidos });
      } catch (error) {
        console.error('Erro ao carregar painel:', error.message);
      } finally {
        setCarregando(false);
      }
    };

    carregarDados();
  }, []);

  const sair = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <div className="home-container" style={{ padding: '20px', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div className="logo" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          BUSCA<span>BAT</span>
        </div>
        <button onClick={sair} style={{ background: 'transparent', border: '1px solid #333', color: '#a1a1aa', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}>
          Sair
        </button>
      </div>

      <h2 style={{ color: 'white', marginBottom: '20px' }}>Painel da Loja</h2>

      {carregando ? (
        <p style={{ color: '#a1a1aa' }}>Carregando...</p>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', marginBottom: '30px' }}>
            <div style={cardStyle}><span style={numStyle}>{stats.baterias}</span><span style={labelStyle}>Baterias cadastradas</span></div>
            <div style={cardStyle}><span style={numStyle}>{stats.pendentes}</span><span style={labelStyle}>Agendamentos pendentes</span></div>
            <div style={cardStyle}><span style={numStyle}>{stats.confirmados}</span><span style={labelStyle}>Em andamento</span></div>
            <div style={cardStyle}><span style={numStyle}>{stats.concluidos}</span><span style={labelStyle}>Concluídos</span></div>
          </div>

          <button onClick={() => navigate('/admin/cadastrar')} className="btn-buscar" style={{ width: '100%', padding: '14px', borderRadius: '8px' }}>
            + Cadastrar Bateria
          </button>
        </>
      )}
    </div>
  );
};

export default PainelLoja;
