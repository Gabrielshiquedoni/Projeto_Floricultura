const db = require('./database');

db.serialize(() => {
    console.log('⏳ Injetando dados...');

    // 1. Inserir Categorias
    db.run(`INSERT INTO categorias (nome, descricao) VALUES ('Buquês', 'Buquês montados para presentes')`);
    db.run(`INSERT INTO categorias (nome, descricao) VALUES ('Arranjos', 'Arranjos de mesa e decoração')`);

    // 2. Inserir Produtos (com URLs de imagens reais para o Front-end da sua colega não ficar feio)
    db.run(`INSERT INTO produtos (nome, descricao, preco, imagem_url, estoque, fk_id_categoria) VALUES 
        ('Buquê de Rosas Vermelhas', 'Clássico buquê com 12 rosas', 120.00, 'https://images.unsplash.com/photo-1591886960571-146e4b85c197?w=500', 10, 1)`);
        
    db.run(`INSERT INTO produtos (nome, descricao, preco, imagem_url, estoque, fk_id_categoria) VALUES 
        ('Girassol Unitário', 'Lindo girassol para iluminar o dia', 25.50, 'https://images.unsplash.com/photo-1551893665-f843f600794e?w=500', 30, 2)`);
        
    db.run(`INSERT INTO produtos (nome, descricao, preco, imagem_url, estoque, fk_id_categoria) VALUES 
        ('Orquídea Branca', 'Orquídea em vaso de cerâmica', 85.00, 'https://images.unsplash.com/photo-1582274528667-1e8a10058b3c?w=500', 5, 2)`);

    console.log('🌱 Estoque inicial injetado com sucesso no banco de dados!');
});

// Dá 1 segundo para o banco processar e encerra o script
setTimeout(() => {
    db.close();
}, 1000);