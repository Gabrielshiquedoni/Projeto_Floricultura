import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Rodape from '../components/Rodape';
import MenuOverlay from '../components/MenuOverlay';
import { SafeAreaView } from 'react-native-safe-area-context';
import { buscarCep } from '../services/api';

export default function ConfirmarEntregaScreen() {
    const [menuVisible, setMenuVisible] = useState(false);
    
    const navigation = useNavigation();
    
    const goToHome = () => {
        navigation.navigate('Home'); 
    };

    // States do endereço
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [buscandoCep, setBuscandoCep] = useState(false);

    // Auto-preenchimento ao digitar 8 dígitos no CEP
    const handleCepChange = async (texto) => {
        const cepLimpo = texto.replace(/\D/g, '');
        
        // Formata o CEP visualmente: 00000-000
        if (cepLimpo.length <= 5) {
            setCep(cepLimpo);
        } else {
            setCep(`${cepLimpo.slice(0, 5)}-${cepLimpo.slice(5, 8)}`);
        }

        // Quando atingir 8 dígitos, busca o CEP
        if (cepLimpo.length === 8) {
            try {
                setBuscandoCep(true);
                const dados = await buscarCep(cepLimpo);
                setRua(dados.rua || '');
                setBairro(dados.bairro || '');
                setCidade(dados.cidade || '');
                setEstado(dados.estado || '');
            } catch (error) {
                Alert.alert('CEP não encontrado', 'Verifique o CEP digitado e tente novamente.');
                setRua('');
                setBairro('');
                setCidade('');
                setEstado('');
            } finally {
                setBuscandoCep(false);
            }
        }
    };

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView>
        
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
                <TouchableOpacity onPress={() => setMenuVisible(true)}>
                    <Ionicons name="menu" size={28} color="#fff" />
                </TouchableOpacity>
            </View>

      
        <View style={styles.box}>

            <Text style={styles.title}>Confirme a forma de entrega</Text>

            {/* Formulário de Endereço com CEP */}
            <Text style={styles.inputLabel}>CEP</Text>
            <View style={styles.cepRow}>
                <TextInput
                    style={[styles.input, { flex: 1 }]}
                    placeholder="00000-000"
                    placeholderTextColor="#999"
                    value={cep}
                    onChangeText={handleCepChange}
                    keyboardType="numeric"
                    maxLength={9}
                />
                {buscandoCep && (
                    <ActivityIndicator size="small" color="#1B3A2F" style={{ marginLeft: 10 }} />
                )}
            </View>

            <Text style={styles.inputLabel}>Rua / Logradouro</Text>
            <TextInput
                style={styles.input}
                placeholder="Preenchido automaticamente"
                placeholderTextColor="#999"
                value={rua}
                onChangeText={setRua}
            />

            <View style={styles.rowInputs}>
                <View style={{ flex: 1, marginRight: 10 }}>
                    <Text style={styles.inputLabel}>Número</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nº"
                        placeholderTextColor="#999"
                        value={numero}
                        onChangeText={setNumero}
                        keyboardType="numeric"
                    />
                </View>
                <View style={{ flex: 2 }}>
                    <Text style={styles.inputLabel}>Bairro</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Preenchido automaticamente"
                        placeholderTextColor="#999"
                        value={bairro}
                        onChangeText={setBairro}
                    />
                </View>
            </View>

            <View style={styles.rowInputs}>
                <View style={{ flex: 2, marginRight: 10 }}>
                    <Text style={styles.inputLabel}>Cidade</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Preenchido automaticamente"
                        placeholderTextColor="#999"
                        value={cidade}
                        onChangeText={setCidade}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.inputLabel}>UF</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="UF"
                        placeholderTextColor="#999"
                        value={estado}
                        onChangeText={setEstado}
                        maxLength={2}
                        autoCapitalize="characters"
                    />
                </View>
            </View>

            <View style={styles.divider} />

            {/* Resumo do endereço preenchido */}
            {rua ? (
                <View style={styles.deliveryRow}>
                    <FontAwesome name="check-circle" size={22} color="#1B3A2F" />
                    <View style={styles.deliveryInfo}>
                        <Text style={styles.deliveryLabel}>Enviar no meu endereço</Text>
                        <Text style={styles.address}>
                            {rua}{numero ? `, ${numero}` : ''} - {bairro}{"\n"}
                            {cidade} - {estado}, {cep}
                        </Text>
                    </View>
                    <Text style={styles.freeText}>Grátis</Text>
                </View>
            ) : (
                <View style={styles.deliveryRow}>
                    <FontAwesome name="circle-o" size={22} color="#999" />
                    <View style={styles.deliveryInfo}>
                        <Text style={[styles.deliveryLabel, { color: '#999' }]}>Preencha o CEP acima</Text>
                    </View>
                </View>
            )}
        </View>

       
        <View style={styles.bottomBox}>

            <View>
            <Text style={styles.bottomTitle}>Sua compra chegará:</Text>
            <Text style={styles.bottomSubtitle}>Entre terça-feira e sexta-feira</Text>
            </View>

            <View>
            <Text style={styles.bottomTitle}>Resumo da compra:</Text>
            <Text style={styles.orderLine}>Produto:  R$ 199,99</Text>
            <Text style={styles.orderLine}>Frete:  GRÁTIS</Text>
            <Text style={styles.orderTotal}>Total: R$ 199,99</Text>
            </View>

        </View>

        
        <View style={styles.buttonsRow}>
            <TouchableOpacity style={styles.backBtn} onPress={() => (navigation.navigate('CarrinhoComItem'))}>
            <Text style={styles.backText}>Voltar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.nextBtn, !rua && styles.nextBtnDisabled]} 
                onPress={() => (navigation.navigate('CheckoutPagamento'))}
                disabled={!rua}
            >
            <Text style={styles.nextText}>Continuar</Text>
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
  container: {
    flex: 1,
    backgroundColor: "#141B18",
  },

  
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

  
  box: {
    backgroundColor: "#fff",
    marginTop: 30,
    padding: 20,
    borderRadius: 16,
    marginHorizontal: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 20,
  },

  // Inputs do endereço
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },

  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    color: '#000',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },

  cepRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rowInputs: {
    flexDirection: 'row',
  },

  deliveryRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  deliveryInfo: {
    marginLeft: 15,
    flex: 1,
  },

  deliveryLabel: {
    fontSize: 16,
    fontWeight: "600",
  },

  address: {
    marginTop: 4,
    fontSize: 14,
  },

  addressType: {
    marginTop: 4,
    fontSize: 14,
  },

  freeText: {
    fontWeight: "700",
    fontSize: 16,
  },

  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 20,
  },

  changeAddress: {
    fontSize: 15,
    fontWeight: "600",
  },

 
  bottomBox: {
    backgroundColor: "#1B1F1D",
    padding: 20,
    marginTop: 25,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },

  bottomTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },

  bottomSubtitle: {
    color: "#fff",
    marginTop: 4,
    width: 100
  },

  orderLine: {
    color: "#fff",
    marginTop: 3,
  },

  orderTotal: {
    color: "#fff",
    fontWeight: "700",
    marginTop: 5,
  },

  
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    paddingHorizontal: 20,
  },

  backBtn: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },

  backText: {
    fontWeight: "600",
  },

  nextBtn: {
    backgroundColor: "#1B3A2F",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },

  nextBtnDisabled: {
    backgroundColor: "#2C3A35",
    opacity: 0.5,
  },

  nextText: {
    color: "#fff",
    fontWeight: "600",
  },
});