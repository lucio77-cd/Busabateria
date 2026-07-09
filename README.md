# BuscaBat ⚡

App para encontrar a melhor bateria automotiva: compare preço, marca e loja, e agende a troca no local disponível mais próximo.

## O que o app faz
- **Cliente**: busca bateria pelo modelo do carro, compara preço/marca entre lojas, agenda a troca.
- **Loja**: cadastra baterias (preço, estoque, compatibilidade), recebe e gerencia agendamentos.

## Stack
- React 18 + Vite
- React Router
- Firebase (Auth + Firestore)

## Estrutura do projeto
```
src/
  main.jsx
  App.jsx
  firebase/
    config.js          # inicialização do Firebase
  paginas/
    cliente/            # telas do cliente (busca, agendamento)
    loja/                # telas da loja (cadastro de produto, agenda)
    auth/                # login/registro
  componentes/          # componentes reutilizáveis (a criar)
  estilos/               # CSS
  servicos/              # funções de acesso ao Firestore (a criar)
```

Veja `MODELO_DADOS.md` para o desenho das coleções do Firestore e `ROADMAP.md` para o que falta construir.

## Rodando local
```bash
npm install
npm run dev
```

## Deploy
Produção: https://busabateria.vercel.app
