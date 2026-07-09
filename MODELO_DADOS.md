# Modelo de Dados (Firestore)

Inspirado em referências pesquisadas: Tuhu Yangche (China — preço transparente, SLA de instalação), Sun Mobility (Índia — estoque em tempo real), Spiffy (EUA — rastreio de status de agendamento).

## `usuarios/{uid}`
```
nome
email
telefone
tipo: "cliente" | "loja"
dataCadastro
veiculos: [ { apelido, marca, modelo, ano } ]   // opcional, cliente
```

## `lojas/{uid}`
Mesmo uid do usuário do tipo "loja".
```
nomeFantasia
endereco: { rua, cidade, uf, cep, lat, lng }
telefone
horarioFuncionamento: { seg: {abre, fecha}, ter: {...}, ... }
tempoMedioInstalacaoMin
avaliacaoMedia
totalAvaliacoes
ativa
```

## `baterias/{id}`
```
lojaId
nome
marca
amperagem
preco
estoque
compatibilidade: [veiculos em lowercase]
dataCadastro
dataAtualizacao
```

> Variante futura: separar em `bateriasCatalogo` (dados fixos do produto) + `ofertas` (lojaId, preco, estoque) caso o catálogo passe a ser padronizado entre lojas — evita duplicar nome/marca/amperagem em cada loja.

## `agendamentos/{id}`
```
clienteId
lojaId
bateriaId
veiculo: { marca, modelo, ano }
dataHora
status: "pendente" | "confirmado" | "a_caminho" | "concluido" | "cancelado"
tipoServico: "retirada_na_loja" | "instalacao_domicilio"
precoFechado
criadoEm
atualizadoEm
```

## `avaliacoes/{id}`
```
agendamentoId
clienteId
lojaId
nota (1-5)
comentario
data
```

## Índices compostos necessários
- `baterias`: `compatibilidade` (array-contains) + `preco` (asc)
- `agendamentos`: `lojaId` + `status`
- `agendamentos`: `clienteId` + `dataHora`

## Regras de segurança (visão geral)
- Cliente só edita seu próprio doc em `usuarios` e `agendamentos` que criou.
- Loja só edita `baterias` e `lojas` onde `lojaId == auth.uid`.
- Leitura de `baterias` e `lojas` é pública.
