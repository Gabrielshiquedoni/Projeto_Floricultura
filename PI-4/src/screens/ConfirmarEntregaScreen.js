import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Rodape from '../components/Rodape';
import MenuOverlay from '../components/MenuOverlay';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ConfirmarEntregaScreen() {
    const [menuVisible, setMenuVisible] = useState(false);
    
    const navigation = useNavigation();
    
    const goToHome = () => {
        navigation.navigate('Home'); 
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

            
            <View style={styles.deliveryRow}>
            <FontAwesome name="circle-o" size={22} color="#000" />
            
            <View style={styles.deliveryInfo}>
                <Text style={styles.deliveryLabel}>Enviar no meu endereço</Text>
                <Text style={styles.address}>
                R. José Galdino da Silva, 548-764 - Interlagos,{"\n"}
                São Paulo - SP, 04792-000
                </Text>
                <Text style={styles.addressType}>Residencial</Text>
            </View>

            <Text style={styles.freeText}>Grátis</Text>
            </View>

           
            <View style={styles.divider} />

            
            <TouchableOpacity>
            <Text style={styles.changeAddress}>Alterar ou escolher outro endereço</Text>
            </TouchableOpacity>
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

            <TouchableOpacity style={styles.nextBtn} onPress={() => (navigation.navigate('CheckoutPagamento'))}>
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

  nextText: {
    color: "#fff",
    fontWeight: "600",
  },
});