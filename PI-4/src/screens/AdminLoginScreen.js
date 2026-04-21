import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { loginAdmin } from '../services/api';
import MenuOverlay from '../components/MenuOverlay';

export default function AdminLoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  const handleAdminLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Atenção', 'Preencha e-mail e senha.');
      return;
    }
    try {
      setLoading(true);
      await loginAdmin(email, senha);
      navigation.replace('AdminProdutos');
    } catch (error) {
      Alert.alert('Acesso Negado', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={require('../../assets/images/LogoSemFundo.png')} style={styles.logo} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.logoText}>Jardim Encantado</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Ionicons name="menu" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.titleRow}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
              <Feather name="arrow-left" size={24} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.title}>Painel Administrativo</Text>
          </View>
          <Text style={styles.subtitle}>Faça login para acessar o gerenciamento</Text>

          <View style={styles.card}>
            <View style={styles.iconCircle}>
              <Feather name="shield" size={36} color="#00ff00" />
            </View>

            <Text style={styles.cardTitle}>Acesso Restrito</Text>
            <Text style={styles.cardSubtitle}>Apenas administradores autorizados</Text>

            <View style={styles.formContainer}>
              <Text style={styles.label}>E-mail</Text>
              <TextInput
                style={styles.input}
                placeholder="admin@jardimencantado.com"
                placeholderTextColor="#A0AAB2"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />

              <Text style={styles.label}>Senha</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite sua senha"
                placeholderTextColor="#A0AAB2"
                secureTextEntry
                value={senha}
                onChangeText={setSenha}
              />

              <TouchableOpacity style={styles.loginButton} onPress={handleAdminLogin} disabled={loading} activeOpacity={0.8}>
                {loading ? (
                  <ActivityIndicator color="#1B1F1D" />
                ) : (
                  <>
                    <Feather name="log-in" size={20} color="#1B1F1D" />
                    <Text style={styles.loginButtonText}>Entrar no Painel</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {menuVisible && <MenuOverlay onClose={() => setMenuVisible(false)} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#141B18' },

  header: {
    backgroundColor: '#1B1F1D', paddingVertical: 18, paddingHorizontal: 20,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    elevation: 6, shadowColor: '#000', shadowOpacity: 0.2, shadowOffset: { width: 0, height: 2 }, shadowRadius: 3,
  },
  logoText: { color: '#FFFFFF', fontSize: 22, fontWeight: '600', letterSpacing: 0.5 },
  logo: { width: 40, height: 40 },

  scrollContent: { paddingBottom: 40 },

  titleRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginTop: 20 },
  backBtn: { padding: 8, marginRight: 8 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#FFF' },
  subtitle: { fontSize: 14, color: '#A0AAB2', paddingHorizontal: 20, marginTop: 4, marginBottom: 25, marginLeft: 45 },

  card: {
    backgroundColor: '#1A2421', marginHorizontal: 20, borderRadius: 20, padding: 25, alignItems: 'center',
  },

  iconCircle: {
    backgroundColor: '#141B18', width: 80, height: 80, borderRadius: 40,
    justifyContent: 'center', alignItems: 'center', marginBottom: 20,
    borderWidth: 2, borderColor: '#00ff00',
  },

  cardTitle: { fontSize: 22, fontWeight: 'bold', color: '#FFF', marginBottom: 6 },
  cardSubtitle: { fontSize: 14, color: '#A0AAB2', marginBottom: 25 },

  formContainer: { width: '100%' },

  label: { color: '#FFF', fontSize: 14, fontWeight: 'bold', marginBottom: 8 },
  input: { backgroundColor: '#2C3A35', borderRadius: 12, padding: 15, color: '#FFF', marginBottom: 15, fontSize: 15 },

  loginButton: {
    backgroundColor: '#00ff00', paddingVertical: 16, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center', marginTop: 10,
    flexDirection: 'row', gap: 10,
    shadowColor: '#00ff00', shadowOpacity: 0.3, shadowRadius: 6, elevation: 4,
  },
  loginButtonText: { color: '#1B1F1D', fontSize: 17, fontWeight: 'bold' },
});
