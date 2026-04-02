# CRUD de Usuários - React Native + Expo + SQLite

Aplicação mobile de gerenciamento de usuários desenvolvida com React Native, Expo e SQLite local.

## 🚀 Características

- ✅ CRUD completo de usuários
- 📱 Interface mobile nativa
- 💾 Banco de dados SQLite local
- 🔄 Atualização em tempo real
- 🎨 Design moderno e intuitivo
- ⚡ Performance otimizada

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- Expo CLI
- Expo Go (no smartphone) ou emulador Android/iOS

## 🔧 Instalação

### 1. Instalar dependências

```bash
npm install
```

ou

```bash
yarn install
```

### 2. Instalar Expo CLI globalmente (se ainda não tiver)

```bash
npm install -g expo-cli
```

## ▶️ Executar o projeto

### Modo desenvolvimento

```bash
npm start
```

### Modo de desenvolvimento (com nodemon):
```bash
npm run dev
```

O servidor estará rodando em: `http://localhost:3000`

## 📡 Endpoints da API

### 1. Rota Raiz
- **GET** `/`
- Retorna informações sobre a API e seus endpoints

### 2. Listar todos os usuários
- **GET** `/usuarios`
- Retorna todos os usuários cadastrados

### 3. Buscar usuário por ID
- **GET** `/usuarios/:id`
- Retorna um usuário específico

### 4. Criar novo usuário
- **POST** `/usuarios`
- Body (JSON):
```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "idade": 25
}
```

### 5. Atualizar usuário
- **PUT** `/usuarios/:id`
- Body (JSON):
```json
{
  "nome": "João Silva Atualizado",
  "email": "joao.novo@email.com",
  "idade": 26
}
```

### 6. Deletar usuário
- **DELETE** `/usuarios/:id`
- Deleta o usuário com o ID especificado

## 🧪 Testando a API

### Usando cURL:

**Criar usuário:**
```bash
curl -X POST http://localhost:3000/usuarios -H "Content-Type: application/json" -d "{\"nome\":\"Maria Silva\",\"email\":\"maria@email.com\",\"idade\":30}"
```

**Listar usuários:**
```bash
curl http://localhost:3000/usuarios
```

**Buscar usuário por ID:**
```bash
curl http://localhost:3000/usuarios/1
```

**Atualizar usuário:**
```bash
curl -X PUT http://localhost:3000/usuarios/1 -H "Content-Type: application/json" -d "{\"nome\":\"Maria Silva Atualizada\",\"email\":\"maria.nova@email.com\",\"idade\":31}"
```

**Deletar usuário:**
```bash
curl -X DELETE http://localhost:3000/usuarios/1
```

### Usando Postman ou Insomnia:

1. Importe as requisições ou crie manualmente
2. Configure o Content-Type como `application/json`
3. Use os exemplos de JSON acima

## 📱 Aplicativo Mobile

O projeto inclui um aplicativo mobile completo desenvolvido com React Native e Expo.

### Como executar o app mobile:

1. **Navegue até a pasta mobile:**
   ```bash
   cd mobile
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Certifique-se de que a API está rodando** (na pasta raiz):
   ```bash
   npm run dev
   ```

4. **Inicie o Expo:**
   ```bash
   npm start
   ```

5. **Abra no seu celular:**
   - Instale o app **Expo Go** no seu celular
   - Escaneie o QR Code mostrado no terminal
   - Aguarde o carregamento

### Funcionalidades do App Mobile:
- ✅ Listar usuários com pull-to-refresh
- ✅ Ver detalhes completos do usuário
- ✅ Criar novo usuário com validação
- ✅ Editar usuário existente
- ✅ Excluir usuário com confirmação
- ✅ Interface intuitiva e responsiva

### 📚 Documentação Completa do Mobile:
Para mais detalhes sobre o app mobile, veja:
- **README do Mobile:** [/mobile/README.md](./mobile/README.md)
- **Guia Rápido:** [/mobile/GUIA_RAPIDO.md](./mobile/GUIA_RAPIDO.md)

---
3. Use os exemplos de body acima

## 📁 Estrutura do Projeto

```
node-sqlite-crud/
│
├── database.js          # Configuração do banco SQLite
├── index.js             # Arquivo principal do servidor
├── database.db          # Banco de dados (criado automaticamente)
├── package.json         # Dependências e scripts
├── README.md            # Documentação
│
├── routes/
│   └── usuarios.js      # Rotas CRUD de usuários
│
└── mobile/              # 📱 APLICATIVO MOBILE (React Native + Expo)
    ├── App.js           # Entrada do app mobile
    ├── package.json     # Dependências do mobile
    ├── README.md        # Documentação completa do mobile
    ├── src/
    │   ├── screens/     # Telas do app (Lista, Detalhes, Criar, Editar)
    │   ├── services/    # Integração com API
    │   ├── components/  # Componentes reutilizáveis
    │   └── styles/      # Estilos e tema
    └── ...              # Outros arquivos do mobile
```

## 🗄️ Estrutura do Banco de Dados

### Tabela: usuarios

| Campo      | Tipo     | Descrição                    |
|------------|----------|------------------------------|
| id         | INTEGER  | Chave primária (autoincrement)|
| nome       | TEXT     | Nome do usuário              |
| email      | TEXT     | Email (único)                |
| idade      | INTEGER  | Idade do usuário             |
| criado_em  | DATETIME | Data de criação (automático) |

## 📝 Observações

- O banco de dados SQLite é criado automaticamente ao iniciar o servidor
- A tabela de usuários é criada automaticamente se não existir
- O arquivo `database.db` contém todos os dados

## 👨‍💻 Autor

Projeto desenvolvido para fins educacionais - Backend Node.js com SQLite

## 📄 Licença

ISC
