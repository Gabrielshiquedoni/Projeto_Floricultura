const express = require('express');
const cors = require('cors');
const db = require('./database');
const path = require('path'); 

const app = express();
app.use(cors());
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

// ========================
// CRUD PRODUTOS
// ========================

// GET - Listar todos os produtos
app.get('/produtos', (req, res) => {
    db.all("SELECT * FROM produtos", [], (err, rows) => {
        if (err) return res.status(500).json({ erro: "Erro ao buscar catálogo do galpão." });
        res.json(rows);
    });
});

// GET - Buscar produto por ID
app.get('/produtos/:id', (req, res) => {
    const { id } = req.params;
    db.get("SELECT * FROM produtos WHERE id_produto = ?", [id], (err, row) => {
        if (err) return res.status(500).json({ erro: err.message });
        if (!row) return res.status(404).json({ erro: "Flor não encontrada no sistema." });
        res.json(row);
    });
});

// POST - Criar produto (rota original sem prefixo)
app.post('/produtos', (req, res) => {

    const { nome, descricao, preco, imagem_url, estoque, fk_id_categoria, em_promocao } = req.body;
    if (!nome || !preco) return res.status(400).json({ erro: "Nome e Preço são obrigatórios." });

    db.run(
        "INSERT INTO produtos (nome, descricao, preco, imagem_url, estoque, fk_id_categoria, em_promocao) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [nome, descricao, preco, imagem_url, estoque, fk_id_categoria, em_promocao || 0],
        function(err) {
            if (err) return res.status(500).json({ erro: "Falha na inserção do banco." });
            res.status(201).json({ mensagem: "Flor registada com sucesso!", id_produto: this.lastID });
        }
    );
});

// POST - Criar produto (rota com prefixo /api)
app.post('/api/produtos', (req, res) => {
    const { nome, descricao, preco, imagem_url, estoque, fk_id_categoria, em_promocao } = req.body;
    if (!nome || !preco) return res.status(400).json({ erro: "Nome e Preço são obrigatórios." });

    db.run(
        "INSERT INTO produtos (nome, descricao, preco, imagem_url, estoque, fk_id_categoria, em_promocao) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [nome, descricao, preco, imagem_url, estoque, fk_id_categoria, em_promocao || 0],
        function(err) {
            if (err) return res.status(500).json({ erro: "Falha na inserção do banco." });
            res.status(201).json({ mensagem: "Produto criado com sucesso!", id_produto: this.lastID });
        }
    );
});

// PUT - Atualizar produto por ID
app.put('/api/produtos/:id', (req, res) => {
    const { id } = req.params;
    const { nome, descricao, preco, imagem_url, estoque, fk_id_categoria, em_promocao } = req.body;

    db.run(
        "UPDATE produtos SET nome = ?, descricao = ?, preco = ?, imagem_url = ?, estoque = ?, fk_id_categoria = ?, em_promocao = ? WHERE id_produto = ?",
        [nome, descricao, preco, imagem_url, estoque, fk_id_categoria, em_promocao || 0, id],
        function(err) {
            if (err) return res.status(500).json({ erro: "Erro ao atualizar produto." });
            if (this.changes === 0) return res.status(404).json({ erro: "Produto não encontrado." });
            res.json({ mensagem: "Produto atualizado com sucesso!" });
        }
    );
});

// DELETE - Remover produto por ID
app.delete('/api/produtos/:id', (req, res) => {
    const { id } = req.params;

    db.run(
        "DELETE FROM produtos WHERE id_produto = ?",
        [id],
        function(err) {
            if (err) return res.status(500).json({ erro: "Erro ao deletar produto." });
            if (this.changes === 0) return res.status(404).json({ erro: "Produto não encontrado." });
            res.json({ mensagem: "Produto removido com sucesso!" });
        }
    );
});

// ========================
// CADASTRO DE USUÁRIOS
// ========================

app.post('/usuarios', (req, res) => {
    const { nome, email, senha } = req.body;
    db.run("INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)", [nome, email, senha], function(err) {
        if (err) return res.status(400).json({ erro: err.message });
        res.json({ id: this.lastID, nome, email });
    });
});

// ========================
// CRUD ADMINS
// ========================

// GET - Listar todos os admins
app.get('/api/admins', (req, res) => {
    db.all("SELECT id, nome, email FROM admins", [], (err, rows) => {
        if (err) return res.status(500).json({ erro: "Erro ao buscar admins." });
        res.json(rows);
    });
});

// POST - Cadastrar admin
app.post('/api/admins', (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ erro: "Nome, email e senha são obrigatórios." });
    }

    db.run(
        "INSERT INTO admins (nome, email, senha) VALUES (?, ?, ?)",
        [nome, email, senha],
        function(err) {
            if (err) return res.status(500).json({ erro: "Erro ao cadastrar admin." });
            res.status(201).json({ mensagem: "Admin cadastrado com sucesso!", id: this.lastID, nome, email });
        }
    );
});

