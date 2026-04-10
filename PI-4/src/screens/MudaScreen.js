import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import ContainerSecao from '../components/ContainerSecao';
import MenuOverlay from '../components/MenuOverlay';
import ProdutoCard from '../components/ProdutoCard'; 
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../contexts/AuthContext';
import { Feather, Ionicons } from '@expo/vector-icons';

export default function MudaScreen() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);
  const { openAuthModal } = useContext(AuthContext);
  const navigation = useNavigation();

  const hostUri = Constants.expoConfig?.hostUri || Constants.manifest?.debuggerHost;
  const ipComputador = hostUri ? hostUri.split(':')[0] : 'localhost';

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      const urlApi = `http://${ipComputador}:3000/produtos`;
      const response = await fetch(urlApi);
      const data = await response.json();
      
      const apenasMudas = data.filter(item => item.fk_id_categoria === 3);
      setProdutos(apenasMudas);
    } catch (error) {
      console.error("Erro ao carregar mudas:", error);
    } finally {
      setLoading(false);
    }
  };

  const promocoes = produtos.filter(item => item.em_promocao === 1);
  const maisVendidos = produtos.filter(item => item.em_promocao === 0).slice(0, 5);
  const novidades = [...produtos].reverse().slice(0, 4);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#00ff00" />
        <Text style={{ marginTop: 10 }}>Carregando Mudas...</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => {
    const precoFormatado = Number(item.preco).toFixed(2).replace('.', ',');
    let imagemSegura = require('../../assets/images/LogoSemFundo.png');

    if (item.imagem_url && item.imagem_url.length > 4) {
      if (item.imagem_url.startsWith('http')) {
        imagemSegura = { uri: item.imagem_url };
      } else {
        imagemSegura = { uri: `http://${ipComputador}:3000/images/${item.imagem_url}` };
      }
    }
      
    return (
      <ProdutoCard 
        image={imagemSegura} 
        price={precoFormatado} 
        onPress={() => {
          navigation.navigate('Produto', { produtoData: item });
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        
        <View style={styles.headerSide}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image source={require('../../assets/images/LogoSemFundo.png')} style={styles.logo} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openAuthModal('login')} style={{ marginLeft: 15 }}>
            <Feather name="user" size={24} color="#00ff00" />
          </TouchableOpacity>
        </View>

        
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.logoText}>Jardim Encantado</Text>
        </TouchableOpacity>

        
        <View style={[styles.headerSide, { justifyContent: 'flex-end' }]}>
          <TouchableOpacity onPress={() => navigation.navigate('CarrinhoComItem')} style={{ marginRight: 15 }}>
            <Ionicons name="cart-outline" size={26} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setMenuVisible(true)}>
            <Ionicons name="menu" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        <Image source={require('../../assets/images/foto1.carrossel.jpg')} style={styles.banner} />

        <ContainerSecao>
          <Text style={styles.sectionTitle}>Mudas em Promoção</Text>
          <FlatList data={promocoes} horizontal showsHorizontalScrollIndicator={false} keyExtractor={(item) => item.id_produto.toString()} renderItem={renderItem} contentContainerStyle={{ paddingRight: 10 }} />
        </ContainerSecao>

        <ContainerSecao>
          <Text style={styles.sectionTitle}>Mudas Mais Vendidas</Text>
          <FlatList data={maisVendidos} horizontal showsHorizontalScrollIndicator={false} keyExtractor={(item) => item.id_produto.toString()} renderItem={renderItem} contentContainerStyle={{ paddingRight: 10 }} />
        </ContainerSecao>

        <ContainerSecao>
          <Text style={styles.sectionTitle}>Novas Mudas</Text>
          <FlatList data={novidades} horizontal showsHorizontalScrollIndicator={false} keyExtractor={(item) => item.id_produto.toString()} renderItem={renderItem} contentContainerStyle={{ paddingRight: 10 }} />
        </ContainerSecao>
      </ScrollView>
      {menuVisible && <MenuOverlay onClose={() => setMenuVisible(false)} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#141B18" },
  loading: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff" },
  header: { backgroundColor: '#1B1F1D', paddingVertical: 15, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 6 },
  headerSide: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  logoText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  logo: { width: 40, height: 40 },
  banner: { width: "100%", height: 200, borderRadius: 16, marginTop: 18, alignSelf: "center", resizeMode: "cover" },
  sectionTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 16 }
});