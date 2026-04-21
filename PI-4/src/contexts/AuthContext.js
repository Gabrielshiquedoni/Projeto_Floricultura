import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('login');
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  const openAuthModal = (type = 'login') => {
    setModalType(type);
    setModalVisible(true);
  };

  const closeAuthModal = () => setModalVisible(false);

  const logout = () => {
    setUsuarioLogado(null);
  };

  return (
    <AuthContext.Provider value={{
      modalVisible, modalType, openAuthModal, closeAuthModal, setModalType,
      usuarioLogado, setUsuarioLogado, logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};