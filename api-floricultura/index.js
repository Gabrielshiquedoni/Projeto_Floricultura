const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
app.use(cors());
app.use(express.json());

// ROTAS DE PRODUTOS (CATÁLOGO)
// ==========================================

// 1. LISTAR TODOS OS PRODUTOS
app.get('/produtos', (req, res) => {
    db.all("SELECT * FROM produtos", [], (err, rows) => {
        if (err) return res.status(500).json({ erro: "Erro ao buscar produtos." });
        res.json(rows);
    });
});

// 2. BUSCAR UM PRODUTO ESPECÍFICO (Para a tela de detalhes da flor)
app.get('/produtos/:id', (req, res) => {
    const { id } = req.params;
    db.get("SELECT * FROM produtos WHERE id_produto = ?", [id], (err, row) => {
        if (err) return res.status(500).json({ erro: err.message });
        if (!row) return res.status(404).json({ erro: "Produto não encontrado." });
        res.json(row);
    });
});

// 3. CADASTRAR NOVO PRODUTO (Para o painel do dono da loja)
app.post('/produtos', (req, res) => {
    const { nome, descricao, preco, imagem_url, estoque, fk_id_categoria } = req.body;
    
    // Validação básica de segurança
    if (!nome || !preco) {
        return res.status(400).json({ erro: "Nome e Preço são obrigatórios!" });
    }

    db.run(
        "INSERT INTO produtos (nome, descricao, preco, imagem_url, estoque, fk_id_categoria) VALUES (?, ?, ?, ?, ?, ?)",
        [nome, descricao, preco, imagem_url, estoque, fk_id_categoria],
        function(err) {
            if (err) return res.status(500).json({ erro: "Erro ao cadastrar produto." });
            res.status(201).json({ mensagem: "Produto cadastrado!", id_produto: this.lastID });
        }
    );
});

// 4. ATUALIZAR UM PRODUTO (Ex: Mudar o preço ou estoque)
app.put('/produtos/:id', (req, res) => {
    const { id } = req.params;
    const { nome, descricao, preco, imagem_url, estoque, fk_id_categoria } = req.body;

    db.run(
        "UPDATE produtos SET nome = ?, descricao = ?, preco = ?, imagem_url = ?, estoque = ?, fk_id_categoria = ? WHERE id_produto = ?",
        [nome, descricao, preco, imagem_url, estoque, fk_id_categoria, id],
        function(err) {
            if (err) return res.status(500).json({ erro: "Erro ao atualizar." });
            if (this.changes === 0) return res.status(404).json({ erro: "Produto não existe." });
            res.json({ mensagem: "Produto atualizado com sucesso!" });
        }
    );
});

// 5. DELETAR UM PRODUTO
app.delete('/produtos/:id', (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM produtos WHERE id_produto = ?", [id], function(err) {
        if (err) return res.status(500).json({ erro: "Erro ao deletar." });
        if (this.changes === 0) return res.status(404).json({ erro: "Produto não existe." });
        res.json({ mensagem: "Produto excluído permanentemente." });
    });
});
// ==========================================

// Rota POST para o app cadastrar um usuário
app.post('/usuarios', (req, res) => {
    const { nome, email, senha } = req.body;
    db.run("INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)", [nome, email, senha], function(err) {
        if (err) return res.status(400).json({ erro: err.message });
        res.json({ id: this.lastID, nome, email });
    });
});



// Rota POST para o Front-end enviar o carrinho finalizado
app.post('/pedidos', (req, res) => {
    // O Front-end vai mandar esses dados:
    const { fk_id_usuario, fk_id_endereco, valor_total, metodo_pagamento, itens } = req.body;

    // 1. Cria o registro do pedido principal
    db.run(
        `INSERT INTO pedido_pagamento (fk_id_usuario, fk_id_endereco, valor_total, status, metodo_pagamento) VALUES (?, ?, ?, 'Aguardando Pagamento', ?)`,
        [fk_id_usuario, fk_id_endereco, valor_total, metodo_pagamento],
        function(err) {
            if (err) return res.status(500).json({ erro: "Erro ao fechar pedido: " + err.message });
            
            const idPedidoGerado = this.lastID;

            // 2. Salva os produtos que estavam dentro do carrinho (Itens do Pedido)
            // Se ela não mandar itens no MVP, não quebra a aplicação
            if (itens && itens.length > 0) {
                const stmt = db.prepare(`INSERT INTO itens_pedido (fk_id_pedido, fk_id_produto, qtd, preco_unit) VALUES (?, ?, ?, ?)`);
                itens.forEach(item => {
                    stmt.run([idPedidoGerado, item.id_produto, item.qtd, item.preco]);
                });
                stmt.finalize();
            }

            res.json({ 
                mensagem: "Pedido recebido com sucesso pela Floricultura!", 
                numero_pedido: idPedidoGerado,
                total_pago: valor_total
            });
        }
    );
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor da Floricultura rodando na porta ${PORT}`);
});