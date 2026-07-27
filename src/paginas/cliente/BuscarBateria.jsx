import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, Battery } from "lucide-react";
import { buscarBateriasCompativeis } from "../../servicos/bateriaService";
import { buscarUsuario } from "../../servicos/usuarioService";
import { formatarPreco } from "../../utils/formatarPreco";
import { useDebounce } from "../../hooks/useDebounce";
import "./BuscarBateria.css";

export default function BuscarBateria() {
  const [modelo, setModelo] = useState("");
  const modeloDebounced = useDebounce(modelo, 500);
  const [resultados, setResultados] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [buscou, setBuscou] = useState(false);

  useEffect(() => {
    if (!modeloDebounced.trim()) {
      setResultados([]);
      setBuscou(false);
      return;
    }

    let ativo = true;
    setCarregando(true);

    async function buscar() {
      const baterias = await buscarBateriasCompativeis(modeloDebounced.trim());

      // busca o e-mail da loja de cada bateria encontrada (identificação simples por enquanto)
      const lojaIdsUnicos = [...new Set(baterias.map((b) => b.lojaId))];
      const lojas = await Promise.all(
        lojaIdsUnicos.map(async (id) => [id, await buscarUsuario(id)])
      );
      const lojasPorId = Object.fromEntries(lojas);

      if (ativo) {
        setResultados(
          baterias.map((b) => ({ ...b, lojaEmail: lojasPorId[b.lojaId]?.email }))
        );
        setBuscou(true);
        setCarregando(false);
      }
    }

    buscar();
    return () => {
      ativo = false;
    };
  }, [modeloDebounced]);

  return (
    <div className="buscar-bateria">
      <Link to="/painel" className="btn btn--fantasma" style={{ marginBottom: "1rem", paddingLeft: 0 }}>
        <ArrowLeft size={18} /> Voltar
      </Link>

      <h1>Buscar bateria</h1>
      <p style={{ color: "#666" }}>Digite o modelo do seu carro pra ver as opções compatíveis.</p>

      <div className="campo buscar-bateria__campo">
        <label htmlFor="modelo">Modelo do carro</label>
        <input
          id="modelo"
          className="input"
          placeholder="Ex: Onix"
          value={modelo}
          onChange={(e) => setModelo(e.target.value)}
        />
      </div>

      {carregando && <p className="vazio">Buscando...</p>}

      {!carregando && buscou && resultados.length === 0 && (
        <p className="vazio">Nenhuma bateria compatível encontrada com esse modelo.</p>
      )}

      {!carregando && !buscou && (
        <p className="vazio">
          <Search size={18} style={{ verticalAlign: "middle", marginRight: "0.4rem" }} />
          Digite o modelo do carro acima para começar.
        </p>
      )}

      {resultados.map((b) => (
        <div key={b.id} className="cartao buscar-bateria__resultado">
          <div className="buscar-bateria__info">
            <h4><Battery size={16} style={{ verticalAlign: "middle", marginRight: "0.3rem" }} color="#1E3ABA" /> {b.marca}</h4>
            <p>Vendido por: {b.lojaEmail ?? "Loja"} · Estoque: {b.estoque}</p>
          </div>
          <div className="buscar-bateria__preco">
            <strong>{formatarPreco(b.precoCentavos)}</strong>
            <span>Em breve: agendar</span>
          </div>
        </div>
      ))}
    </div>
  );
}
