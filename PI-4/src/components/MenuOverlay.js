import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

export default function MenuOverlay({ onClose }) {
  return (
    <View style={styles.overlay}>
      <View style={styles.container}>

        {/* LOGO + TÍTULO */}
        <View style={styles.header}>
          <Image
            source={require("../../assets/images/LogoSemFundo.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>Jardim Encantado</Text>
        </View>

        {/* MENU ITEMS */}
        <View style={styles.menuList}>
          <Text style={styles.menuItem}>Inicio</Text>
          <Text style={styles.menuItem}>Buquês</Text>
          <Text style={styles.menuItem}>Conjuntos</Text>
          <Text style={styles.menuItem}>Mudas</Text>
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
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    width: "85%",
    height: "95%",
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