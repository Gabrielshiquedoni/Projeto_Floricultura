# Jardim Encantado - App de Floricultura (MVP)

**Projeto Integrador - Senac (Análise e Desenvolvimento de Sistemas)**

Este documento contém as instruções rápidas para a execução do aplicativo "Jardim Encantado", um e-commerce mobile desenvolvido em React Native (Expo) com backend em Node.js e banco de dados SQLite.

## 1. Pré-requisitos do Sistema

Para testar a aplicação localmente precisará ter instalado em sua máquina:

* **Node.js** (Versão 16+ recomendada)
* Smartphone com o app **"Expo Go"** instalado (disponível para Android e iOS) ou um Emulador configurado.
* Conexão Wi-Fi (o celular e o computador devem estar na mesma rede).

## 2. Como Rodar o Servidor (Back-end e Banco de Dados)

O aplicativo consome uma API local e busca as imagens dos produtos diretamente do servidor. O servidor deve ser iniciado antes do aplicativo.

1. Abra o terminal e navegue até a pasta do backend (`api-floricultura`).
2. Instale as dependências:

    npm install

3. Inicie o servidor:

    node index.js

> **Nota:** O servidor rodará na porta 3000. O banco de dados (`floricultura.db`) já possui uma carga inicial (seed) com produtos, categorias e imagens prontas para teste.

## 3. Como Rodar o Aplicativo (Front-end)

Nós implementamos uma arquitetura de Detecção Automática de IP. O aplicativo rastreia o IP da sua máquina hospedeira automaticamente pelo Expo para renderizar as imagens do banco, eliminando a necessidade de configurar IPs manualmente no código.

1. Abra um novo terminal e navegue até a pasta do frontend (`PI-4`).
2. Instale as dependências:

    npm install

3. Inicie o Expo limpando o cache (para evitar conflitos de sessões anteriores):

    npx expo start -c

4. Um QR Code aparecerá no terminal.
5. Abra o aplicativo Expo Go no seu celular e escaneie o QR Code (no iOS, use o app de Câmera padrão).

## 4. Notas Técnicas e Escopo da Entrega

Como se trata de uma entrega intermediária tomamos algumas decisões arquiteturais:

* **Carrinho Local:** O carrinho atual vive na memória RAM do dispositivo (Local State) para garantir extrema velocidade durante a navegação. (Atualizar o código no Expo zera o cache do carrinho).
* **Fluxo de Pagamento:** Telas de pagamento não estão integradas a gateways reais de cartão de crédito; elas representam o fluxo de interface de usuário (UI) projetado para o cliente e no momento estão estáticas.
* **Sistema de Estoque:** O sistema de estoque não foi incluído no escopo desta entrega, porém essa funcionalidade será implementada em entregas posteriores.