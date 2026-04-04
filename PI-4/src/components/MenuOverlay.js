import { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

export default function MenuOverlay({ onClose }) {
  const navigation = useNavigation();

  const goToHome = () => {
    navigation.navigate('Home');
    onClose();                    
  };
  return (
    
    <View style={styles.overlay}>
      <View style={styles.container}>

        {/* LOGO + TÍTULO */}
        <View style={styles.header}>
          <TouchableOpacity onPress={goToHome}>
            <Image
              source={require("../../assets/images/LogoSemFundo.png")}
              style={styles.logo}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={goToHome}>
            <Text style={styles.title}>Jardim Encantado</Text>
          </TouchableOpacity>
        </View>

        {/* MENU ITEMS */}
        <View style={styles.menuList}>
          <TouchableOpacity onPress={goToHome}>
            <Text style={styles.menuItem}>Inicio</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            navigation.navigate('Buques')
            onClose();
          }}>
            <Text style={styles.menuItem}>Buquês</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            navigation.navigate('Conjuntos')
            onClose();
          }}>
            <Text style={styles.menuItem}>Conjuntos</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            navigation.navigate('Mudas')
            onClose();
          }}>
            <Text style={styles.menuItem}>Mudas</Text>
          </TouchableOpacity>
          <Text style={styles.menuItem}>Personalizados</Text>
        </View>

        {/* ÍCONES INFERIORES */}
        <View style={styles.bottomIcons}>

          {/* Ícone voltar */}
          <TouchableOpacity onPress={onClose} style={styles.iconButton}>
            <MaterialIcons name="arrow-back" size={28} color="#FFF" />
          </TouchableOpacity>

          {/* Ícone perfil */}
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="person-circle-outline" size={35} color="#FFF" />
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },

  container: {
    width: "85%",
    height: "100%",
    backgroundColor: "#101615",
    borderRadius: 12,
    paddingHorizontal: 25,
    paddingTop: 40,
    paddingBottom: 20,
    justifyContent: "space-between",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  logo: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },

  title: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
  },

  menuList: {
    marginTop: 40,
    gap: 32,
    flex: 1,
    justifyContent: 'flex-start'
  },

  menuItem: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "500",
  },

  bottomIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },

  iconButton: {
    padding: 10,
  },
});