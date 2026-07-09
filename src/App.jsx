import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './paginas/cliente/Home';
import Cadastro from './paginas/auth/Cadastro';
import CadastroProduto from './paginas/loja/CadastroProduto';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Cadastro mode="login" />} />
        <Route path="/registrar" element={<Cadastro mode="registrar" />} />
        <Route path="/admin/cadastrar" element={<CadastroProduto />} />
      </Routes>
    </Router>
  );
}

export default App;
