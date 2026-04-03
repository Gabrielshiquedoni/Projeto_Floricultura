import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function Rodape() {
  return (
    <View style={styles.footer}>
        <View style={styles.footerColumn}>
        <Text style={styles.footerTitle}>Quem somos</Text>
        <Text style={styles.footerItem}>Nossa História</Text>
        <Text style={styles.footerItem}>Missão e compromisso</Text>
        <Text style={styles.footerItem}>Sustentabilidade</Text>
        </View>

        <View style={styles.footerColumn}>
        <Text style={styles.footerTitle}>Ajuda e suporte</Text>
        <Text style={styles.footerItem}>Fale Conosco</Text>
        <Text style={styles.footerItem}>Trocas e Garantia</Text>
        <Text style={styles.footerItem}>Perguntas Frequentes (FAQ)</Text>
        </View>

        <View style={styles.footerColumn}>
        <Text style={styles.footerTitle}>Redes Sociais</Text>
        <View style={styles.socialRow}>
            <Ionicons name="logo-facebook" size={18} color="#fff" />
            <Text style={styles.footerItem}>Facebook</Text>
        </View>
        <View style={styles.socialRow}>
            <Ionicons name="logo-instagram" size={18} color="#fff" />
            <Text style={styles.footerItem}>Instagram</Text>
        </View>
        <View style={styles.socialRow}>
            <Ionicons name="logo-tiktok" size={18} color="#fff" />
            <Text style={styles.footerItem}>TikTok</Text>
        </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    footer: {
        backgroundColor: "#1B1F1D",
        paddingVertical: 35,
        paddingHorizontal: 25,
        marginTop: 40,
        flexDirection: "row",
        justifyContent: "space-between",
    },

    footerColumn: {
        width: "33%",
    },

    footerTitle: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 12,
    },

    footerItem: {
        color: "#E5E5E5",
        fontSize: 13.5,
        marginBottom: 8,
        lineHeight: 20,
    },

    socialRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
});