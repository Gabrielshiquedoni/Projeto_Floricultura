const db = require('./database');

db.serialize(() => {
    // Insere Categorias
    db.run(`INSERT INTO categorias (nome, descricao) VALUES ('Buquês', 'Arranjos florais tradicionais')`);
    db.run(`INSERT INTO categorias (nome, descricao) VALUES ('Cestas', 'Cestas de presentes e café da manhã')`);

    // Insere Produtos Iniciais
    db.run(`INSERT INTO produtos (nome, descricao, preco, imagem_url, estoque, fk_id_categoria) VALUES ('Buquê de Rosas Vermelhas', 'Clássico buquê com 12 rosas.', 150.00, 'https://images.unsplash.com/photo-1591886960571-146e4b85c197?w=500', 10, 1)`);
    db.run(`INSERT INTO produtos (nome, descricao, preco, imagem_url, estoque, fk_id_categoria) VALUES ('Girassol Solitário', 'Lindo girassol em vaso.', 45.90, 'https://images.unsplash.com/photo-1576014131795-d5e86574f8bd?w=500', 5, 1)`);
    db.run(`INSERT INTO produtos (nome, descricao, preco, imagem_url, estoque, fk_id_categoria) VALUES ('Cesta Romântica', 'Cesta com flores e chocolates.', 220.00, 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=500', 3, 2)`);

    console.log("🌱 Banco populado com categorias e produtos de teste!");
});