// PUT - Atualizar admin
app.put('/api/admins/:id', (req, res) => {
    const { id } = req.params;
    const { nome, email, senha } = req.body;

    db.run(
        "UPDATE admins SET nome = ?, email = ?, senha = ? WHERE id = ?",
        [nome, email, senha, id],
        function(err) {
            if (err) return res.status(500).json({ erro: "Erro ao atualizar admin." });
            if (this.changes === 0) return res.status(404).json({ erro: "Admin não encontrado." });
            res.json({ mensagem: "Admin atualizado com sucesso!" });
        }
    );
});

// DELETE - Remover admin
app.delete('/api/admins/:id', (req, res) => {
    const { id } = req.params;

    db.run(
        "DELETE FROM admins WHERE id = ?",
        [id],
        function(err) {
            if (err) return res.status(500).json({ erro: "Erro ao deletar admin." });
            if (this.changes === 0) return res.status(404).json({ erro: "Admin não encontrado." });
            res.json({ mensagem: "Admin removido com sucesso!" });
        }
    );
});

// ========================
// PEDIDOS
// ========================

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

// ========================
// BFF - CONSULTA CEP (Correios)
// Estratégia: tenta o endpoint SOAP oficial dos Correios (SIGEP Web).
// Se falhar (403/timeout), utiliza a BrasilAPI como fallback (que consome dados dos Correios).
// ========================

app.get('/api/cep/:cep', async (req, res) => {
    const { cep } = req.params;

    // Validação básica: apenas dígitos, 8 caracteres
    const cepLimpo = cep.replace(/\D/g, '');
    if (cepLimpo.length !== 8) {
        return res.status(400).json({ erro: "CEP deve conter 8 dígitos." });
    }

    // --- Tentativa 1: SOAP Correios (SIGEP Web) ---
    try {
        const soapEnvelope = `<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cli="http://cliente.bean.master.sigep.bsb.correios.com.br/">
  <soapenv:Header/>
  <soapenv:Body>
    <cli:consultaCEP>
      <cep>${cepLimpo}</cep>
    </cli:consultaCEP>
  </soapenv:Body>
</soapenv:Envelope>`;

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(
            'https://apps.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente',
            {
                method: 'POST',
                headers: { 'Content-Type': 'text/xml;charset=UTF-8', 'SOAPAction': '' },
                body: soapEnvelope,
                signal: controller.signal
            }
        );

        clearTimeout(timeout);

        if (response.ok) {
            const xml = await response.text();

            if (xml.includes('CEP NAO ENCONTRADO') || xml.includes('Fault')) {
                return res.status(404).json({ erro: "CEP não encontrado nos Correios." });
            }

            const extrair = (tag) => {
                const match = xml.match(new RegExp(`<${tag}>([^<]*)</${tag}>`));
                return match ? match[1].trim() : '';
            };

            const endereco = {
                rua: extrair('end'),
                bairro: extrair('bairro'),
                cidade: extrair('cidade'),
                estado: extrair('uf'),
                cep: extrair('cep'),
                complemento: extrair('complemento2')
            };

            if (endereco.cidade) {
                console.log(`[CEP] ${cepLimpo} encontrado via Correios SOAP`);
                return res.json(endereco);
            }
        }
        // Se response não ok (403, etc), cai no fallback abaixo
    } catch (err) {
        // Timeout ou erro de rede no SOAP — seguir para fallback
        console.log(`[CEP] SOAP Correios falhou para ${cepLimpo}: ${err.message}`);
    }

    // --- Tentativa 2: Fallback via BrasilAPI (dados dos Correios) ---
    try {
        const controller2 = new AbortController();
        const timeout2 = setTimeout(() => controller2.abort(), 10000);

        const response2 = await fetch(
            `https://brasilapi.com.br/api/cep/v2/${cepLimpo}`,
            { signal: controller2.signal }
        );

        clearTimeout(timeout2);

        if (!response2.ok) {
            return res.status(404).json({ erro: "CEP não encontrado." });
        }

        const data = await response2.json();

        const endereco = {
            rua: data.street || '',
            bairro: data.neighborhood || '',
            cidade: data.city || '',
            estado: data.state || '',
            cep: data.cep || cepLimpo,
            complemento: ''
        };

        console.log(`[CEP] ${cepLimpo} encontrado via fallback (BrasilAPI/Correios)`);
        return res.json(endereco);

    } catch (error) {
        if (error.name === 'AbortError') {
            return res.status(500).json({ erro: "Timeout: o serviço de CEP não respondeu a tempo." });
        }
        console.error('[CEP] Falha total na consulta:', error.message);
        return res.status(500).json({ erro: "Falha ao consultar o serviço de CEP." });
    }
});

// ========================
// SERVIDOR
// ========================

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor da Floricultura rodando na porta ${PORT}`);
});