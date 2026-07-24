import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Trash2, Pencil, X } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import {
  listarBateriasPorLoja, criarBateria, atualizarBateria, excluirBateria,
} from "../../servicos/bateriaService";
import { formatarPreco } from "../../utils/formatarPreco";
import "./CatalogoBaterias.css";

const FORM_VAZIO = { marca: "", modelosCompativeis: "", preco: "", estoque: "" };

export default function CatalogoBaterias() {
  const { usuario } = useAuth();
  const [baterias, setBaterias] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [form, setForm] = useState(FORM_VAZIO);
  const [editandoId, setEditandoId] = useState(null);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  async function carregar() {
    setCarregando(true);
    const lista = await listarBateriasPorLoja(usuario.uid);
    setBaterias(lista);
    setCarregando(false);
  }

  useEffect(() => {
    if (usuario) carregar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuario]);

  function handleChange(campo, valor) {
    setForm((f) => ({ ...f, [campo]: valor }));
  }

  function iniciarEdicao(bateria) {
    setEditandoId(bateria.id);
    setForm({
      marca: bateria.marca,
      modelosCompativeis: bateria.modelosCompativeis.join(", "),
      preco: (bateria.precoCentavos / 100).toFixed(2),
      estoque: String(bateria.estoque),
    });
  }

  function cancelarEdicao() {
    setEditandoId(null);
    setForm(FORM_VAZIO);
    setErro("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    if (!form.marca || !form.modelosCompativeis || !form.preco || form.estoque === "") {
      setErro("Preenche todos os campos.");
      return;
    }
    setSalvando(true);
    const modelosCompativeis = form.modelosCompativeis
      .split(",")
      .map((m) => m.trim())
      .filter(Boolean);

    try {
      if (editandoId) {
        await atualizarBateria(editandoId, {
          marca: form.marca,
          modelosCompativeis,
          preco: form.preco,
          estoque: form.estoque,
        });
      } else {
        await criarBateria(usuario.uid, { ...form, modelosCompativeis });
      }
      cancelarEdicao();
      await carregar();
    } catch {
      setErro("Não foi possível salvar. Tenta de novo.");
    } finally {
      setSalvando(false);
    }
  }

  async function handleExcluir(id) {
    if (!confirm("Remover essa bateria do catálogo?")) return;
    await excluirBateria(id);
    await carregar();
  }

  return (
    <div className="catalogo">
      <Link to="/loja" className="btn btn--fantasma" style={{ marginBottom: "1rem", paddingLeft: 0 }}>
        <ArrowLeft size={18} /> Voltar ao painel
      </Link>

      <h1>Catálogo de baterias</h1>
      <p style={{ color: "#666" }}>Cadastre as baterias que sua loja vende.</p>

      <form className="cartao catalogo__form" onSubmit={handleSubmit}>
        <div className="campo">
          <label>Marca</label>
          <input
            className="input" placeholder="Ex: Moura"
            value={form.marca} onChange={(e) => handleChange("marca", e.target.value)}
          />
        </div>
        <div className="campo">
          <label>Modelos de carro compatíveis (separados por vírgula)</label>
          <input
            className="input" placeholder="Ex: Onix, HB20, Gol"
            value={form.modelosCompativeis}
            onChange={(e) => handleChange("modelosCompativeis", e.target.value)}
          />
        </div>

        <div className="catalogo__form-linha">
          <div className="campo">
            <label>Preço (R$)</label>
            <input
              className="input" type="number" step="0.01" placeholder="289.90"
              value={form.preco} onChange={(e) => handleChange("preco", e.target.value)}
            />
          </div>
          <div className="campo">
            <label>Estoque</label>
            <input
              className="input" type="number" placeholder="10"
              value={form.estoque} onChange={(e) => handleChange("estoque", e.target.value)}
            />
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "0.5rem" }}>
            {editandoId && (
              <button type="button" className="btn btn--secundario" onClick={cancelarEdicao}>
                <X size={16} /> Cancelar
              </button>
            )}
          </div>
        </div>

        {erro && <p className="erro-form">{erro}</p>}

        <div className="catalogo__form-botao">
          <button type="submit" className="btn btn--primario" disabled={salvando}>
            {salvando ? "Salvando..." : editandoId ? "Salvar alterações" : "Adicionar bateria"}
          </button>
        </div>
      </form>

      <div className="catalogo__lista">
        {carregando && <p className="vazio">Carregando...</p>}
        {!carregando && baterias.length === 0 && (
          <p className="vazio">Nenhuma bateria cadastrada ainda.</p>
        )}
        {baterias.map((b) => (
          <div key={b.id} className="cartao item-bateria">
            <div className="item-bateria__info">
              <h4>{b.marca}</h4>
              <p>Compatível: {b.modelosCompativeis.join(", ")} · Estoque: {b.estoque}</p>
            </div>
            <div className="item-bateria__preco">{formatarPreco(b.precoCentavos)}</div>
            <div className="item-bateria__acoes">
              <button onClick={() => iniciarEdicao(b)} aria-label="Editar"><Pencil size={16} /></button>
              <button onClick={() => handleExcluir(b.id)} aria-label="Excluir"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
