import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, User, Store } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { criarUsuario } from "../../servicos/usuarioService";
import "./Auth.css";

export default function EscolherPapel() {
  const { usuario } = useAuth();
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const navegar = useNavigate();

  if (!usuario) {
    navegar("/login");
    return null;
  }

  async function escolher(role) {
    setErro("");
    setSalvando(true);
    try {
      await criarUsuario(usuario.uid, { email: usuario.email, role });
      navegar(role === "loja" ? "/loja" : "/painel");
    } catch {
      setErro("Não foi possível salvar. Tenta de novo.");
      setSalvando(false);
    }
  }

  return (
    <div className="pagina-auth">
      <div className="pagina-auth__marca">
        <div className="cartao-auth__logo" style={{ color: "white" }}>
          <Zap color="#FFC107" /> BuscaBat
        </div>
        <h2>Só falta um passo.</h2>
        <p>Conta pra gente como você vai usar o BuscaBat.</p>
      </div>

      <div className="pagina-auth__conteudo">
        <div className="cartao cartao-auth">
          <div className="cartao-auth__logo">
            <Zap color="#FFC107" /> BuscaBat
          </div>
          <h1>Você é...</h1>
          <p className="cartao-auth__subtitulo">Escolha uma opção pra continuar.</p>

          {erro && <p className="erro-form">{erro}</p>}

          <button
            className="btn btn--secundario btn--largo btn--opcao"
            disabled={salvando}
            onClick={() => escolher("cliente")}
          >
            <User size={18} /> Cliente — quero trocar minha bateria
          </button>
          <button
            className="btn btn--secundario btn--largo btn--opcao"
            disabled={salvando}
            onClick={() => escolher("loja")}
          >
            <Store size={18} /> Loja/oficina — quero vender baterias
          </button>
        </div>
      </div>
    </div>
  );
}
