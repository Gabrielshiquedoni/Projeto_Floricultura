const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./floricultura.db', (err) => {
    if (err) {
        console.error('Erro ao conectar:', err.message);
    } else {
        console.log('✅ Banco Central conectado com sucesso!');
        db.serialize(() => {

            db.run(`CREATE TABLE IF NOT EXISTS categorias (id_categoria INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL, descricao TEXT)`);
            
            db.run(`CREATE TABLE IF NOT EXISTS produtos (id_produto INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL, descricao TEXT, preco REAL NOT NULL, imagem_url TEXT, estoque INTEGER, em_promocao INTEGER DEFAULT 0, fk_id_categoria INTEGER, FOREIGN KEY (fk_id_categoria) REFERENCES categorias (id_categoria))`);
            
            db.run(`CREATE TABLE IF NOT EXISTS usuarios (id_usuario INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL, email TEXT NOT NULL UNIQUE, senha TEXT, tipo TEXT, cpf TEXT, tel TEXT, data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP)`);
            
            db.run(`CREATE TABLE IF NOT EXISTS enderecos (id_endereco INTEGER PRIMARY KEY AUTOINCREMENT, cep TEXT, logradouro TEXT, numero TEXT, bairro TEXT, cidade TEXT, estado TEXT, referencia TEXT, fk_id_usuario INTEGER, FOREIGN KEY (fk_id_usuario) REFERENCES usuarios (id_usuario))`);
            
            db.run(`CREATE TABLE IF NOT EXISTS pedidos (id_pedido INTEGER PRIMARY KEY AUTOINCREMENT, valor_total REAL, status TEXT DEFAULT 'Aguardando Pagamento', data_pedido DATETIME DEFAULT CURRENT_TIMESTAMP, data_entrega DATE, periodo_entrega TEXT, mensagem_cartao TEXT, fk_id_usuario INTEGER, fk_id_endereco INTEGER, FOREIGN KEY (fk_id_usuario) REFERENCES usuarios (id_usuario), FOREIGN KEY (fk_id_endereco) REFERENCES enderecos (id_endereco))`);
            
            db.run(`CREATE TABLE IF NOT EXISTS pagamentos (id_pagamento INTEGER PRIMARY KEY AUTOINCREMENT, metodo TEXT NOT NULL, status TEXT DEFAULT 'Pendente', valor REAL NOT NULL, data_pagamento DATETIME DEFAULT CURRENT_TIMESTAMP, fk_id_pedido INTEGER, FOREIGN KEY (fk_id_pedido) REFERENCES pedidos (id_pedido))`);

            db.run(`CREATE TABLE IF NOT EXISTS itens_pedido (fk_id_pedido INTEGER, fk_id_produto INTEGER, qtd INTEGER, preco_unit REAL, personalizacao TEXT, PRIMARY KEY (fk_id_pedido, fk_id_produto), FOREIGN KEY (fk_id_pedido) REFERENCES pedidos (id_pedido), FOREIGN KEY (fk_id_produto) REFERENCES produtos (id_produto))`);
            
            console.log('✅ Todas as tabelas estruturadas e prontas.');
        });
    }
});

module.exports = db;