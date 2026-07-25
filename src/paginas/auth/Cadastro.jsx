import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Zap } from "lucide-react";
import { cadastrar, loginComGoogle } from "../../firebase/auth";
import { criarUsuario, buscarUsuario } from "../../servicos/usuarioService";
import "./Auth.css";

export default function Cadastro() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [role, setRole] = useState("cliente");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const navegar = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setCarregando(true);
    try {
      const credencial = await cadastrar(email, senha);
      await criarUsuario(credencial.user.uid, { email, role });
      navegar(role === "loja" ? "/loja" : "/painel");
    } catch {
      setErro("Não foi possível criar a conta. Verifique os dados.");
    } finally {
      setCarregando(false);
    }
  }

  async function handleGoogle() {
    setErro("");
    setCarregando(true);
    try {
      const credencial = await loginComGoogle();
      const dados = await buscarUsuario(credencial.user.uid);
      if (!dados) {
        navegar("/escolher-papel");
      } else {
        navegar(dados.role === "loja" ? "/loja" : "/painel");
      }
    } catch {
      setErro("Não foi possível continuar com Google. Tenta de novo.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="pagina-auth">
      <div className="pagina-auth__marca">
        <div className="cartao-auth__logo" style={{ color: "white" }}>
          <Zap color="#FFC107" /> BuscaBat
        </div>
        <h2>A bateria certa. Perto de você.</h2>
        <p>Crie sua conta como cliente pra trocar sua bateria, ou como loja pra vender.</p>
      </div>

      <div className="pagina-auth__conteudo">
        <form className="cartao cartao-auth" onSubmit={handleSubmit}>
          <div className="cartao-auth__logo">
            <Zap color="#FFC107" /> BuscaBat
          </div>
          <h1>Criar conta</h1>
          <p className="cartao-auth__subtitulo">Leva menos de um minuto.</p>

          <div className="campo">
            <label htmlFor="email">E-mail</label>
            <input
              id="email" type="email" className="input" placeholder="seu@email.com"
              value={email} onChange={(e) => setEmail(e.target.value)} required
            />
          </div>
          <div className="campo">
            <label htmlFor="senha">Senha</label>
            <input
              id="senha" type="password" className="input" placeholder="Mínimo 6 caracteres"
              value={senha} onChange={(e) => setSenha(e.target.value)} required
            />
          </div>
          <div className="campo">
            <label htmlFor="role">Você é</label>
            <select id="role" className="input" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="cliente">Cliente — quero trocar minha bateria</option>
              <option value="loja">Loja/oficina — quero vender baterias</option>
            </select>
          </div>

          {erro && <p className="erro-form">{erro}</p>}

          <button type="submit" className="btn btn--primario btn--largo" disabled={carregando}>
            {carregando ? "Criando conta..." : "Cadastrar"}
          </button>

          <div className="divisor"><span>ou</span></div>

          <button
            type="button"
            className="btn btn--google btn--largo"
            onClick={handleGoogle}
            disabled={carregando}
          >
            <IconeGoogle /> Continuar com Google
          </button>

          <p className="cartao-auth__rodape">
            Já tem conta? <Link to="/login">Entrar</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

function IconeGoogle() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18">
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.88 2.7-6.62z"/>
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.98v2.33A9 9 0 0 0 9 18z"/>
      <path fill="#FBBC05" d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.17.28-1.7V4.97H.98A9 9 0 0 0 0 9c0 1.45.35 2.83.98 4.03l2.97-2.33z"/>
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .98 4.97l2.97 2.33C4.66 5.17 6.65 3.58 9 3.58z"/>
    </svg>
  );
}
