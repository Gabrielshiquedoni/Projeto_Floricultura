import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ContainerSecao from '../components/ContainerSecao';
import Rodape from '../components/Rodape';
import MenuOverlay from '../components/MenuOverlay';
import ProdutoCard from '../components/ProdutoCard'; 
import { useNavigation } from '@react-navigation/native';

export default function MudaScreen() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);

  const navigation = useNavigation();
  const goToHome = () => navigation.navigate('Home');

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
    const urlDaImagemReal = `http://${ipComputador}:3000/images/${item.imagem_url}`;

    const imagemSegura = item.imagem_url && item.imagem_url.length > 4
      ? { uri: urlDaImagemReal }
      : require('../../assets/images/LogoSemFundo.png');
      
    return (
      <ProdutoCard 
        image={imagemSegura} 
        price={precoFormatado} 
        // A MÁGICA DA NAVEGAÇÃO
        onPress={() => {
          // Aqui nós mandamos o aplicativo ir para a tela 'Produto' 
          // e levamos todos os dados do banco junto no pacote 'item'
          navigation.navigate('Produto', {
             produtoData: {
                id: item.id_produto,
                nome: item.nome,
                descricao: item.descricao,
                preco: precoFormatado,
                imagem: imagemSegura
             }
          });
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={goToHome}>
            <Image source={require('../../assets/images/LogoSemFundo.png')} style={styles.logo} />
          </TouchableOpacity>
          <TouchableOpacity onPress={goToHome}>
            <Text style={styles.logoText}>Jardim Encantado</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Carrinho")}>
            <Ionicons name="cart-outline" size={26} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setMenuVisible(true)}>
            <Ionicons name="menu" size={28} color="#fff" />
          </TouchableOpacity>
        </View>

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
        
        <Rodape/>
        {menuVisible && <MenuOverlay onClose={() => setMenuVisible(false)} />}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#141B18" },
  loading: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff" },
  header: { backgroundColor: "#1B1F1D", paddingVertical: 18, paddingHorizontal: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center", elevation: 6 },
  logoText: { color: "#FFFFFF", fontSize: 20, fontWeight: "600" },
  logo: { width: 40, height: 40 },
  banner: { width: "100%", height: 200, borderRadius: 16, marginTop: 18, alignSelf: "center", resizeMode: "cover" },
  sectionTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 16 }
});