import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([]);

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

  const diminuirQuantidade = (id_produto) => {
    setCarrinho((carrinhoAtual) => {
      return carrinhoAtual.map(item => {
        if (item.id_produto === id_produto) {
          return { ...item, quantidade: item.quantidade - 1 };
        }
        return item;
      }).filter(item => item.quantidade > 0); 
    });
  };

  const removerDoCarrinho = (id_produto) => {
    setCarrinho((carrinhoAtual) => carrinhoAtual.filter(item => item.id_produto !== id_produto));
  };

  const limparCarrinho = () => setCarrinho([]);

  return (
    <CartContext.Provider value={{ carrinho, adicionarAoCarrinho, diminuirQuantidade, removerDoCarrinho, limparCarrinho }}>
      {children}
    </CartContext.Provider>
  );
};