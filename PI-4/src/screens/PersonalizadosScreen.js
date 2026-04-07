import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Rodape from '../components/Rodape';
import MenuOverlay from '../components/MenuOverlay';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from "@expo/vector-icons";

export default function Personalizados() {

  const Checkbox = ({ checked, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.checkbox}>
      {checked && <Feather name="check" size={16} color="#fff" />}
    </TouchableOpacity>
  );

  	const [menuVisible, setMenuVisible] = useState(false);
  
	const navigation = useNavigation();

	const goToHome = () => {
		navigation.navigate('Home'); 
	};

	const AdicionarCarrinho = () => {
    alert("Item adicionado com sucesso no carrinho");
	navigation.navigate('Home'); 
  };

  return (
    <SafeAreaView style={styles.container}>
		<ScrollView>

			{/* Header */}
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
				<TouchableOpacity onPress={() => navigation.navigate("CarrinhoVazio")}>
				<Ionicons name="cart-outline" size={26} color="#fff" />
				</TouchableOpacity>
				<TouchableOpacity onPress={() => setMenuVisible(true)}>
				<Ionicons name="menu" size={28} color="#fff" />
				</TouchableOpacity>
			</View>

			{/* CARD PRINCIPAL */}
			<View style={styles.card}>
				
				<Text style={styles.title}>Bem vindo a aba de personalizados!</Text>

				<Text style={styles.subtitle}>
				Nessa aba, você nos fala o que deseja e nós atendemos seu pedido!
				Basta preencher o formulário abaixo com suas preferências. Escolha as
				flores, cores e o tamanho do seu buquê, além de opções de presentes
				como caixas, ursos e chocolates!
				</Text>

				{/* ---------------- COLUNAS ---------------- */}
				<View style={styles.columnsContainer}>
				
				{/* COLUNA 1 */}
				<View style={styles.column}>
					
					{/* FLORES */}
					<Text style={styles.sectionTitle}>Escolha as flores:</Text>

					{["Rosa", "Tulipa", "Orquídea", "Girassol", "Jasmin"].map((item, index) => (
					<View key={index} style={styles.optionRow}>
						<Checkbox />
						<Text style={styles.optionLabel}>{item}</Text>
					</View>
					))}

					{/* TAMANHO */}
					<Text style={[styles.sectionTitle, { marginTop: 20 }]}>
					Escolha o tamanho do buquê:
					</Text>

					{["Pequeno", "Médio", "Grande"].map((item, index) => (
					<View key={index} style={styles.optionRow}>
						<Checkbox />
						<Text style={styles.optionLabel}>{item}</Text>
					</View>
					))}

				</View>

				{/* COLUNA 2 */}
				<View style={styles.column}>
					
					{/* CORES */}
					<Text style={styles.sectionTitle}>Escolha as cores das flores:</Text>

					{["Rosa", "Branca", "Amarela", "Laranja", "Lilás", "Roxa"].map((item, index) => (
					<View key={index} style={styles.optionRow}>
						<Checkbox />
						<Text style={styles.optionLabel}>{item}</Text>
					</View>
					))}

					{/* PRESENTE */}
					<Text style={[styles.sectionTitle, { marginTop: 20 }]}>
					Escolha um presente para acompanhar o buquê:
					</Text>

					{["Caixa para buquê", "Urso de pelúcia", "Chocolate"].map((item, index) => (
					<View key={index} style={styles.optionRow}>
						<Checkbox />
						<Text style={styles.optionLabel}>{item}</Text>
					</View>
					))}

				</View>

				</View>

				{/* BOTÃO */}
				<TouchableOpacity style={styles.btn} onPress={AdicionarCarrinho}>
				<Text style={styles.btnText}>Adicionar ao carrinho</Text>
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
  container: { backgroundColor: "#141B18" },

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
    backgroundColor: "#141B18",
    margin: 20,
    padding: 20,
    borderRadius: 20,
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "center",
  },

  subtitle: {
    color: "#ddd",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 25,
  },

  columnsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  column: {
    width: "48%",
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },

  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#fff",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  optionLabel: { color: "#fff", fontSize: 14 },

  btn: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 30,
  },

  btnText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#143024",
  },
});