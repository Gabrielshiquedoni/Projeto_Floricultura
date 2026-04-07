const db = require('./database');

db.serialize(() => {
    db.run(`INSERT INTO categorias (nome, descricao) VALUES ('Buquês', 'Arranjos florais tradicionais')`);
    db.run(`INSERT INTO categorias (nome, descricao) VALUES ('Cestas', 'Cestas de presentes')`);
    db.run(`INSERT INTO categorias (nome, descricao) VALUES ('Conjuntos', 'Conjuntos de plantas')`);
    db.run(`INSERT INTO categorias (nome, descricao) VALUES ('Mudas', 'Mudas de plantas')`);

    // Atenção ao 7º parâmetro: 1 (Em Promoção) ou 0 (Preço Normal)
    const stmt = db.prepare(`INSERT INTO produtos (nome, descricao, preco, imagem_url, estoque, fk_id_categoria, em_promocao) VALUES (?, ?, ?, ?, ?, ?, ?)`);

    // BUQUÊS
    stmt.run('Buquê de Rosas Vermelhas', 'Clássico buquê romântico.', 150.00, 'https://images.unsplash.com/photo-1591886960571-146e4b85c197?w=500', 10, 1, 1); // <-- PROMOÇÃO
    stmt.run('Girassol Solitário', 'Lindo girassol em vaso.', 45.90, 'https://images.unsplash.com/photo-1576014131795-d5e86574f8bd?w=500', 5, 1, 0);
    stmt.run('Buquê Flores do Campo', 'Mix de flores.', 89.90, 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=500', 8, 1, 0);

    // CESTAS E CONJUNTOS
    stmt.run('Cesta Romântica', 'Cesta com flores e chocolates.', 220.00, 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=500', 3, 2, 0);
    stmt.run('Kit Suculentas', 'Três mini suculentas.', 55.00, 'https://images.unsplash.com/photo-1459156212016-c812468e5515?w=500', 15, 3, 1); // <-- PROMOÇÃO

    // MUDAS
    stmt.run('Muda Espada de S. Jorge', 'Planta resistente.', 35.00, 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=500', 20, 4, 0);
    stmt.run('Muda de Samambaia', 'Planta pendente.', 40.00, 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=500', 12, 4, 1); // <-- PROMOÇÃO
    stmt.run('Muda de Alecrim', 'Erva aromática.', 15.00, 'https://images.unsplash.com/photo-1595286469037-336c1e5502c6?w=500', 30, 4, 0);

    stmt.finalize();
    console.log("🌱 BANCO ATUALIZADO: Produtos inseridos com sinalizador de promoção!");
});