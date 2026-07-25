import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Zap, ShieldCheck, CheckCircle2, Menu, X, User,
  Car, DollarSign, MapPin, Battery, Users, Clock, Star, ChevronLeft, ChevronRight,
} from "lucide-react";
import "./Landing.css";

const depoimentos = [
  { texto: "Atendimento rápido e preço justo. O técnico chegou em 20 minutos!", autor: "Carlos M.", local: "São Paulo/SP" },
  { texto: "Consegui comparar preços e escolher a melhor opção perto de casa.", autor: "Juliana R.", local: "Campinas/SP" },
  { texto: "Fácil de usar e super confiável. Salvou meu dia!", autor: "André T.", local: "Sorocaba/SP" },
];

export default function Landing() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [indiceDepoimento, setIndiceDepoimento] = useState(0);

  function proximoDepoimento() {
    setIndiceDepoimento((i) => (i + 1) % depoimentos.length);
  }
  function depoimentoAnterior() {
    setIndiceDepoimento((i) => (i - 1 + depoimentos.length) % depoimentos.length);
  }

  return (
    <div className="landing">
      <header className="header">
        <div className="header__conteudo">
          <button
            className="header__menu-btn"
            onClick={() => setMenuAberto((v) => !v)}
            aria-label="Abrir menu"
          >
            {menuAberto ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link to="/" className="marca">
            <Zap className="marca__icone" size={22} />
            <span>BuscaBat</span>
          </Link>

          <nav className={`nav ${menuAberto ? "nav--aberto" : ""}`}>
            <a href="#inicio">Início</a>
            <a href="#como-funciona">Como funciona</a>
            <a href="#fornecedores">Fornecedores</a>
            <a href="#baterias">Baterias</a>
            <a href="#sobre">Sobre</a>
            <a href="#ajuda">Ajuda</a>
          </nav>

          <div className="header__acoes">
            <Link to="/login" className="btn btn--fantasma header__entrar">
              Entrar
            </Link>
            <Link to="/cadastro" className="btn btn--primario">
              Sou fornecedor
            </Link>
            <Link to="/login" className="header__icone-mobile" aria-label="Entrar">
              <User size={22} />
            </Link>
          </div>
        </div>
      </header>

      <section className="hero" id="inicio">
        <div className="hero__texto">
          <h1>
            Seu carro parou?
            <br />
            Encontre a bateria certa e quem resolve{" "}
            <span className="hero__destaque">perto de você.</span>
          </h1>
          <p className="hero__subtitulo">
            Compare preços, escolha o melhor fornecedor e agende ou solicite
            atendimento imediato.
          </p>
          <div className="hero__cta">
            <Link to="/cadastro" className="btn btn--primario btn--grande">
              <Zap size={18} /> Preciso trocar agora
            </Link>
            <Link to="/cadastro" className="btn btn--secundario btn--grande">
              📅 Agendar para depois
            </Link>
          </div>
          <div className="selo-confianca">
            <span><ShieldCheck size={16} /> Rápido</span>
            <span><ShieldCheck size={16} /> Seguro</span>
            <span><CheckCircle2 size={16} /> Confiável</span>
          </div>
        </div>

        <div className="hero__imagem">
          <div className="hero__imagem-placeholder" role="img"
               aria-label="Técnico e cliente verificando bateria compatível no carro">
            <Zap size={48} />
          </div>

          <div className="cartao-flutuante cartao-flutuante--topo">
            <CheckCircle2 size={18} color="#28A745" />
            <span>Bateria compatível encontrada!</span>
          </div>

          <div className="cartao-flutuante cartao-flutuante--preco">
            <span className="cartao-flutuante__label">A partir de</span>
            <strong>R$ 289,90</strong>
            <span className="cartao-flutuante__label">Instalação inclusa</span>
          </div>

          <div className="cartao-flutuante cartao-flutuante--local">
            <MapPin size={16} color="#1E3ABA" />
            <span>Fornecedor mais próximo — 1,2 km de você</span>
          </div>
        </div>
      </section>

      <section className="como-funciona" id="como-funciona">
        <h2>Como funciona</h2>
        <p className="secao__subtitulo">Trocar sua bateria nunca foi tão fácil</p>

        <div className="passos">
          <div className="passo">
            <div className="passo__icone passo__icone--azul"><Car size={22} /></div>
            <h3>1. Informe seu veículo</h3>
            <p>Digite a placa ou os dados do seu carro que encontramos a bateria ideal para você.</p>
          </div>
          <div className="passo__seta">→</div>
          <div className="passo">
            <div className="passo__icone passo__icone--amarelo"><DollarSign size={22} /></div>
            <h3>2. Compare preços</h3>
            <p>Veja os melhores preços, distâncias e avaliações dos fornecedores próximos.</p>
          </div>
          <div className="passo__seta">→</div>
          <div className="passo">
            <div className="passo__icone passo__icone--azul-escuro"><CheckCircle2 size={22} /></div>
            <h3>3. Escolha e pronto!</h3>
            <p>Escolha o fornecedor, agende ou solicite atendimento e resolva sem sair de casa.</p>
          </div>
        </div>
      </section>

      <section className="mapa" id="fornecedores">
        <h2>Encontre fornecedores perto de você</h2>
        <div className="mapa__placeholder">
          <div className="mapa__pino mapa__pino--central"><MapPin size={26} /></div>
          <div className="mapa__pino" style={{ top: "20%", left: "18%" }}><MapPin size={18} /></div>
          <div className="mapa__pino" style={{ top: "30%", left: "78%" }}><MapPin size={18} /></div>
          <div className="mapa__pino" style={{ top: "70%", left: "25%" }}><MapPin size={18} /></div>
          <div className="mapa__pino" style={{ top: "75%", left: "70%" }}><MapPin size={18} /></div>
          <button className="btn btn--branco mapa__botao">🗺️ Ver no mapa</button>
        </div>
      </section>

      <section className="estatisticas">
        <div className="estatistica">
          <Battery size={24} color="#1E3ABA" />
          <strong>+5.000</strong>
          <span>Baterias cadastradas</span>
        </div>
        <div className="estatistica">
          <Users size={24} color="#1E3ABA" />
          <strong>+1.200</strong>
          <span>Fornecedores ativos</span>
        </div>
        <div className="estatistica">
          <CheckCircle2 size={24} color="#1E3ABA" />
          <strong>+35.000</strong>
          <span>Atendimentos realizados</span>
        </div>
        <div className="estatistica">
          <Star size={24} color="#FFC107" />
          <strong>4.8</strong>
          <span>Avaliação média dos clientes</span>
        </div>
        <div className="estatistica">
          <Clock size={24} color="#1E3ABA" />
          <strong>30 min</strong>
          <span>Tempo médio de atendimento</span>
        </div>
      </section>

      <section className="depoimentos" id="sobre">
        <h2>O que nossos clientes dizem</h2>
        <div className="depoimentos__carrossel">
          <button onClick={depoimentoAnterior} aria-label="Depoimento anterior">
            <ChevronLeft />
          </button>
          <div className="depoimento">
            <div className="depoimento__estrelas">{"★".repeat(5)}</div>
            <p>"{depoimentos[indiceDepoimento].texto}"</p>
            <strong>{depoimentos[indiceDepoimento].autor}</strong>
            <span>{depoimentos[indiceDepoimento].local}</span>
          </div>
          <button onClick={proximoDepoimento} aria-label="Próximo depoimento">
            <ChevronRight />
          </button>
        </div>
      </section>

      <section className="cta-fornecedor">
        <div>
          <h2>É fornecedor de baterias ou oficina?</h2>
          <p>Cadastre-se e aumente suas vendas com quem realmente precisa.</p>
        </div>
        <Link to="/cadastro" className="btn btn--primario btn--grande">
          Quero ser fornecedor
        </Link>
      </section>

      <footer className="footer" id="ajuda">
        <div className="footer__marca">
          <div className="marca marca--footer">
            <Zap className="marca__icone" size={20} />
            <span>BuscaBat</span>
          </div>
          <p>
            Conectamos você aos melhores fornecedores de baterias da sua
            região com rapidez, preço justo e segurança.
          </p>
        </div>

        <div className="footer__coluna">
          <h4>Institucional</h4>
          <a href="#sobre">Sobre nós</a>
          <a href="#como-funciona">Como funciona</a>
          <a href="#">Termos de uso</a>
          <a href="#">Política de privacidade</a>
        </div>

        <div className="footer__coluna">
          <h4>Ajuda</h4>
          <a href="#">Perguntas frequentes</a>
          <a href="#">Fale conosco</a>
          <a href="#">Dicas e cuidados</a>
        </div>

        <div className="footer__coluna">
          <h4>Para fornecedores</h4>
          <Link to="/cadastro">Quero me cadastrar</Link>
          <a href="#">Como funciona</a>
          <a href="#">Central do fornecedor</a>
        </div>

        <p className="footer__copyright">
          © {new Date().getFullYear()} BuscaBat. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}
