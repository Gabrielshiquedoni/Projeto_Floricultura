import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function ProdutoCard({ image, price, onPress }) {
  return (
    // Transformamos a View em TouchableOpacity e passamos a função onPress
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={image}
        style={styles.cardImage}
        resizeMode="cover"
      />
      <Text style={styles.cardPrice}>R$ {price}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
  },
});