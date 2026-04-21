import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Rodape from '../components/Rodape';
import MenuOverlay from '../components/MenuOverlay';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, MaterialIcons, Entypo } from "@expo/vector-icons";
import { CartContext } from '../contexts/CartContext';
import Constants from 'expo-constants';

export default function RevisaoScreen() {
    const [menuVisible, setMenuVisible] = useState(false);
          
    const navigation = useNavigation();
    const route = useRoute();
    const { endereco, usuario, metodoPagamento } = route.params || {};
    const { carrinho } = useContext(CartContext);

    const hostUri = Constants.expoConfig?.hostUri || Constants.manifest?.debuggerHost;
    const ipComputador = hostUri ? hostUri.split(':')[0] : 'localhost';

    const goToHome = () => {
        navigation.navigate('Home'); 
    };

    const nomeComprador = usuario?.nome || 'Cliente';
    const emailComprador = usuario?.email || '';

    const enderecoCompleto = endereco
        ? `${endereco.rua}${endereco.numero ? `, ${endereco.numero}` : ''} - ${endereco.bairro}\n${endereco.cidade} - ${endereco.estado}, ${endereco.cep}`
        : 'Endereço não informado';

    const metodoLabel = {
        pix: 'Pix',
        cartao: 'Cartão de Crédito',
        boleto: 'Boleto Bancário',
        saldo: 'Saldo em Conta',
    };
    const metodoPagamentoLabel = metodoLabel[metodoPagamento] || 'Não selecionado';

    const total = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
    const totalFormatado = total.toFixed(2).replace('.', ',');

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
                    <Text style={styles.sectionTitle}>{nomeComprador}</Text>
                    <Text style={styles.sectionSubtitle}>{emailComprador}</Text>
                </View>
                </View>

                <View style={styles.divider} />

                
                <View style={styles.section}>
                <Entypo name="location-pin" size={22} color="#000" style={{ marginRight: 10 }} />
                <View>
                    <Text style={styles.sectionTitle}>{endereco ? `${endereco.rua}${endereco.numero ? `, ${endereco.numero}` : ''}` : 'Endereço não informado'}</Text>
                    <Text style={styles.sectionSubtitle}>Enviar no meu endereço</Text>
                    {endereco && (
                        <Text style={styles.sectionSubtitle}>{endereco.bairro} - {endereco.cidade}/{endereco.estado}</Text>
                    )}
                </View>
                </View>

                <View style={styles.divider} />

                
                {carrinho.length > 0 ? carrinho.map((item) => {
                    let imagemProduto = require('../../assets/images/LogoSemFundo.png');
                    if (item.imagem_url && item.imagem_url.length > 4) {
                        imagemProduto = { uri: `http://${ipComputador}:3000/images/${item.imagem_url}` };
                    }
                    return (
                        <View key={item.id_produto} style={styles.produtoBox}>
                            <Image source={imagemProduto} style={styles.produtoImagem} />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.produtoEntrega}>
                                    Chegará no seu endereço entre terça-feira e sexta-feira
                                </Text>
                                <Text style={styles.produtoDescricao}>{item.nome} x{item.quantidade}</Text>
                            </View>
                        </View>
                    );
                }) : (
                    <View style={styles.produtoBox}>
                        <Image
                            source={require('../../assets/images/LogoSemFundo.png')}
                            style={styles.produtoImagem}
                        />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.produtoEntrega}>
                                Chegará no seu endereço entre terça-feira e sexta-feira
                            </Text>
                            <Text style={styles.produtoDescricao}>Nenhum item</Text>
                        </View>
                    </View>
                )}

                <View style={styles.divider} />

                
                <View style={styles.sectionPagamento}>
                <Feather name="credit-card" size={20} color="#000" />

                <View style={{ marginLeft: 12 }}>
                    <Text style={styles.sectionTitle}>{metodoPagamentoLabel}</Text>
                    <Text style={styles.pagamentoPreco}>R$ {totalFormatado}</Text>

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

                {carrinho.map((item) => {
                    const precoItem = (item.preco * item.quantidade).toFixed(2).replace('.', ',');
                    return (
                        <Text key={item.id_produto} style={styles.resumoLine}>{item.nome} ({item.quantidade}x): R$ {precoItem}</Text>
                    );
                })}
                <Text style={styles.resumoLine}>Frete:   GRÁTIS</Text>

                <Text style={[styles.resumoLine, { marginTop: 12 }]}>
                    Total: <Text style={{ fontWeight: "bold" }}>R$ {totalFormatado}</Text>
                </Text>
                </View>
            </View>

            
            <View style={styles.btnRow}>
                <TouchableOpacity style={styles.btnVoltar} onPress={() => (navigation.navigate("CheckoutPagamento", { endereco, usuario }))}>
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