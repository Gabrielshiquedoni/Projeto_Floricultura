import Constants from 'expo-constants';

// Resolve o IP dinâmico do servidor (funciona no Expo Go)
const hostUri = Constants.expoConfig?.hostUri || Constants.manifest?.debuggerHost;
const ipComputador = hostUri ? hostUri.split(':')[0] : 'localhost';

export const BASE_URL = `http://${ipComputador}:3000`;

// ========================
// PRODUTOS
// ========================

export const getProdutos = async () => {
  try {
    const response = await fetch(`${BASE_URL}/produtos`);
    if (!response.ok) throw new Error('Erro ao buscar produtos');
    return await response.json();
  } catch (error) {
    console.error('getProdutos:', error.message);
    throw error;
  }
};

export const createProduto = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/api/produtos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erro ao criar produto');
    return await response.json();
  } catch (error) {
    console.error('createProduto:', error.message);
    throw error;
  }
};

export const updateProduto = async (id, data) => {
  try {
    const response = await fetch(`${BASE_URL}/api/produtos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erro ao atualizar produto');
    return await response.json();
  } catch (error) {
    console.error('updateProduto:', error.message);
    throw error;
  }
};

export const deleteProduto = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/produtos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao deletar produto');
    return await response.json();
  } catch (error) {
    console.error('deleteProduto:', error.message);
    throw error;
  }
};

// ========================
// CEP (BFF Correios)
// ========================

export const buscarCep = async (cep) => {
  try {
    const cepLimpo = cep.replace(/\D/g, '');
    const response = await fetch(`${BASE_URL}/api/cep/${cepLimpo}`);
    if (response.status === 404) throw new Error('CEP não encontrado');
    if (!response.ok) throw new Error('Erro ao consultar CEP');
    return await response.json();
  } catch (error) {
    console.error('buscarCep:', error.message);
    throw error;
  }
};
