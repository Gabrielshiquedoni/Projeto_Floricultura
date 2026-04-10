import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Rodape from '../components/Rodape';
import MenuOverlay from '../components/MenuOverlay';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CheckoutPagamento() {
    const [selected, setSelected] = useState(null);
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

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Escolha como Pagar</Text>

                    <TouchableOpacity style={styles.option} onPress={() => setSelected("pix")}>
                    <View style={styles.row}>
                        <View style={styles.radioOuter}>
                        {selected === "pix" && <View style={styles.radioInner} />}
                        </View>

                        <View>
                        <Text style={styles.optionTitle}>Pix</Text>
                        <Text style={styles.optionSubtitle}>Aprovação imediata</Text>
                        </View>
                    </View>
                    </TouchableOpacity>

                    <View style={styles.divider} />

                    <TouchableOpacity style={styles.option} onPress={() => setSelected("cartao")}>
                    <View style={styles.row}>
                        <View style={styles.radioOuter}>
                        {selected === "cartao" && <View style={styles.radioInner} />}
                        </View>

                        <View>
                        <Text style={styles.optionTitle}>Cartão</Text>
                        <Text style={styles.optionSubtitle}>Novo cartão de crédito</Text>
                        </View>
                    </View>
                    </TouchableOpacity>

                    <View style={styles.divider} />

                    <TouchableOpacity style={styles.option} onPress={() => setSelected("boleto")}>
                    <View style={styles.row}>
                        <View style={styles.radioOuter}>
                        {selected === "boleto" && <View style={styles.radioInner} />}
                        </View>

                        <View>
                        <Text style={styles.optionTitle}>Boleto</Text>
                        <Text style={styles.optionSubtitle}>Aprovação em 1 a 2 dias úteis</Text>
                        </View>
                    </View>
                    </TouchableOpacity>

                    <View style={styles.divider} />

                    <TouchableOpacity style={styles.option} onPress={() => setSelected("saldo")}>
                    <View style={styles.row}>
                        <View style={styles.radioOuter}>
                        {selected === "saldo" && <View style={styles.radioInner} />}
                        </View>

                        <View>
                        <Text style={styles.optionTitle}>Saldo em conta</Text>
                        <Text style={styles.optionSubtitle}>Saldo: R$0,09</Text>
                        </View>
                    </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.infoSection}>
                    <View>
                    <Text style={styles.infoTitle}>Sua compra chegará:</Text>
                    <Text style={styles.infoSubtitle}>Entre terça-feira e sexta-feira</Text>
                    </View>

                    <View>
                    <Text style={styles.infoTitle}>Resumo da compra:</Text>
                    <Text style={styles.infoSubtitle}>Produto: R$ 199,99</Text>
                    <Text style={styles.infoSubtitle}>Frete:  GRÁTIS</Text>
                    <Text style={styles.infoSubtitle}>Total: R$ 199,99</Text>
                    </View>
                </View>

                <View style={styles.btnRow}>
                    <TouchableOpacity style={styles.btnVoltar} onPress={() => navigation.navigate("ConfirmarEntrega")}>
                        <Text style={styles.btnVoltarText}>Voltar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnContinuar} onPress={() => navigation.navigate("Revisao")}>
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

  card: {
    backgroundColor: "#FFFFFF",
    margin: 20,
    borderRadius: 16,
    padding: 15,
  },

  cardTitle: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },

  option: {
    paddingVertical: 15,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  optionTitle: {
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
  },

  optionSubtitle: {
    fontSize: 13,
    color: "#555",
  },

  divider: {
    height: 1,
    backgroundColor: "#ccc",
    width: "100%",
  },

  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#000",
  },

  infoSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: "#1B1F1D",
    padding: 15,
    borderRadius: 12,
  },

  infoTitle: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "600",
  },

  infoSubtitle: {
    color: "#ddd",
    marginTop: 4,
    width: 120,
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