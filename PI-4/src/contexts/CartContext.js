import React, { createContext, useState } from 'react';

// Criamos a "Nuvem" de dados do carrinho
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([]);

  // Função para adicionar (se já existir, soma a quantidade)
  const adicionarAoCarrinho = (produto) => {
    setCarrinho((carrinhoAtual) => {
      const itemExiste = carrinhoAtual.find(item => item.id_produto === produto.id_produto);
      
      if (itemExiste) {
        return carrinhoAtual.map(item => 
          item.id_produto === produto.id_produto 
            ? { ...item, quantidade: item.quantidade + 1 } 
            : item
        );
      } else {
        return [...carrinhoAtual, { ...produto, quantidade: 1 }];
      }
    });
  };

  // Função para remover um item por completo
  const removerDoCarrinho = (id_produto) => {
    setCarrinho((carrinhoAtual) => carrinhoAtual.filter(item => item.id_produto !== id_produto));
  };

  // Esvazia o carrinho (usado após a compra)
  const limparCarrinho = () => setCarrinho([]);

  return (
    <CartContext.Provider value={{ carrinho, adicionarAoCarrinho, removerDoCarrinho, limparCarrinho }}>
      {children}
    </CartContext.Provider>
  );
};