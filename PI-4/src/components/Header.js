import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { useState } from 'react';
import MenuOverlay from '../components/MenuOverlay';

export default function Header(){
    const [menuVisible, setMenuVisible] = useState(false);
    const navigation = useNavigation();

    const goToHome = () => {
        navigation.navigate('Home'); 
    };
    return (
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
            <TouchableOpacity onPress={() => navigation.navigate("Carrinho")}>
            <Ionicons name="cart-outline" size={26} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMenuVisible(true)}>
            <Ionicons name="menu" size={28} color="#fff" />
            </TouchableOpacity>
            
        </View>
                
    );
}

const styles = StyleSheet.create({
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
});