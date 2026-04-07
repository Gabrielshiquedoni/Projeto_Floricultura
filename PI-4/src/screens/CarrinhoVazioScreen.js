import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Rodape from '../components/Rodape';
import MenuOverlay from '../components/MenuOverlay';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CarrinhoVazio() {
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

      {/* CARD CENTRAL */}
      <View style={styles.card}>
        <Text style={styles.cardText}>Não existem produtos no carrinho</Text>

        <TouchableOpacity style={styles.btn} onPress={() => (navigation.navigate('Home'))}>
          <Text style={styles.btnText}>Ir às compras</Text>
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
    backgroundColor: "#141B18",
  },

  /* ---------- HEADER ---------- */
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

  /* ---------- CARD CENTRAL ---------- */
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 25,
    marginTop: 40,
    paddingVertical: 150,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: "center",
  },

  cardText: {
    fontSize: 18,
    color: "#000",
    textAlign: "center",
    marginBottom: 25,
  },

  btn: {
    backgroundColor: "#1B3A2F",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 30,
  },

  btnText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
});