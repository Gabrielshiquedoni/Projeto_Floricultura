import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MenuOverlay from '../components/MenuOverlay'; 
import Rodape from '../components/Rodape';

export default function PersonalizadosScreen() {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      
      {/* CABEÇALHO PADRONIZADO E CONECTADO */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={require('../../assets/images/LogoSemFundo.png')} style={styles.logo} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.logoText}>Jardim Encantado</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CarrinhoComItem')}>
          <Ionicons name="cart-outline" size={26} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Ionicons name="menu" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.cartHeaderTitle}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.title}>Personalizados</Text>
        </View>

        <Text style={styles.subtitle}>Crie o arranjo perfeito para alguém especial.</Text>

        <View style={styles.formContainer}>
          <Text style={styles.label}>O que você tem em mente?</Text>
          <TextInput 
            style={styles.textArea} 
            placeholder="Ex: Quero um buquê apenas com rosas azuis e brancas..." 
            placeholderTextColor="#A0AAB2"
            multiline={true}
            numberOfLines={4}
          />

          <Text style={styles.label}>Para qual ocasião?</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Ex: Aniversário de Casamento" 
            placeholderTextColor="#A0AAB2"
          />

          <TouchableOpacity style={styles.submitButton} onPress={() => alert("Em breve: Integração de envio de pedidos personalizados!")}>
            <Text style={styles.submitButtonText}>Solicitar Orçamento</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Rodape />
      
      {/* RENDERIZA O MENU */}
      {menuVisible && <MenuOverlay onClose={() => setMenuVisible(false)} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#141B18' },
  header: { backgroundColor: '#1B1F1D', paddingVertical: 18, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 6 },
  logoText: { color: '#FFFFFF', fontSize: 20, fontWeight: '600' },
  logo: { width: 40, height: 40 },
  scrollContent: { padding: 20, paddingBottom: 100 },
  cartHeaderTitle: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginTop: 10 },
  backButton: { padding: 8 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#FFF', marginLeft: 10 },
  subtitle: { fontSize: 16, color: '#A0AAB2', marginBottom: 20, marginLeft: 5 },
  formContainer: { backgroundColor: '#1A2421', borderRadius: 12, padding: 20, marginTop: 10 },
  label: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  input: { backgroundColor: '#2C3A35', borderRadius: 8, padding: 15, color: '#FFF', marginBottom: 20, fontSize: 16 },
  textArea: { backgroundColor: '#2C3A35', borderRadius: 8, padding: 15, color: '#FFF', marginBottom: 20, fontSize: 16, height: 120, textAlignVertical: 'top' },
  submitButton: { backgroundColor: '#00ff00', paddingVertical: 18, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  submitButtonText: { color: '#1B1F1D', fontSize: 17, fontWeight: 'bold' },
});