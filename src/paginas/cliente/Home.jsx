import { Zap, LogOut, Battery } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { logout } from "../../firebase/auth";
import "./Home.css";

export default function Home() {
  const { usuario } = useAuth();

  return (
    <div className="app-cliente">
      <header className="app-cliente__topo">
        <div className="app-cliente__logo"><Zap color="#FFC107" size={20} /> BuscaBat</div>
        <button className="btn btn--fantasma" onClick={logout}>
          <LogOut size={18} /> Sair
        </button>
      </header>

      <main className="app-cliente__conteudo">
        <div className="app-cliente__saudacao">
          <h1>Olá 👋</h1>
          <p>{usuario?.email}</p>
        </div>

        <div className="cartao">
          <Battery color="#1E3ABA" size={28} />
          <h3 style={{ marginTop: "0.6rem" }}>Buscar bateria</h3>
          <p style={{ color: "#666", fontSize: "0.9rem", margin: "0.4rem 0 1rem" }}>
            Em breve: informe seu veículo e encontre a bateria certa perto de você.
          </p>
          <button className="btn btn--primario" disabled>Em construção</button>
        </div>
      </main>
    </div>
  );
}
