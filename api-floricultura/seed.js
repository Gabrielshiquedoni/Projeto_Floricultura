const db = require('./database');

db.serialize(() => {
    db.run(`INSERT INTO categorias (nome, descricao) VALUES ('Buquês', 'Arranjos florais tradicionais')`);
    db.run(`INSERT INTO categorias (nome, descricao) VALUES ('Conjuntos', 'Conjuntos de plantas')`);
    db.run(`INSERT INTO categorias (nome, descricao) VALUES ('Mudas', 'Mudas de plantas')`);

    const stmt = db.prepare(`INSERT INTO produtos (nome, descricao, preco, imagem_url, estoque, fk_id_categoria, em_promocao) VALUES (?, ?, ?, ?, ?, ?, ?)`);

    stmt.run('Buquê de Rosas Vermelhas', 'Clássico buquê romântico.', 150.00, 'buque_rosas.png', 10, 1, 1); // <-- PROMOÇÃO
    stmt.run('Buque de Girassol', 'Lindo buque de girassol.', 45.90, 'buquedegirassol.png', 5, 1, 0);
    stmt.run('Buquê Flores do Campo', 'Mix de flores.', 89.90, 'buque_campo.png', 8, 1, 0);

    stmt.run('Cesta Romântica', 'Cesta com flores e chocolates.', 220.00, 'cesta_chocolate.png', 3, 2, 0);
    stmt.run('Kit Suculentas', 'Três mini suculentas.', 55.00, 'kit_suculentas.png', 15, 2, 1); // <-- PROMOÇÃO

    stmt.run('Muda Espada de S. Jorge', 'Planta resistente.', 35.00, 'muda_s_jorge.png', 20, 3, 0);
    stmt.run('Muda de Samambaia', 'Planta pendente.', 40.00, 'muda_samambaia.png', 12, 3, 1); // <-- PROMOÇÃO
    stmt.run('Muda de Alecrim', 'Erva aromática.', 15.00, 'muda_alecrim.png', 30, 3, 0);

    stmt.finalize();
    console.log("🌱 BANCO ATUALIZADO: Produtos inseridos com sinalizador de promoção!");
});