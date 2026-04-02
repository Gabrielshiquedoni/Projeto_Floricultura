# 🚀 Início Rápido - CRUD Usuários Mobile

## Instalação e Execução em 3 Passos

### 1️⃣ Instalar Dependências

```bash
npm install
```

### 2️⃣ Iniciar o Projeto

```bash
npm start
```

### 3️⃣ Abrir no Dispositivo

**Opção A - Expo Go (Recomendado)**
1. Instale o app Expo Go no seu smartphone:
   - [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [iOS](https://apps.apple.com/app/expo-go/id982107779)
2. Escaneie o QR code que aparece no terminal
3. Aguarde o app carregar

**Opção B - Emulador Android**
```bash
npm run android
```

**Opção C - Simulador iOS (apenas Mac)**
```bash
npm run ios
```

## 📱 Como Usar o App

1. **➕ Adicionar Usuário**: Toque no botão azul "+" 
2. **✏️ Editar**: Toque no ícone verde de lápis
3. **🗑️ Excluir**: Toque no ícone vermelho de lixeira
4. **🔄 Atualizar**: Arraste a tela para baixo

## ⚙️ Requisitos

- Node.js 14+
- Smartphone com Expo Go OU Emulador Android/iOS
- Conexão à internet (apenas primeira vez)

## 🆘 Problemas Comuns

### O QR code não funciona
- Verifique se o PC e smartphone estão na mesma rede Wi-Fi
- Use a opção "Tunnel" ao invés de "LAN" no Expo

### Erro de dependências
```bash
rm -rf node_modules
npm install
```

### App não carrega
```bash
npx expo start --clear
```

2. Edite `mobile/src/services/api.js`:
   ```javascript
   const API_BASE_URL = 'http://SEU_IP:3000';
   // Exemplo: 'http://192.168.1.100:3000'
   ```

**Para emulador Android:** use `10.0.2.2:3000` (já configurado!)

---

### 4️⃣ Iniciar Mobile (30 seg)

```bash
cd mobile
npm start
```

---

### 5️⃣ Abrir no Celular (1 min)

1. Abra o **Expo Go** no celular
2. Escaneie o **QR Code** no terminal
3. Aguarde carregar

---

## ✅ Pronto!

Você deve ver:
- ✅ Lista de usuários
- ✅ Botão + (adicionar)
- ✅ Toque em um usuário para ver detalhes

---

## ❌ Não funcionou?

### Erro de conexão?
1. API rodando? → `http://localhost:3000/usuarios`
2. IP correto? → Veja passo 3
3. Mesma rede? → Celular e PC no mesmo WiFi

### App não abre?
```bash
expo start -c
```

### Outros problemas?
📚 Veja: `mobile/README.md` (documentação completa)

---

## 📋 Checklist Rápido

- [ ] Node.js instalado
- [ ] Dependências instaladas (setup-completo.bat)
- [ ] Backend rodando (npm run dev)
- [ ] IP configurado (se celular físico)
- [ ] Expo iniciado (npm start no mobile)
- [ ] Expo Go instalado no celular
- [ ] QR Code escaneado
- [ ] App funcionando!

---

## 🎉 Funcionou?

Agora você pode:
- ➕ Criar usuários
- ✏️ Editar usuários
- 👁️ Ver detalhes
- 🗑️ Excluir usuários
- 🔄 Puxar para atualizar

---

## 📚 Quer saber mais?

- **Backend:** [README.md](README.md)
- **Mobile:** [mobile/README.md](mobile/README.md)
- **Guia Rápido:** [mobile/GUIA_RAPIDO.md](mobile/GUIA_RAPIDO.md)
- **Estrutura:** [mobile/ESTRUTURA.md](mobile/ESTRUTURA.md)
- **Dicas:** [mobile/DICAS_DESENVOLVIMENTO.md](mobile/DICAS_DESENVOLVIMENTO.md)

---

**⏱️ Tempo total: ~5 minutos**

**🚀 Bora usar o app!**