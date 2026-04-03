import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function ProdutoCard({ image, price }) {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />

      <Text style={styles.price}>R$ {price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 150,
    backgroundColor: "#E5E5E5",
    borderRadius: 18,
    padding: 12,
    marginRight: 14,
    alignItems: "center",
  },

  image: {
    width: "100%",
    height: 120,
    borderRadius: 14,
  },

  price: {
    marginTop: 12,
    fontWeight: "bold",
    fontSize: 16,
  }
});