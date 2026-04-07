import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import Constants from 'expo-constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ContainerSecao from '../components/ContainerSecao';
import Rodape from '../components/Rodape';
import MenuOverlay from '../components/MenuOverlay';
import ProdutoCard from '../components/ProdutoCard'; 
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);

  const navigation = useNavigation();
  
  const goToHome = () => {
    navigation.navigate('Home'); 
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      // Pega o IP do computador do professor ou o seu pelo Wi-Fi
      const hostUri = Constants.expoConfig?.hostUri || Constants.manifest?.debuggerHost;
      const ipComputador = hostUri ? hostUri.split(':')[0] : 'localhost';
      
      const urlApi = `http://${ipComputador}:3000/produtos`;

      const response = await fetch(urlApi);
      const data = await response.json();
      setProdutos(data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    } finally {
      setLoading(false);
    }
  };

  // 1. PROMOÇÕES: Pega EXCLUSIVAMENTE quem tem o "1" no banco de dados
  const promocoes = produtos.filter(item => item.em_promocao === 1);
  
  // 2. MAIS VENDIDOS: Como não temos um histórico real de vendas ainda, 
  // pegamos alguns itens que NÃO estão em promoção para encher a vitrine
  const maisVendidos = produtos.filter(item => item.em_promocao === 0).slice(0, 5);
  
  // 3. NOVIDADES: Os últimos que deram entrada no banco
  const novidades = [...produtos].reverse().slice(0, 4);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#00ff00" />
        <Text style={{ marginTop: 10 }}>Carregando catálogo...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={goToHome}>
            <Image
              source={require('../../assets/images/LogoSemFundo.png')}
              style={styles.logo}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={goToHome}>
            <Text style={styles.logoText}>Jardim Encantado</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("CarrinhoComItem")}>
            <Ionicons name="cart-outline" size={26} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setMenuVisible(true)}>
            <Ionicons name="menu" size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Banner */}
        <Image
          source={require('../../assets/images/foto1.carrossel.jpg')}
          style={styles.banner}
        />

        {/* PROMOÇÕES */}
        <ContainerSecao>
          <Text style={styles.sectionTitle}>Promoções</Text>
          <FlatList
            data={promocoes}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id_produto.toString()}
            renderItem={({ item }) => {
              // Regra de Negócio: Preço formatado e Foto de fallback
              const precoFormatado = Number(item.preco).toFixed(2).replace('.', ',');
              const imagemSegura = item.imagem_url && item.imagem_url.length > 5
                ? { uri: item.imagem_url }
                : require('../../assets/images/LogoSemFundo.png');

              return <ProdutoCard image={imagemSegura} price={precoFormatado} />;
            }}
            contentContainerStyle={{ paddingRight: 10 }}
          />
        </ContainerSecao>

        {/* MAIS VENDIDOS */}
        <ContainerSecao>
          <Text style={styles.sectionTitle}>Mais vendidos</Text>
          <FlatList
            data={maisVendidos}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id_produto.toString()}
            renderItem={({ item }) => {
              const precoFormatado = Number(item.preco).toFixed(2).replace('.', ',');
              const imagemSegura = item.imagem_url && item.imagem_url.length > 5
                ? { uri: item.imagem_url }
                : require('../../assets/images/LogoSemFundo.png');

              return <ProdutoCard image={imagemSegura} price={precoFormatado} />;
            }}
            contentContainerStyle={{ paddingRight: 10 }}
          />
        </ContainerSecao>

        {/* NOVIDADES (Lançamentos) */}
        <ContainerSecao>
          <Text style={styles.sectionTitle}>Novidades</Text>
          <FlatList
            data={novidades}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id_produto.toString()}
            renderItem={({ item }) => {
              const precoFormatado = Number(item.preco).toFixed(2).replace('.', ',');
              const imagemSegura = item.imagem_url && item.imagem_url.length > 5
                ? { uri: item.imagem_url }
                : require('../../assets/images/LogoSemFundo.png');

              return <ProdutoCard image={imagemSegura} price={precoFormatado} />;
            }}
            contentContainerStyle={{ paddingRight: 10 }}
          />
        </ContainerSecao>
        
        <Rodape/>

        {menuVisible && (
          <MenuOverlay onClose={() => setMenuVisible(false)} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141B18", 
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },

  header: {
    backgroundColor: "#1B1F1D",
    paddingVertical: 18,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },

  logoText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "600",
    letterSpacing: 0.5,
  },

  logo: {
    width: 40,
    height: 40,
  },

  banner: {
    width: "100%",
    height: 200,
    borderRadius: 16,
    marginTop: 18,
    alignSelf: "center",
    resizeMode: "cover",
  },

  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },

  sectionContainer: {
    backgroundColor: "#ffffff",
  },

  card: {
    backgroundColor: "#FFFFFF",
    width: 160,
    marginHorizontal: 12,
    borderRadius: 18,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
    alignItems: "center",
  },

  cardImage: {
    width: 135,
    height: 135,
    borderRadius: 14,
    marginBottom: 10,
  },

  cardPrice: {
    marginTop: 6,
    fontWeight: "700",
    fontSize: 16,
    color: "#1B1F1D",
  }
});