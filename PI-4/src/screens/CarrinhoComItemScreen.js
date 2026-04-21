import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants'; 
import MenuOverlay from '../components/MenuOverlay'; 
import { CartContext } from '../contexts/CartContext';
import { AuthContext } from '../contexts/AuthContext';

export default function CarrinhoComItemScreen() {
  const navigation = useNavigation();
  
  const { carrinho, adicionarAoCarrinho, removerDoCarrinho, diminuirQuantidade } = useContext(CartContext);
  const { usuarioLogado, openAuthModal } = useContext(AuthContext);
  const [menuVisible, setMenuVisible] = useState(false);

  const hostUri = Constants.expoConfig?.hostUri || Constants.manifest?.debuggerHost;
  const ipComputador = hostUri ? hostUri.split(':')[0] : 'localhost';

  const subtotal = carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  const discount = 15.00; 
  const finalTotal = subtotal - discount > 0 ? subtotal - discount : 0;

  if (carrinho.length === 0) {
    setTimeout(() => navigation.navigate("CarrinhoVazio"), 50);
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00ff00" />
          <Text style={{ marginTop: 10, color: '#A0AAB2' }}>Seu carrinho está vazio...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={require('../../assets/images/LogoSemFundo.png')} style={styles.logo} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.logoText}>Jardim Encantado</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="cart-outline" size={26} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Ionicons name="menu" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.cartHeaderTitle}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.title}>Meu Carrinho</Text>
        </View>

        <Text style={styles.subtitle}>Confira seus produtos</Text>

        {carrinho.map((item) => {
          let imagemDoCarrinho = require('../../assets/images/LogoSemFundo.png');
          
          if (item.imagem_url && item.imagem_url.length > 4) {
            imagemDoCarrinho = { uri: `http://${ipComputador}:3000/images/${item.imagem_url}` };
          }

          const precoItemFormatado = Number(item.preco).toFixed(2).replace('.', ',');

          return (
            <View key={item.id_produto} style={styles.itemCard}>
              <Image source={imagemDoCarrinho} style={styles.itemImage} />
              
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.nome}</Text>
                <Text style={styles.itemPrice}>R$ {precoItemFormatado}</Text>
                
                <View style={styles.quantityControlContainer}>
                  <View style={styles.quantityControl}>
                    <TouchableOpacity onPress={() => diminuirQuantidade(item.id_produto)}>
                      <Text style={styles.quantityButton}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantidade}</Text>
                    <TouchableOpacity onPress={() => adicionarAoCarrinho(item)}>
                      <Text style={styles.quantityButton}>+</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={() => removerDoCarrinho(item.id_produto)}>
                    <Feather name="trash-2" size={20} color="#FF6B6B" style={styles.trashIcon} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}

        <View style={styles.summaryBox}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Subtotal</Text>
            <Text style={styles.summaryValue}>R$ {subtotal.toFixed(2).replace('.', ',')}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Desconto</Text>
            <Text style={styles.summaryValueDiscount}>- R$ {discount.toFixed(2).replace('.', ',')}</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalValue}>R$ {finalTotal.toFixed(2).replace('.', ',')}</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.checkoutButton}
          onPress={() => {
            if (!usuarioLogado) {
              Alert.alert('Login necessário', 'Faça login para finalizar sua compra.');
              openAuthModal('login');
              return;
            }
            navigation.navigate('ConfirmarEntrega');
          }} 
        >
          <Text style={styles.checkoutButtonText}>Finalizar compra</Text>
        </TouchableOpacity>
      </ScrollView>

      {menuVisible && <MenuOverlay onClose={() => setMenuVisible(false)} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#141B18' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { backgroundColor: '#1B1F1D', paddingVertical: 18, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 6 },
  logoText: { color: '#FFFFFF', fontSize: 20, fontWeight: '600' },
  logo: { width: 40, height: 40 },
  scrollContent: { padding: 20, paddingBottom: 100 },
  cartHeaderTitle: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginTop: 10 },
  backButton: { padding: 8 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#FFF', marginLeft: 10 },
  subtitle: { fontSize: 16, color: '#A0AAB2', marginBottom: 20, marginLeft: 5 },
  itemCard: { backgroundColor: '#1A2421', borderRadius: 12, padding: 15, flexDirection: 'row', marginBottom: 15, alignItems: 'center', shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 3, elevation: 2 },
  itemImage: { width: 75, height: 75, borderRadius: 10, marginRight: 15 },
  itemDetails: { flex: 1 },
  itemName: { fontSize: 15, fontWeight: 'bold', color: '#FFF', marginBottom: 5 },
  itemPrice: { fontSize: 17, color: '#00ff00', fontWeight: 'bold', marginBottom: 10 },
  quantityControlContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  quantityControl: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#2C3A35', borderRadius: 8 },
  quantityButton: { color: '#FFF', fontSize: 18, paddingHorizontal: 15, paddingVertical: 5 },
  quantityText: { color: '#FFF', fontSize: 15, paddingHorizontal: 10, fontWeight: '600' },
  trashIcon: { marginLeft: 15, padding: 5 },
  summaryBox: { backgroundColor: '#1A2421', borderRadius: 12, padding: 20, marginBottom: 20, marginTop: 10 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  summaryText: { fontSize: 15, color: '#A0AAB2' },
  summaryValue: { fontSize: 15, color: '#FFF', fontWeight: 'bold' },
  summaryValueDiscount: { fontSize: 15, color: '#00ff00', fontWeight: 'bold' },
  totalRow: { borderTopWidth: 1, borderTopColor: '#2C3A35', paddingTop: 15, marginTop: 5 },
  totalText: { fontSize: 17, color: '#FFF', fontWeight: 'bold' },
  totalValue: { fontSize: 21, color: '#00ff00', fontWeight: 'bold' },
  checkoutButton: { backgroundColor: '#00ff00', paddingVertical: 18, borderRadius: 12, alignItems: 'center', shadowColor: "#00ff00", shadowOpacity: 0.2, shadowRadius: 5, elevation: 3 },
  checkoutButtonText: { color: '#1B1F1D', fontSize: 17, fontWeight: 'bold' },
});