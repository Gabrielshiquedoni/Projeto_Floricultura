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
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ContainerSecao from '../components/ContainerSecao';
import Rodape from '../components/Rodape';
import MenuOverlay from '../components/MenuOverlay';
import { useNavigation } from '@react-navigation/native';

export default function MudaScreen() {
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
      const response = await fetch("http://192.168.X.X:3000/produtos");
      const data = await response.json();
      setProdutos(data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    } finally {
      setLoading(false);
    }
  };

  const promocoes = produtos.slice(0, 3);
    const maisVendidos = produtos.slice(3, 6);
  
    if (loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
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
            <TouchableOpacity onPress={() => navigation.navigate("Carrinho")}>
              <Ionicons name="cart-outline" size={26} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMenuVisible(true)}>
              <Ionicons name="menu" size={28} color="#fff" />
            </TouchableOpacity>
          </View>

        <ContainerSecao>
            <Text style={styles.sectionTitle}>Promoções</Text>
    
            <FlatList
                data={promocoes}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id_produto.toString()}
                renderItem={({ item }) => (
                <ProductCard
                    image={require('../../assets/images/rosa7.jpeg')}
                    price={item.preco}
                />
                )}
                contentContainerStyle={{ paddingRight: 10 }}
            />
        </ContainerSecao>

        <ContainerSecao>
            <Text style={styles.sectionTitle}>Promoções</Text>
    
            <FlatList
                data={promocoes}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id_produto.toString()}
                renderItem={({ item }) => (
                <ProductCard
                    image={require('../../assets/images/rosa7.jpeg')}
                    price={item.preco}
                />
                )}
                contentContainerStyle={{ paddingRight: 10 }}
            />
        </ContainerSecao>

        <ContainerSecao>
            <Text style={styles.sectionTitle}>Promoções</Text>
    
            <FlatList
                data={promocoes}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id_produto.toString()}
                renderItem={({ item }) => (
                <ProductCard
                    image={require('../../assets/images/rosa7.jpeg')}
                    price={item.preco}
                />
                )}
                contentContainerStyle={{ paddingRight: 10 }}
            />
        </ContainerSecao>
        <Rodape/>
        
            {menuVisible && (
                <MenuOverlay onClose={() => setMenuVisible(false)} />
            )}
            </ScrollView>
        </SafeAreaView>
)};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141B18", // fundo claro igual ao Figma
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },

  /* ================= HEADER ================= */
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

  /* ================= CARD DE PRODUTO ================= */
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