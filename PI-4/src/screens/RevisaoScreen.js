import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Rodape from '../components/Rodape';
import MenuOverlay from '../components/MenuOverlay';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, MaterialIcons, Entypo } from "@expo/vector-icons";

export default function RevisaoScreen() {
    const [menuVisible, setMenuVisible] = useState(false);
          
    const navigation = useNavigation();

    const goToHome = () => {
        navigation.navigate('Home'); 
    };

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView>
            
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
                <TouchableOpacity onPress={() => setMenuVisible(true)}>
                    <Ionicons name="menu" size={28} color="#fff" />
                </TouchableOpacity>
            </View>

            
            <View style={styles.mainCard}>
                <Text style={styles.cardTitle}>Revise e confirme</Text>

                
                <View style={styles.section}>
                <MaterialIcons name="person-outline" size={22} color="#000" style={{ marginRight: 10 }} />
                <View>
                    <Text style={styles.sectionTitle}>Nome cliente</Text>
                    <Text style={styles.sectionSubtitle}>CPF 111.111.111-11</Text>
                </View>
                </View>

                <View style={styles.divider} />

                
                <View style={styles.section}>
                <Entypo name="location-pin" size={22} color="#000" style={{ marginRight: 10 }} />
                <View>
                    <Text style={styles.sectionTitle}>R. José Galdino da Silva,</Text>
                    <Text style={styles.sectionSubtitle}>Enviar no meu endereço</Text>
                </View>
                </View>

                <View style={styles.divider} />

                
                <View style={styles.produtoBox}>
                <Image
                    source={require('../../assets/images/rosa7.jpeg')}
                    style={styles.produtoImagem}
                />

                <View style={{ flex: 1 }}>
                    <Text style={styles.produtoEntrega}>
                    Chegará no seu endereço entre terça-feira e sexta-feira
                    </Text>
                    <Text style={styles.produtoDescricao}>Descrição do produto + quantidade</Text>
                </View>
                </View>

                <View style={styles.divider} />

                
                <View style={styles.sectionPagamento}>
                <Feather name="credit-card" size={20} color="#000" />

                <View style={{ marginLeft: 12 }}>
                    <Text style={styles.sectionTitle}>Pix</Text>
                    <Text style={styles.pagamentoPreco}>R$ 218,00</Text>

                    <Text style={styles.pagamentoInfo}>
                    Ao confirmar a compra, você terá as informações para pagar.
                    </Text>

                    <View style={styles.checkboxRow}>
                    <Text style={styles.checkboxLabel}>Pague agora para garantir sua compra!</Text>
                    </View>
                </View>
                </View>

                
                <View style={styles.resumoBox}>
                <Text style={styles.resumoTitle}>Resumo da compra:</Text>

                <Text style={styles.resumoLine}>Produto: R$ 199,99</Text>
                <Text style={styles.resumoLine}>Frete:   GRÁTIS</Text>

                <Text style={[styles.resumoLine, { marginTop: 12 }]}>
                    Total: <Text style={{ fontWeight: "bold" }}>R$ 199,99</Text>
                </Text>
                </View>
            </View>

            
            <View style={styles.btnRow}>
                <TouchableOpacity style={styles.btnVoltar} onPress={() => (navigation.navigate("CheckoutPagamento"))}>
                <Text style={styles.btnVoltarText}>Voltar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnContinuar} onPress={() => (navigation.navigate("ConfirmacaoPagamento"))}>
                <Text style={styles.btnContinuarText}>Continuar</Text>
                </TouchableOpacity>
            </View>
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
    backgroundColor: "#141B18",
    flex: 1,
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

  mainCard: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 16,
    padding: 15,
  },

  cardTitle: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },

  section: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },

  sectionTitle: {
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
  },

  sectionSubtitle: {
    fontSize: 13,
    color: "#555",
  },

  divider: {
    height: 1,
    backgroundColor: "#ccc",
    width: "100%",
  },

  produtoBox: {
    flexDirection: "row",
    paddingVertical: 15,
    alignItems: "center",
  },

  produtoImagem: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },

  produtoEntrega: {
    fontSize: 14,
    color: "#000",
    fontWeight: "600",
    marginBottom: 4,
  },

  produtoDescricao: {
    fontSize: 13,
    color: "#555",
  },

  sectionPagamento: {
    flexDirection: "row",
    paddingVertical: 15,
    alignItems: "flex-start",
  },

  pagamentoPreco: {
    marginTop: 2,
    color: "#000",
    fontWeight: "bold",
  },

  pagamentoInfo: {
    marginTop: 6,
    color: "#555",
    fontSize: 13,
    width: 230,
  },

  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  checkboxLabel: {
    marginLeft: 6,
    fontSize: 13,
    color: "#333",
  },

  resumoBox: {
    backgroundColor: "#1B1F1D",
    padding: 15,
    marginTop: 20,
    borderRadius: 12,
  },

  resumoTitle: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 10,
  },

  resumoLine: {
    color: "#ddd",
    fontSize: 14,
    marginTop: 4,
  },

  btnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 25,
    marginTop: 20,
  },

  btnVoltar: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },

  btnVoltarText: {
    color: "#000",
    fontWeight: "500",
  },

  btnContinuar: {
    backgroundColor: "#1B3A2F",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },

  btnContinuarText: {
    color: "#fff",
    fontWeight: "500",
  },
});