import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Cadastro from './Cadastro';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Cadastro mode="login" />} />
        <Route path="/registrar" element={<Cadastro mode="registrar" />} />
      </Routes>
    </Router>
  );
}

export default App;
