# 🌺 Jardim Encantado — Guia Completo de Uso

> E-commerce de floricultura com React Native (Expo) + Node.js (Express + SQLite)

---

## 📋 Índice

- [Pré-requisitos](#-pré-requisitos)
- [Como Rodar a Aplicação](#-como-rodar-a-aplicação)
- [Funcionalidades e Como Acessar](#-funcionalidades-e-como-acessar)
  - [1. Navegação Geral (Cliente)](#1-navegação-geral-cliente)
  - [2. Carrinho de Compras](#2-carrinho-de-compras)
  - [3. Checkout com Auto-preenchimento de CEP](#3-checkout-com-auto-preenchimento-de-cep)
  - [4. Confirmação de Pagamento](#4-confirmação-de-pagamento)
  - [5. Painel Admin (CRUD de Produtos)](#5-painel-admin-crud-de-produtos)
  - [6. Login e Cadastro](#6-login-e-cadastro)
  - [7. Segurança e Controle de Acesso](#7-segurança-e-controle-de-acesso)
- [API — Rotas Disponíveis](#-api--rotas-disponíveis)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Changelog](#-changelog)

---

## 🔧 Pré-requisitos

| Ferramenta | Versão Mínima | Para quê |
|------------|--------------|----------|
| **Node.js** | 18+ | Rodar o servidor back-end |
| **npm** | 9+ | Gerenciar dependências |
| **Expo Go** (celular) | Última versão | Rodar o app no celular |
| **Wi-Fi** | — | Celular e PC na **mesma rede** |

---

## 🚀 Como Rodar a Aplicação

São 2 servidores que precisam estar rodando ao mesmo tempo: o **back-end** (API) e o **front-end** (Expo).

### Passo 1 — Instalar dependências (só na primeira vez)

```bash
# Terminal 1: Back-end
cd api-floricultura
npm install

# Terminal 2: Front-end
cd PI-4
npm install
```

### Passo 2 — Iniciar o Back-end (API)

```bash
cd api-floricultura
node index.js
```

✅ Você deve ver no terminal:
```
🚀 Servidor da Floricultura rodando na porta 3000
✅ Banco Central conectado com sucesso!
✅ Todas as tabelas estruturadas e prontas.
```

> ⚠️ **Não feche este terminal!** O servidor precisa ficar rodando.

### Passo 3 — Iniciar o Front-end (Expo)

```bash
cd PI-4
npx expo start
```

✅ Um QR Code aparecerá no terminal.

### Passo 4 — Abrir no celular

1. Abra o app **Expo Go** no celular
2. Escaneie o QR Code que apareceu no terminal
3. Aguarde o bundler carregar (pode levar 30s~1min na primeira vez)
4. O app **Jardim Encantado** abrirá na tela inicial 🌺

> 💡 **Dica**: Se não funcionar, verifique se celular e PC estão na **mesma rede Wi-Fi**. O app detecta o IP da máquina automaticamente.

---

## 🎯 Funcionalidades e Como Acessar

### 1. Navegação Geral (Cliente)

**Caminho**: Abrir o app → Tela inicial (Home)

A Home exibe 3 seções de produtos vindos do banco de dados:
- **Promoções** — Produtos com `em_promocao = 1`
- **Mais Vendidos** — Primeiros 5 produtos sem promoção
- **Novidades** — Últimos 4 produtos cadastrados

**Para navegar pelas categorias:**
- Toque no ícone **☰ (menu)** no canto superior direito
- Escolha: Buquês, Conjuntos, Mudas ou Personalizados
- Cada categoria mostra seus produtos com imagem e preço

**Para ver detalhes de um produto:**
- Toque em qualquer card de produto → abre a tela de detalhes

---

### 2. Carrinho de Compras

**Caminho**: Home → Toque no produto → Adicionar ao carrinho → Ícone 🛒 no header

- Toque em um produto na Home ou em qualquer categoria
- Na tela do produto, toque em **"Adicionar ao Carrinho"**
- Para ver o carrinho, toque no **ícone de carrinho** (🛒) no header
- No carrinho você pode:
  - **Aumentar quantidade**: botão `+`
  - **Diminuir quantidade**: botão `-`
  - **Remover item**: ícone de lixeira 🗑️
- Veja o **subtotal**, **desconto** e **total**
- Toque em **"Finalizar compra"** para ir ao checkout

> Se o carrinho estiver vazio, você será redirecionado automaticamente para a tela de carrinho vazio.

---

### 3. Checkout com Auto-preenchimento de CEP

**Caminho**: Carrinho → Finalizar compra → Tela "Confirmar Entrega"

Esta é a funcionalidade de integração com os Correios (BFF):

1. No campo **CEP**, digite os 8 dígitos (ex: `04792000`)
2. Ao completar 8 dígitos, o app **automaticamente**:
   - Chama a API do servidor (`GET /api/cep/04792000`)
   - O servidor consulta os Correios
   - Os campos **Rua**, **Bairro**, **Cidade** e **UF** são preenchidos sozinhos
3. Preencha o **Número** manualmente
4. O botão **"Continuar"** só é habilitado após o endereço ser preenchido
5. Toque em **"Continuar"** → vai para Escolha de Pagamento

**CEPs para testar:**
| CEP | Endereço |
|-----|----------|
| `01001000` | Praça da Sé, Sé, São Paulo - SP |
| `04792000` | R. José Galdino da Silva, Interlagos, São Paulo - SP |
| `20040020` | Rua do Ouvidor, Centro, Rio de Janeiro - RJ |
| `30130000` | Praça Sete de Setembro, Centro, Belo Horizonte - MG |

---

### 4. Confirmação de Pagamento

**Caminho**: Carrinho → Confirmar Entrega → Escolher Pagamento → Revisão → **Continuar**

Após revisar o pedido na tela de Revisão:

1. Toque em **"Continuar"**
2. A tela de **Confirmação** aparecerá com:
   - ✅ Ícone verde de sucesso
   - Número do pedido gerado (ex: `#JE-48291`)
   - Resumo de todos os itens comprados com preços
   - Frete: GRÁTIS
   - Total da compra
   - Previsão de entrega
3. Toque em **"Voltar para a Home"**
   - O carrinho é limpo automaticamente
   - Você volta à tela inicial

---

### 5. Painel Admin (CRUD de Produtos)

**Caminho**: Qualquer tela → Menu ☰ → **Painel Admin** → Login Admin

**Credenciais de teste do admin:**

| Campo | Valor |
|-------|-------|
| **E-mail** | `admin@teste.com` |
| **Senha** | `123456` |

> ⚠️ O acesso ao painel é protegido. Ao tocar em "Painel Admin" no menu, você será direcionado à tela de login. Use as credenciais acima para entrar.

#### 📋 Listar Produtos
1. Toque no **☰ menu** (canto superior direito)
2. Toque em **"Painel Admin"** (último item, abaixo do separador)
3. Faça login com as credenciais acima
4. Você verá todos os produtos cadastrados em cards com:
   - Imagem, nome, preço e estoque
   - Botões de **editar** (✏️) e **excluir** (🗑️)

#### ➕ Cadastrar Novo Produto
1. No Painel Admin, toque no **botão verde (+)** no canto inferior direito (FAB)
2. Preencha o formulário:
   - **Nome do Produto** * (obrigatório)
   - **Descrição**
   - **Preço** * (obrigatório, ex: `29.90`)
   - **Estoque** (ex: `50`)
   - **URL da Imagem** (link externo ou nome de arquivo local)
   - **ID da Categoria** (ex: `1` para Buquês, `2` para Conjuntos)
   - **Produto em promoção** (checkbox)
3. Toque em **"Cadastrar Produto"**
4. Alerta de sucesso → volta para a lista atualizada

#### ✏️ Editar Produto
1. No Painel Admin, toque no ícone **✏️ (lápis)** do produto desejado
2. Os campos serão preenchidos automaticamente com os dados atuais
3. Altere o que precisar
4. Toque em **"Salvar Alterações"**
5. Alerta de sucesso → volta para a lista

#### 🗑️ Excluir Produto
1. No Painel Admin, toque no ícone **🗑️ (lixeira)** do produto
2. Um alerta de confirmação aparece: _"Tem certeza que deseja excluir?"_
3. Toque em **"Excluir"** para confirmar
4. O produto é removido da lista imediatamente

---

### 6. Login e Cadastro

**Caminho**: Qualquer tela → Ícone 👤 no header OU Menu ☰ → Fazer Login

1. Toque no ícone de **usuário** (👤) no header, ou no botão **"Fazer Login"** no menu
2. O modal de autenticação abrirá com duas opções:
   - **Login**: E-mail + Senha → botão "Entrar" → valida no servidor via `POST /api/usuarios/login`
   - **Cadastro**: Nome, E-mail, CPF, Telefone, Senha, Confirmar Senha → botão "Cadastrar" → cria no servidor via `POST /api/usuarios/cadastro`
3. Ao logar/cadastrar com sucesso, o usuário é salvo no `AuthContext` e o modal fecha automaticamente
4. Alterne entre Login e Cadastro pelos links no rodapé do modal

---

### 7. Segurança e Controle de Acesso

**Trava de Login no Checkout:**
- O botão "Finalizar compra" no carrinho verifica se há um usuário logado
- Se não houver, exibe alerta e abre o modal de login automaticamente
- Só permite avançar para a tela de entrega após o login

**Propagação de Dados no Fluxo:**
- Ao avançar na tela de entrega, os dados do endereço (CEP, rua, número, bairro, cidade, UF) e do usuário logado são passados por parâmetros de navegação
- A tela de Revisão exibe dinamicamente: nome do comprador, e-mail, endereço completo, método de pagamento e itens do carrinho

**Proteção do Painel Admin:**
- O menu "Painel Admin" agora redireciona para uma tela de login administrativo
- Apenas credenciais válidas de admin (verificadas via `POST /api/admins/login`) liberam acesso ao CRUD de produtos
- Utiliza `navigation.replace` para impedir retorno com o botão voltar

---

## 📡 API — Rotas Disponíveis

O back-end roda em `http://localhost:3000`. Todas as rotas de escrita usam **queries parametrizadas** para segurança.

### Produtos

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/produtos` | Lista todos os produtos |
| `GET` | `/produtos/:id` | Busca produto por ID |
| `POST` | `/api/produtos` | Cria novo produto |
| `PUT` | `/api/produtos/:id` | Atualiza produto |
| `DELETE` | `/api/produtos/:id` | Remove produto |

### Admins

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/api/admins` | Lista todos os admins |
| `POST` | `/api/admins` | Cadastra novo admin |
| `PUT` | `/api/admins/:id` | Atualiza admin |
| `DELETE` | `/api/admins/:id` | Remove admin |

### CEP (BFF Correios)

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/api/cep/:cep` | Consulta CEP via Correios |

**Exemplo de resposta:**
```json
{
  "rua": "Praça da Sé",
  "bairro": "Sé",
  "cidade": "São Paulo",
  "estado": "SP",
  "cep": "01001000",
  "complemento": "lado ímpar"
}
```

### Outros

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/usuarios` | Cadastra usuário (legado) |
| `POST` | `/api/usuarios/cadastro` | Cadastra usuário com validação |
| `POST` | `/api/usuarios/login` | Login de cliente |
| `POST` | `/api/admins/login` | Login de administrador |
| `POST` | `/pedidos` | Cria pedido + pagamento + itens |

---

## 📁 Estrutura do Projeto

```
Projeto_Floricultura/
│
├── api-floricultura/          ← BACK-END (Node.js + Express + SQLite)
│   ├── database.js            ← Conexão e criação das tabelas
│   ├── index.js               ← Todas as rotas da API
│   ├── seed.js                ← Script para popular o banco
│   ├── floricultura.db        ← Banco de dados SQLite
│   ├── images/                ← Imagens dos produtos (servidas estaticamente)
│   ├── testes.http            ← Testes das rotas (REST Client / Thunder Client)
│   └── package.json
│
├── PI-4/                      ← FRONT-END (React Native + Expo)
│   ├── App.js                 ← Navegação principal (Stack Navigator)
│   ├── src/
│   │   ├── components/
│   │   │   ├── AuthModal.js       ← Modal de login/cadastro
│   │   │   ├── Header.js          ← Header reutilizável
│   │   │   ├── MenuOverlay.js     ← Menu lateral (+ link Admin)
│   │   │   ├── ProdutoCard.js     ← Card de produto
│   │   │   ├── Rodape.js          ← Rodapé
│   │   │   └── ContainerSecao.js  ← Container de seção
│   │   │
│   │   ├── contexts/
│   │   │   ├── AuthContext.js     ← Estado de autenticação
│   │   │   └── CartContext.js     ← Estado do carrinho
│   │   │
│   │   ├── screens/
│   │   │   ├── HomeScreen.js              ← Tela inicial
│   │   │   ├── BuqueScreen.js             ← Categoria Buquês
│   │   │   ├── ConjuntoScreen.js          ← Categoria Conjuntos
│   │   │   ├── MudaScreen.js              ← Categoria Mudas
│   │   │   ├── PersonalizadosScreen.js    ← Categoria Personalizados
│   │   │   ├── ProdutoScreen.js           ← Detalhes do produto
│   │   │   ├── CarrinhoComItemScreen.js   ← Carrinho com itens (+ trava de login) ✨
│   │   │   ├── CarrinhoVazioScreen.js     ← Carrinho vazio
│   │   │   ├── ConfirmarEntregaScreen.js  ← Endereço + CEP (propaga dados) ✨
│   │   │   ├── CheckoutPagamentoScreen.js ← Escolha de pagamento (propaga dados) ✨
│   │   │   ├── RevisaoScreen.js           ← Revisão com dados dinâmicos ✨
│   │   │   ├── PagamentoScreen.js         ← Tela Pix
│   │   │   ├── ConfirmacaoPagamentoScreen.js ← Sucesso do pedido
│   │   │   ├── AdminLoginScreen.js        ← Login admin (gatekeeper) ✨
│   │   │   ├── AdminProdutosScreen.js     ← Listagem admin
│   │   │   └── AdminCadastroScreen.js     ← Form admin
│   │   │
│   │   └── services/
│   │       ├── api.js             ← Camada de serviços (fetch) ✨
│   │       └── database.js        ← SQLite local (expo-sqlite)
│   │
│   └── package.json
│
└── README.md
```

> ✨ = Arquivos criados/modificados nesta atualização

---

## 📝 Changelog

### v2.1.0 — 20/04/2026

#### 🆕 Novidades

**Back-end**
- Rota `POST /api/usuarios/cadastro` com validação de campos e checagem de e-mail duplicado (status 409)
- Rota `POST /api/usuarios/login` com validação de credenciais (status 401 se inválido)
- Rota `POST /api/admins/login` como gatekeeper do painel administrativo
- Todas as novas rotas utilizam queries parametrizadas (anti SQL Injection)

**Front-end**
- **AuthModal** agora consome a API real via `fetch` (login e cadastro funcionais)
- **Trava de segurança no Carrinho**: botão "Finalizar compra" exige login — se o usuário não estiver logado, exibe alerta e abre o modal de autenticação
- **Propagação de dados no checkout**: endereço e dados do usuário são passados via parâmetros de navegação ao longo de todo o fluxo (Entrega → Pagamento → Revisão)
- **RevisaoScreen dinâmica**: exibe nome do comprador, e-mail, endereço completo, método de pagamento e itens do carrinho em tempo real
- **AdminLoginScreen (NOVA)**: tela de login exclusiva para administradores, funciona como gatekeeper — só libera acesso ao CRUD de produtos com credenciais válidas
- **Menu atualizado**: link "Painel Admin" redireciona para a tela de login admin (não mais diretamente ao painel)
- **AuthContext** aprimorado com função `logout` dedicada
- **Camada de serviços** (`api.js`): novas funções `cadastrarUsuario`, `loginUsuario` e `loginAdmin`

#### 🔒 Segurança
- Checkout protegido por autenticação obrigatória
- Painel admin protegido por login separado com validação server-side
- Navegação admin usa `replace` para impedir retorno via botão voltar

---

### v2.0.0 — 20/04/2026

#### 🆕 Novidades

**Back-end**
- CRUD completo de Admins (`GET`, `POST`, `PUT`, `DELETE /api/admins`)
- CRUD completo de Produtos via `/api/produtos` (com prefixo)
- BFF de CEP: consulta os Correios (SOAP) com fallback para BrasilAPI
- Todas as queries com parâmetros `?` (anti SQL Injection)

**Front-end**
- **Painel Admin**: tela de listagem + formulário de cadastro/edição de produtos
- **Confirmação de Pagamento**: tela de sucesso com número de pedido `#JE-XXXXX`
- **Auto-preenchimento de CEP**: ao digitar 8 dígitos na tela de entrega, rua/bairro/cidade são preenchidos automaticamente
- **Camada de serviços** (`api.js`): funções centralizadas de `fetch` com `BASE_URL` dinâmica
- **Menu lateral** atualizado com link para "Painel Admin"

#### 🔧 Correções
- Botão "Continuar" da Revisão agora vai para Confirmação de Pagamento (antes ia direto para o Pix)
- Botão "Continuar" da tela de entrega desabilitado até o endereço ser preenchido

#### 🏗️ Arquitetura
- Separação front ↔ back com camada de serviços (`api.js`)
- IP do servidor detectado automaticamente via `expo-constants`
- Nenhuma dependência externa adicionada (apenas `fetch` nativo)
