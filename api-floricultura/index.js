const express = require('express');
const cors = require('cors');
const db = require('./database');
const path = require('path'); // <-- 1. INJETADO AQUI NO TOPO

const app = express();
app.use(cors());
app.use(express.json());

// <-- 2. INJETADO AQUI (Antes das rotas)
// Transforma a pasta 'images' num servidor público de arquivos estáticos
app.use('/images', express.static(path.join(__dirname, 'images')));

// ==========================================
// ROTAS DE PRODUTOS
// ==========================================
app.get('/produtos', (req, res) => {
    db.all("SELECT * FROM produtos", [], (err, rows) => {
        if (err) return res.status(500).json({ erro: "Erro ao buscar catálogo do galpão." });
        res.json(rows);
    });
});

app.get('/produtos/:id', (req, res) => {
    const { id } = req.params;
    db.get("SELECT * FROM produtos WHERE id_produto = ?", [id], (err, row) => {
        if (err) return res.status(500).json({ erro: err.message });
        if (!row) return res.status(404).json({ erro: "Flor não encontrada no sistema." });
        res.json(row);
    });
});

app.post('/produtos', (req, res) => {
    // Agora recebemos o campo em_promocao do telemóvel
    const { nome, descricao, preco, imagem_url, estoque, fk_id_categoria, em_promocao } = req.body;
    if (!nome || !preco) return res.status(400).json({ erro: "Nome e Preço são obrigatórios." });

    db.run(
        "INSERT INTO produtos (nome, descricao, preco, imagem_url, estoque, fk_id_categoria, em_promocao) VALUES (?, ?, ?, ?, ?, ?, ?)",
        // Se o front não mandar nada, assumimos 0 (Não é promoção)
        [nome, descricao, preco, imagem_url, estoque, fk_id_categoria, em_promocao || 0],
        function(err) {
            if (err) return res.status(500).json({ erro: "Falha na inserção do banco." });
            res.status(201).json({ mensagem: "Flor registada com sucesso!", id_produto: this.lastID });
        }
    );
});

// ==========================================
// ROTAS DE USUÁRIOS
// ==========================================
app.post('/usuarios', (req, res) => {
    const { nome, email, senha } = req.body;
    db.run("INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)", [nome, email, senha], function(err) {
        if (err) return res.status(400).json({ erro: err.message });
        res.json({ id: this.lastID, nome, email });
    });
});

// ==========================================
// ROTA DE CHECKOUT (PEDIDOS E PAGAMENTOS)
// ==========================================
app.post('/pedidos', (req, res) => {
    const { fk_id_usuario, fk_id_endereco, valor_total, metodo_pagamento, itens } = req.body;

    if (!fk_id_usuario || !fk_id_endereco || !valor_total || !metodo_pagamento) {
        return res.status(400).json({ erro: "Faltam dados obrigatórios para fechar a compra." });
    }

    db.run(
        `INSERT INTO pedidos (valor_total, status, fk_id_usuario, fk_id_endereco) VALUES (?, 'Aguardando Pagamento', ?, ?)`,
        [valor_total, fk_id_usuario, fk_id_endereco],
        function(err) {
            if (err) return res.status(500).json({ erro: "Erro ao gerar pedido: " + err.message });
            
            const idPedidoGerado = this.lastID;

            db.run(
                `INSERT INTO pagamentos (metodo, status, valor, fk_id_pedido) VALUES (?, 'Pendente', ?, ?)`,
                [metodo_pagamento, valor_total, idPedidoGerado]
            );

            if (itens && itens.length > 0) {
                const stmt = db.prepare(`INSERT INTO itens_pedido (fk_id_pedido, fk_id_produto, qtd, preco_unit) VALUES (?, ?, ?, ?)`);
                itens.forEach(item => {
                    stmt.run([idPedidoGerado, item.id_produto, item.qtd, item.preco]);
                });
                stmt.finalize();
            }

            res.status(201).json({ 
                mensagem: "Pedido e Pagamento processados com sucesso!", 
                numero_pedido: idPedidoGerado
            });
        }
    );
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor da Floricultura rodando na porta ${PORT}`);
});