import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Rodape from '../components/Rodape';
import MenuOverlay from '../components/MenuOverlay';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, MaterialIcons, Entypo } from "@expo/vector-icons";

export default function PagamentoScreen() {
  const codigoPix = "00020126580014BR.GOV.BCB.PIX0136chavepixfalsa-1234567890@teste.com520400005303986540510.005802BR5913NOME DE TESTE6009SAO PAULO62070503***6304ABCD";

  const copiar = () => {
    alert("Código copiado!");
  };

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
          <View style={styles.iconMoney}>
            <Feather name="dollar-sign" size={24} color="#000" />
          </View>

          <Text style={styles.title}>Falta pouco!</Text>
          <Text style={styles.subtitle}>Pague R$ 199,99 via Pix para concluir sua compra</Text>
        </View>

        
        <View style={styles.whiteBox}>
          <Text style={styles.whiteTitle}>Escaneie um código QR para pagar</Text>

          <Text style={styles.step}>1. Acesse seu Internet Banking ou app de pagamentos.</Text>
          <Text style={styles.step}>2. Escolha pagar via Pix.</Text>
          <Text style={styles.step}>3. Escaneie o seguinte código:</Text>

          
          <View style={styles.qrContainer}>
            <Image
              source={{ uri: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=PagamentoPix" }}
              style={{ width: 130, height: 130 }}
            />
          </View>

          <View style={styles.instantRow}>
            <Feather name="clock" size={18} color="#000" />
            <Text style={styles.instantText}>Pague e será creditado na hora!</Text>
          </View>
        </View>

        
        <View style={styles.copyBox}>
          <Text style={styles.copyText}>{codigoPix}</Text>
        </View>

        
        <View style={styles.buttonsRow}>
          <TouchableOpacity style={styles.btn} onPress={copiar}>
            <Text style={styles.btnText}>Copiar código</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={() => (navigation.navigate("Home"))}>
            <Text style={styles.btnText}>Ir para a tela inicial</Text>
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
  container: { flex: 1, backgroundColor: "#141B18" },

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
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: "#1B1F1D",
    padding: 30,
    borderRadius: 14,
    alignItems: "center",
  },

  iconMoney: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 30,
    marginBottom: 10,
  },

  title: { color: "#fff", fontSize: 22, fontWeight: "700", marginTop: 10 },
  subtitle: { color: "#fff", fontSize: 14, textAlign: "center", marginTop: 6 },

  whiteBox: {
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 25,
    marginHorizontal: 20,
    borderRadius: 12,
  },

  whiteTitle: { fontSize: 18, fontWeight: "600", marginBottom: 15 },

  step: { fontSize: 14, marginBottom: 6 },

  qrContainer: { alignItems: "center", marginVertical: 20 },

  instantRow: { flexDirection: "row", alignItems: "center" },
  instantText: { marginLeft: 6, fontSize: 14 },

  copyBox: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 14,
    padding: 20,
  },

  copyText: { fontSize: 12, color: "#000" },

  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: -10,
  },

  btn: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 12,
    marginHorizontal: 6,
    borderRadius: 30,
    alignItems: "center",
  },

  btnText: { fontSize: 14, fontWeight: "600", color: "#1B3A2F" },
});