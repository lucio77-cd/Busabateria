import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const RotaProtegida = ({ children, tipoPermitido }) => {
  const { user, tipo, carregando } = useAuth();

  if (carregando) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a1a1aa', background: '#000' }}>
        Carregando...
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  if (tipoPermitido && tipo !== tipoPermitido) return <Navigate to="/" replace />;

  return children;
};

export default RotaProtegida;
