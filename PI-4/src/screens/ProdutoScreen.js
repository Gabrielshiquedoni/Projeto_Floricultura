import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants'; 
import { CartContext } from '../contexts/CartContext';

export default function ProdutoScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { adicionarAoCarrinho } = useContext(CartContext);

  // Recebe os dados que a Home mandou na mala
  const { produtoData } = route.params || {};

  // Se por acaso abrirem a tela sem dados, volta pra Home
  if (!produtoData) {
    navigation.goBack();
    return null;
  }

  // Lógica da Imagem Híbrida
  const hostUri = Constants.expoConfig?.hostUri || Constants.manifest?.debuggerHost;
  const ipComputador = hostUri ? hostUri.split(':')[0] : 'localhost';
  
  let imagemSegura = require('../../assets/images/LogoSemFundo.png');
  if (produtoData.imagem_url && produtoData.imagem_url.length > 4) {
    imagemSegura = { uri: `http://${ipComputador}:3000/images/${produtoData.imagem_url}` };
  }

  const precoFormatado = Number(produtoData.preco).toFixed(2).replace('.', ',');

  const handleAdicionar = () => {
    adicionarAoCarrinho(produtoData);
    alert(`🌿 ${produtoData.nome} adicionado ao carrinho!`);
    navigation.navigate("CarrinhoComItem"); // Joga o usuário pro carrinho após adicionar
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* CABEÇALHO */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={require('../../assets/images/LogoSemFundo.png')} style={styles.logo} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.logoText}>Jardim Encantado</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CarrinhoComItem')}>
          <Ionicons name="cart-outline" size={26} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* BOTÃO VOLTAR */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#FFF" />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>

        {/* FOTO GIGANTE DO PRODUTO */}
        <Image source={imagemSegura} style={styles.productImage} />

        {/* INFORMAÇÕES DO PRODUTO */}
        <View style={styles.infoContainer}>
          <Text style={styles.productName}>{produtoData.nome}</Text>
          <Text style={styles.productPrice}>R$ {precoFormatado}</Text>
          
          <Text style={styles.sectionTitle}>Descrição</Text>
          <Text style={styles.productDescription}>{produtoData.descricao}</Text>

          {/* ESTOQUE */}
          <Text style={styles.stockText}>Disponível em estoque: {produtoData.estoque} unidades</Text>
        </View>

        {/* BOTÃO ADICIONAR AO CARRINHO */}
        <TouchableOpacity style={styles.addButton} onPress={handleAdicionar}>
          <Ionicons name="cart" size={24} color="#1B1F1D" style={{marginRight: 10}} />
          <Text style={styles.addButtonText}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#141B18' },
  header: { backgroundColor: '#1B1F1D', paddingVertical: 18, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 6 },
  logoText: { color: '#FFFFFF', fontSize: 20, fontWeight: '600' },
  logo: { width: 40, height: 40 },
  scrollContent: { padding: 20, paddingBottom: 100 },
  backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  backText: { color: '#FFF', fontSize: 16, marginLeft: 8 },
  productImage: { width: '100%', height: 350, borderRadius: 20, marginBottom: 25, resizeMode: 'cover' },
  infoContainer: { backgroundColor: '#1A2421', padding: 25, borderRadius: 20, marginBottom: 25 },
  productName: { fontSize: 26, fontWeight: 'bold', color: '#FFF', marginBottom: 10 },
  productPrice: { fontSize: 28, color: '#00ff00', fontWeight: 'bold', marginBottom: 20 },
  sectionTitle: { fontSize: 18, color: '#FFF', fontWeight: 'bold', marginBottom: 10 },
  productDescription: { fontSize: 16, color: '#A0AAB2', lineHeight: 24, marginBottom: 20 },
  stockText: { fontSize: 14, color: '#A0AAB2', fontStyle: 'italic' },
  addButton: { backgroundColor: '#00ff00', paddingVertical: 18, borderRadius: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', shadowColor: "#00ff00", shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },
  addButtonText: { color: '#1B1F1D', fontSize: 18, fontWeight: 'bold' },
});