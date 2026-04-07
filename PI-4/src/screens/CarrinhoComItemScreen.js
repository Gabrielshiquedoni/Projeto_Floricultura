import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Rodape from '../components/Rodape';
import MenuOverlay from '../components/MenuOverlay';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CarrinhoComItem() {
  const [quantity, setQuantity] = useState(1);
  const [menuVisible, setMenuVisible] = useState(false);

  const navigation = useNavigation();
  
  const goToHome = () => {
    navigation.navigate('Home'); 
  };

  return (

    <SafeAreaView style={styles.container}>
        <ScrollView>
            {/* HEADER */}
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

            {/* CARD DO PRODUTO */}
            <View style={styles.productCard}>
                <Image 
                source={require('../../assets/images/rosa7.jpeg')} 
                style={styles.productImage}
                />

                <View style={styles.productInfo}>
                <Text style={styles.productTitle}>Buquê de Rosas</Text>
                <Text style={styles.productPrice}>R$ 199,99</Text>

                {/* CONTADOR */}
                <View style={styles.counterContainer}>
                    <TouchableOpacity 
                    style={styles.counterBtn}
                    onPress={() => setQuantity(q => Math.max(1, q - 1))}
                    >
                    <Text style={styles.counterText}>-</Text>
                    </TouchableOpacity>

                    <Text style={styles.quantity}>{quantity}</Text>

                    <TouchableOpacity 
                    style={styles.counterBtn}
                    onPress={() => setQuantity(q => q + 1)}
                    >
                    <Text style={styles.counterText}>+</Text>
                    </TouchableOpacity>
                </View>

                {/* LIXEIRA */}
                <Feather name="trash" size={22} color="#000" style={{ marginTop: 10 }} />
                </View>
            </View>

            {/* CALCULAR FRETE */}
            <View style={styles.freightBox}>
                <View>
                <Text style={styles.sectionTitle}>Calcule o frete:</Text>
                <View style={styles.freightRow}>
                    <TextInput 
                    placeholder="04820-440"
                    style={styles.freightInput}
                    placeholderTextColor="#ccc"
                    />
                    <TouchableOpacity style={styles.calculateBtn}>
                    <Text style={styles.calculateText}>Calcular</Text>
                    </TouchableOpacity>
                </View>
                </View>

                <View>
                <Text style={styles.sectionTitle}>Subtotal:</Text>
                <Text style={styles.subtotal}>R$ 199,99</Text>
                </View>
            </View>

            {/* OPÇÕES DE FRETE */}
            <View style={styles.shippingOptions}>
                <View style={styles.optionRow}>
                <FontAwesome name="circle-o" size={22} color="#fff" />
                <Text style={styles.optionText}>10 dias úteis</Text>
                <Text style={styles.optionPrice}>Frete Grátis</Text>
                </View>

                <View style={styles.optionRow}>
                <FontAwesome name="circle-o" size={22} color="#fff" />
                <Text style={styles.optionText}>10 dias úteis</Text>
                <Text style={styles.optionPrice}>R$ 16,47 PAC</Text>
                </View>

                <View style={styles.optionRow}>
                <FontAwesome name="circle-o" size={22} color="#fff" />
                <Text style={styles.optionText}>6 dias úteis</Text>
                <Text style={styles.optionPrice}>R$ 19,43 SEDEX</Text>
                </View>
            </View>

            {/* RESUMO */}
            <View style={styles.summaryBox}>
                <Text style={styles.summaryLine}>Desconto:   <Text style={styles.summaryValue}>R$ 43,95</Text></Text>

                <Text style={styles.summaryTotal}>Total:   R$ 199,99</Text>

                <Text style={styles.pixText}>
                via Pix por R$ 189,85 com 5% de desconto{"\n"}
                ou em até 5x de R$ 37,97 sem juros
                </Text>
            </View>

            {/* BOTÕES */}
            <View style={styles.buttonsRow}>
                <TouchableOpacity style={styles.buyMoreBtn} onPress={goToHome}>
                    <Text style={styles.buyMoreText}>Continuar comprando</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.finishBtn} onPress={() => (navigation.navigate('ConfirmarEntrega'))}>
                    <Text style={styles.finishText}>Finalizar compra</Text>
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
    flex: 1,
    backgroundColor: '#141B18', // verde escuro aproximado
  },

  /* HEADER */
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

  /* PRODUTO */
  productCard: {
    backgroundColor: '#fff',
    marginTop: 25,
    borderRadius: 14,
    padding: 20,
    flexDirection: 'row',
    marginHorizontal: 20,
  },

  productImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },

  productInfo: {
    marginLeft: 20,
    flex: 1,
  },

  productTitle: {
    fontSize: 20,
    fontWeight: '600',
  },

  productPrice: {
    fontSize: 20,
    marginTop: 5,
  },

  counterContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },

  counterBtn: {
    borderWidth: 1,
    borderColor: '#000',
    paddingHorizontal: 10,
    paddingVertical: 2,
  },

  counterText: {
    fontSize: 18,
  },

  quantity: {
    marginHorizontal: 12,
    fontSize: 16,
  },

  /* FRETE */
  freightBox: {
    marginTop: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },

  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 6,
  },

  freightRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  freightInput: {
    backgroundColor: '#fff',
    width: 120,
    padding: 8,
    borderRadius: 5,
  },

  calculateBtn: {
    marginLeft: 10,
    backgroundColor: '#546E58',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 5,
  },

  calculateText: {
    color: '#fff',
    fontWeight: '600',
  },

  subtotal: {
    color: '#fff',
    fontSize: 18,
  },

  /* OPÇÕES FRETE */
  shippingOptions: {
    marginTop: 20,
    marginHorizontal: 20,
  },

  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  optionText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 12,
    flex: 1,
  },

  optionPrice: {
    color: '#fff',
    fontSize: 15,
  },

  /* RESUMO */
  summaryBox: {
    marginTop: 20,
    backgroundColor: '#1B1F1D',
    padding: 16,
    borderRadius: 14,
    marginHorizontal: 20,
  },

  summaryLine: {
    color: '#fff',
    fontSize: 16,
  },

  summaryValue: {
    color: '#fff',
    fontWeight: '600',
  },

  summaryTotal: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 10,
  },

  pixText: {
    color: '#ccc',
    marginTop: 6,
    lineHeight: 20,
  },

  /* BOTÕES */
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
    marginHorizontal: 20,
  },

  buyMoreBtn: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 25,
  },

  buyMoreText: {
    color: '#000',
    fontWeight: '600',
  },

  finishBtn: {
    backgroundColor: '#1B3A2F',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 25,
  },

  finishText: {
    color: '#fff',
    fontWeight: '600',
  },
});