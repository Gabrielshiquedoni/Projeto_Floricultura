import React, { useContext, useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AuthContext } from '../contexts/AuthContext';

export default function AuthModal() {
  const { modalVisible, closeAuthModal, modalType, setModalType } = useContext(AuthContext);


  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [formCad, setFormCad] = useState({ nome: '', email: '', cpf: '', tel: '', senha: '', confirmarSenha: '' });

  const handleLogin = () => {
    alert(`Tentando logar: ${email}`); 
  };

  const handleCadastro = () => {
    if (formCad.senha !== formCad.confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }
    alert("Pronto para criar usuário!"); 
  };

  if (!modalVisible) return null;

  return (
    <Modal visible={modalVisible} transparent={true} animationType="slide" onRequestClose={closeAuthModal}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.modalOverlay}>
        
        <TouchableOpacity style={styles.touchableClose} onPress={closeAuthModal} activeOpacity={1} />
        
        <View style={styles.modalContent}>
          
          <View style={styles.dragHandle} />
          <TouchableOpacity style={styles.closeButton} onPress={closeAuthModal}>
            <Feather name="x" size={26} color="#A0AAB2" />
          </TouchableOpacity>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
            
            <View style={styles.headerContainer}>
              <Image source={require('../../assets/images/LogoSemFundo.png')} style={styles.logo} />
              <Text style={styles.title}>
                {modalType === 'login' ? 'Bem-vindo(a) de volta!' : 'Criar Conta'}
              </Text>
              <Text style={styles.subtitle}>
                {modalType === 'login' ? 'Acesse sua conta para continuar.' : 'Faça parte do Jardim Encantado.'}
              </Text>
            </View>

            {modalType === 'login' ? (
              <View style={styles.formContainer}>
                <Text style={styles.label}>E-mail</Text>
                <TextInput style={styles.input} placeholder="Digite seu e-mail" placeholderTextColor="#A0AAB2" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />

                <Text style={styles.label}>Senha</Text>
                <TextInput style={styles.input} placeholder="Digite sua senha" placeholderTextColor="#A0AAB2" secureTextEntry value={senha} onChangeText={setSenha} />

                <TouchableOpacity 
                  style={styles.forgotPassword} 
                  onPress={() => alert("Um link de recuperação será enviado para o seu e-mail.")}
                >
                  <Text style={styles.forgotText}>Esqueceu a senha?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton} onPress={handleLogin}>
                  <Text style={styles.actionButtonText}>Entrar</Text>
                </TouchableOpacity>

                <View style={styles.switchContainer}>
                  <Text style={styles.switchText}>Não tem uma conta? </Text>
                  <TouchableOpacity onPress={() => setModalType('cadastro')}>
                    <Text style={styles.switchLink}>Cadastre-se</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={styles.formContainer}>
                <Text style={styles.label}>Nome Completo</Text>
                <TextInput style={styles.input} placeholder="Digite seu nome" placeholderTextColor="#A0AAB2" onChangeText={(text) => setFormCad({...formCad, nome: text})} />

                <Text style={styles.label}>E-mail</Text>
                <TextInput style={styles.input} placeholder="Digite seu e-mail" placeholderTextColor="#A0AAB2" keyboardType="email-address" autoCapitalize="none" onChangeText={(text) => setFormCad({...formCad, email: text})} />

                <View style={styles.row}>
                  <View style={[styles.halfInput, {marginRight: 10}]}>
                    <Text style={styles.label}>CPF</Text>
                    <TextInput style={styles.input} placeholder="000.000.000-00" placeholderTextColor="#A0AAB2" keyboardType="numeric" onChangeText={(text) => setFormCad({...formCad, cpf: text})} />
                  </View>
                  <View style={styles.halfInput}>
                    <Text style={styles.label}>Telefone</Text>
                    <TextInput style={styles.input} placeholder="(00) 00000-0000" placeholderTextColor="#A0AAB2" keyboardType="phone-pad" onChangeText={(text) => setFormCad({...formCad, tel: text})} />
                  </View>
                </View>

                <Text style={styles.label}>Senha</Text>
                <TextInput style={styles.input} placeholder="Crie uma senha forte" placeholderTextColor="#A0AAB2" secureTextEntry onChangeText={(text) => setFormCad({...formCad, senha: text})} />

                <Text style={styles.label}>Confirmar Senha</Text>
                <TextInput style={styles.input} placeholder="Repita a senha" placeholderTextColor="#A0AAB2" secureTextEntry onChangeText={(text) => setFormCad({...formCad, confirmarSenha: text})} />

                <TouchableOpacity style={styles.actionButton} onPress={handleCadastro}>
                  <Text style={styles.actionButtonText}>Cadastrar</Text>
                </TouchableOpacity>

                <View style={styles.switchContainer}>
                  <Text style={styles.switchText}>Já possui uma conta? </Text>
                  <TouchableOpacity onPress={() => setModalType('login')}>
                    <Text style={styles.switchLink}>Faça Login</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'flex-end' },
  touchableClose: { flex: 1 },
  modalContent: { backgroundColor: '#141B18', borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingHorizontal: 25, maxHeight: '90%', minHeight: '50%', shadowColor: "#000", shadowOpacity: 0.5, shadowRadius: 20, elevation: 10 },
  dragHandle: { width: 50, height: 5, backgroundColor: '#2C3A35', borderRadius: 5, alignSelf: 'center', marginTop: 15, marginBottom: 10 },
  closeButton: { position: 'absolute', top: 20, right: 20, zIndex: 10, padding: 5 },
  headerContainer: { alignItems: 'center', marginTop: 10, marginBottom: 25 },
  logo: { width: 70, height: 70, marginBottom: 15 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#FFF', marginBottom: 5 },
  subtitle: { fontSize: 15, color: '#A0AAB2', textAlign: 'center' },
  formContainer: { backgroundColor: '#1A2421', padding: 20, borderRadius: 20 },
  label: { color: '#FFF', fontSize: 14, fontWeight: 'bold', marginBottom: 8 },
  input: { backgroundColor: '#2C3A35', borderRadius: 12, padding: 15, color: '#FFF', marginBottom: 15, fontSize: 15 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  halfInput: { flex: 1 },
  forgotPassword: { alignItems: 'flex-end', marginBottom: 20, marginTop: -5 },
  forgotText: { color: '#00ff00', fontSize: 13, fontWeight: '600' },
  actionButton: { backgroundColor: '#00ff00', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 5, shadowColor: "#00ff00", shadowOpacity: 0.3, shadowRadius: 6, elevation: 4 },
  actionButtonText: { color: '#1B1F1D', fontSize: 17, fontWeight: 'bold' },
  switchContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  switchText: { color: '#A0AAB2', fontSize: 14 },
  switchLink: { color: '#00ff00', fontSize: 14, fontWeight: 'bold' },
});