import * as SQLite from 'expo-sqlite';

// Abrir ou criar o banco de dados
const db = SQLite.openDatabaseSync('usuarios.db');

// Inicializar banco de dados
export const initDatabase = async () => {
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        idade INTEGER,
        criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Banco de dados inicializado com sucesso');
    return true;
  } catch (error) {
    console.error('❌ Erro ao inicializar banco de dados:', error);
    return false;
  }
};

// Listar todos os usuários
export const getAllUsuarios = async () => {
  try {
    const result = await db.getAllAsync('SELECT * FROM usuarios ORDER BY id DESC');
    return result;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    throw error;
  }
};

// Buscar usuário por ID
export const getUsuarioById = async (id) => {
  try {
    const result = await db.getFirstAsync(
      'SELECT * FROM usuarios WHERE id = ?',
      [id]
    );
    return result;
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    throw error;
  }
};

// Criar novo usuário
export const createUsuario = async (nome, email, idade) => {
  try {
    const result = await db.runAsync(
      'INSERT INTO usuarios (nome, email, idade) VALUES (?, ?, ?)',
      [nome, email, idade || null]
    );
    return {
      id: result.lastInsertRowId,
      nome,
      email,
      idade
    };
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    throw error;
  }
};

// Atualizar usuário
export const updateUsuario = async (id, nome, email, idade) => {
  try {
    const result = await db.runAsync(
      'UPDATE usuarios SET nome = ?, email = ?, idade = ? WHERE id = ?',
      [nome, email, idade || null, id]
    );
    return result.changes > 0;
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    throw error;
  }
};

// Deletar usuário
export const deleteUsuario = async (id) => {
  try {
    const result = await db.runAsync(
      'DELETE FROM usuarios WHERE id = ?',
      [id]
    );
    return result.changes > 0;
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    throw error;
  }
};

// Limpar todos os usuários (útil para testes)
export const clearAllUsuarios = async () => {
  try {
    await db.runAsync('DELETE FROM usuarios');
    console.log('✅ Todos os usuários foram removidos');
    return true;
  } catch (error) {
    console.error('Erro ao limpar usuários:', error);
    throw error;
  }
};

export default db;
