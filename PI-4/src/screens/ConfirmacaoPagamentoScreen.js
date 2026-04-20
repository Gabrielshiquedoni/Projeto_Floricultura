import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MenuOverlay from '../components/MenuOverlay';
import Rodape from '../components/Rodape';
import { CartContext } from '../contexts/CartContext';

export default function ConfirmacaoPagamentoScreen() {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();
  const { carrinho, limparCarrinho } = useContext(CartContext);

  // Gera número de pedido aleatório no formato #JE-XXXXX
  const numeroPedido = `#JE-${String(Math.floor(10000 + Math.random() * 90000))}`;

  // Calcula total do carrinho
  const total = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
  const totalFormatado = total.toFixed(2).replace('.', ',');

  const goToHome = () => {
    limparCarrinho();
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image source={require('../../assets/images/LogoSemFundo.png')} style={styles.logo} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={styles.logoText}>Jardim Encantado</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setMenuVisible(true)}>
            <Ionicons name="menu" size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Card de Sucesso */}
        <View style={styles.successCard}>
          <View style={styles.iconCircle}>
            <Feather name="check-circle" size={52} color="#00ff00" />
          </View>

          <Text style={styles.successTitle}>Pedido Realizado!</Text>
          <Text style={styles.successSubtitle}>Seu pedido foi processado com sucesso</Text>

          <View style={styles.pedidoBox}>
            <Text style={styles.pedidoLabel}>Número do Pedido</Text>
            <Text style={styles.pedidoNumero}>{numeroPedido}</Text>
          </View>
        </View>

        {/* Resumo */}
        <View style={styles.resumoCard}>
          <Text style={styles.resumoTitle}>Resumo do Pedido</Text>

          {carrinho.map((item) => {
            const precoItem = Number(item.preco * item.quantidade).toFixed(2).replace('.', ',');
            return (
              <View key={item.id_produto} style={styles.resumoRow}>
                <Text style={styles.resumoItem} numberOfLines={1}>
                  {item.quantidade}x {item.nome}
                </Text>
                <Text style={styles.resumoPreco}>R$ {precoItem}</Text>
              </View>
            );
          })}

          <View style={styles.divider} />

          <View style={styles.resumoRow}>
            <Text style={styles.resumoItem}>Frete</Text>
            <Text style={[styles.resumoPreco, { color: '#00ff00' }]}>GRÁTIS</Text>
          </View>

          <View style={[styles.resumoRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValor}>R$ {totalFormatado}</Text>
          </View>
        </View>

        {/* Info de entrega */}
        <View style={styles.infoCard}>
          <Feather name="truck" size={20} color="#00ff00" style={{ marginRight: 12 }} />
          <View style={{ flex: 1 }}>
            <Text style={styles.infoTitle}>Previsão de Entrega</Text>
            <Text style={styles.infoSubtitle}>Entre terça-feira e sexta-feira</Text>
          </View>
        </View>

        {/* Botão Home */}
        <TouchableOpacity style={styles.homeButton} onPress={goToHome} activeOpacity={0.8}>
          <Feather name="home" size={20} color="#1B1F1D" />
          <Text style={styles.homeButtonText}>Voltar para a Home</Text>
        </TouchableOpacity>

        <Rodape />
        {menuVisible && <MenuOverlay onClose={() => setMenuVisible(false)} />}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#141B18' },

  header: {
    backgroundColor: '#1B1F1D', paddingVertical: 18, paddingHorizontal: 20,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    elevation: 6, shadowColor: '#000', shadowOpacity: 0.2, shadowOffset: { width: 0, height: 2 }, shadowRadius: 3,
  },
  logoText: { color: '#FFFFFF', fontSize: 22, fontWeight: '600', letterSpacing: 0.5 },
  logo: { width: 40, height: 40 },

  successCard: {
    backgroundColor: '#1A2421', marginHorizontal: 20, marginTop: 30,
    borderRadius: 20, padding: 30, alignItems: 'center',
  },
  iconCircle: {
    backgroundColor: '#141B18', width: 90, height: 90, borderRadius: 45,
    justifyContent: 'center', alignItems: 'center', marginBottom: 20,
    borderWidth: 3, borderColor: '#00ff00',
  },
  successTitle: { fontSize: 26, fontWeight: 'bold', color: '#FFF', marginBottom: 6 },
  successSubtitle: { fontSize: 15, color: '#A0AAB2', textAlign: 'center' },

  pedidoBox: {
    backgroundColor: '#2C3A35', paddingVertical: 14, paddingHorizontal: 24,
    borderRadius: 12, marginTop: 20, alignItems: 'center',
  },
  pedidoLabel: { fontSize: 12, color: '#A0AAB2', marginBottom: 4 },
  pedidoNumero: { fontSize: 22, fontWeight: 'bold', color: '#00ff00', letterSpacing: 2 },

  resumoCard: {
    backgroundColor: '#1A2421', marginHorizontal: 20, marginTop: 20,
    borderRadius: 16, padding: 20,
  },
  resumoTitle: { fontSize: 16, fontWeight: '600', color: '#FFF', marginBottom: 15 },
  resumoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  resumoItem: { fontSize: 14, color: '#ddd', flex: 1, marginRight: 10 },
  resumoPreco: { fontSize: 14, color: '#FFF', fontWeight: '600' },
  divider: { height: 1, backgroundColor: '#2C3A35', marginVertical: 10 },
  totalRow: { borderTopWidth: 1, borderTopColor: '#2C3A35', paddingTop: 12, marginTop: 5 },
  totalLabel: { fontSize: 17, fontWeight: 'bold', color: '#FFF' },
  totalValor: { fontSize: 20, fontWeight: 'bold', color: '#00ff00' },

  infoCard: {
    backgroundColor: '#1A2421', marginHorizontal: 20, marginTop: 15,
    borderRadius: 12, padding: 16, flexDirection: 'row', alignItems: 'center',
  },
  infoTitle: { fontSize: 14, fontWeight: '600', color: '#FFF' },
  infoSubtitle: { fontSize: 13, color: '#A0AAB2', marginTop: 2 },

  homeButton: {
    backgroundColor: '#00ff00', marginHorizontal: 20, marginTop: 25,
    paddingVertical: 16, borderRadius: 12, alignItems: 'center',
    flexDirection: 'row', justifyContent: 'center', gap: 10,
    shadowColor: '#00ff00', shadowOpacity: 0.3, shadowRadius: 6, elevation: 4,
  },
  homeButtonText: { color: '#1B1F1D', fontSize: 17, fontWeight: 'bold' },
});
