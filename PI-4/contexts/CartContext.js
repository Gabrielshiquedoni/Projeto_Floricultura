import React, { createContext, useState } from 'react';

// ==========================================
// A BLINDAGEM: Se a Home não achar o Provider, 
// ela usa esses valores falsos e NÃO CRASHA.
// ==========================================
export const CartContext = createContext({
  carrinho: [],
  adicionarAoCarrinho: (produto) => {
    alert("ERRO DE INFRAESTRUTURA: A Nuvem não está envelopando o App.js!");
  },
  removerDoCarrinho: () => {},
  limparCarrinho: () => {}
});

// A Nuvem Real
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

  const removerDoCarrinho = (id_produto) => {
    setCarrinho((carrinhoAtual) => carrinhoAtual.filter(item => item.id_produto !== id_produto));
  };

  const limparCarrinho = () => setCarrinho([]);

  return (
    <CartContext.Provider value={{ carrinho, adicionarAoCarrinho, removerDoCarrinho, limparCarrinho }}>
      {children}
    </CartContext.Provider>
  );
};