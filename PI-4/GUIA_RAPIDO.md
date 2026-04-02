# 📱 Guia Rápido - App CRUD Usuários React Native

## 🎯 Sobre o App

Aplicação mobile para gerenciamento de usuários com:
- React Native + Expo
- SQLite local (sem necessidade de backend)
- Interface nativa Android/iOS
- CRUD completo

## ⚡ Início Rápido

### 1. Instalar
```bash
npm install
```

### 2. Iniciar
```bash
npm start
```

### 3. Abrir no celular
- Instale o **Expo Go** no smartphone
- Escaneie o QR code
- Pronto! 🎉

## 📂 Estrutura do Projeto

```
node-sqlite-crud/
├── App.js                      # App principal + navegação
├── index.js                    # Entry point
├── app.json                    # Config Expo
├── package.json                # Dependências
└── src/
    ├── components/             # Componentes reutilizáveis
    │   ├── UsuarioCard.js      # Card do usuário
    │   └── UsuarioForm.js      # Formulário
    ├── screens/                # Telas
    │   └── HomeScreen.js       # Tela principal
    └── services/               # Lógica de negócio
        └── database.js         # SQLite service
```

## 🛠️ Comandos Principais

```bash
# Iniciar desenvolvimento
npm start

# Android
npm run android

# iOS  
npm run ios

# Web
npm run web

# Limpar cache
npx expo start --clear
```

## 📱 Funcionalidades

### ➕ Criar Usuário
1. Toque no botão "+" azul
2. Preencha nome, email e idade (opcional)
3. Toque em "Salvar"

### ✏️ Editar Usuário
1. Toque no ícone verde de lápis no card
2. Modifique os dados
3. Toque em "Salvar"

### 🗑️ Excluir Usuário
1. Toque no ícone vermelho de lixeira
2. Confirme a exclusão

### 🔄 Atualizar Lista
- Arraste a tela para baixo (pull-to-refresh)

## 💾 Banco de Dados

O SQLite é criado automaticamente no dispositivo:

```sql
CREATE TABLE usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  idade INTEGER,
  criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Operações Disponíveis

```javascript
// Serviços em src/services/database.js
initDatabase()              // Inicializar DB
getAllUsuarios()            // Listar todos
getUsuarioById(id)          // Buscar por ID
createUsuario(nome, email, idade)  // Criar
updateUsuario(id, nome, email, idade)  // Atualizar
deleteUsuario(id)           // Deletar
clearAllUsuarios()          // Limpar todos
```

## 🎨 Componentes

### UsuarioCard
Exibe informações do usuário com ações:
- Nome, email, idade
- Data de criação
- Botões editar/excluir

### UsuarioForm
Modal para criar/editar usuários:
- Validação de campos
- Email único
- Idade opcional

### HomeScreen
Tela principal:
- Lista de usuários
- Botão adicionar
- Pull-to-refresh
- Feedback de ações

## 🔧 Tecnologias

| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| React Native | 0.74.0 | Framework mobile |
| Expo | ~51.0.0 | Plataforma de desenvolvimento |
| Expo SQLite | ~14.0.0 | Banco de dados local |
| React Navigation | 6.1.9 | Navegação |
| Expo Vector Icons | - | Ícones |

## 🐛 Solução de Problemas

### QR code não funciona
```bash
# Use tunnel ao invés de LAN
npx expo start --tunnel
```

### Erro ao instalar
```bash
# Limpar e reinstalar
rm -rf node_modules
npm cache clean --force
npm install
```

### App não carrega
```bash
# Limpar cache
npx expo start --clear
```

### Banco de dados travado
- Feche completamente o app
- Reinicie o Expo
- Reabra o app

## 📊 Validações

### Campos Obrigatórios
- Nome: não pode estar vazio
- Email: deve conter @ e ser único

### Campos Opcionais
- Idade: deve ser número se preenchido

### Mensagens de Erro
- "Nome é obrigatório"
- "Email é obrigatório"
- "Email inválido"
- "Este email já está cadastrado"
- "Idade deve ser um número"

## 🚀 Próximos Recursos

- [ ] Busca por nome/email
- [ ] Filtros e ordenação
- [ ] Foto do usuário
- [ ] Tema escuro
- [ ] Backup/restauração
- [ ] Estatísticas
- [ ] Categorias
- [ ] Exportar para CSV

## 💡 Dicas de Desenvolvimento

### Debug
- Sacuda o dispositivo para abrir o menu
- Cmd/Ctrl + D = menu de debug
- Cmd/Ctrl + M = reload

### Performance
- Use React.memo() para componentes
- Evite re-renders desnecessários
- Use FlatList para listas grandes

### Banco de Dados
- Dados são persistidos localmente
- Não há sincronização entre dispositivos
- Para resetar: desinstale o app

## 📝 Notas

- Primeira execução pode demorar
- Requer internet apenas para baixar dependências
- Dados salvos persistem entre sessões
- Suporte iOS e Android

## 🆘 Ajuda

### Logs
```bash
# Ver logs detalhados
npx expo start --dev-client
```

### Resetar Projeto
```bash
# Limpar tudo
rm -rf node_modules .expo
npm install
npx expo start --clear
```

---

**Desenvolvido com ❤️ usando React Native + Expo**
