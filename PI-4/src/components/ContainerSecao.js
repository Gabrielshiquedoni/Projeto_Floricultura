import React from "react";
import { View, StyleSheet } from "react-native";

export default function ContainerSecao({ children }) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2A2F2D",
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 22,
    marginHorizontal: 14,
    marginTop: 22,
  },
});