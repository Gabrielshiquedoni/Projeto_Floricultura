import React, { useContext } from 'react'; // <-- O culpado do erro foi resolvido aqui!
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../contexts/AuthContext';

const { width } = Dimensions.get('window');

export default function MenuOverlay({ onClose }) {
  const navigation = useNavigation();
  
  const { usuarioLogado, setUsuarioLogado, openAuthModal } = useContext(AuthContext);

  const navigateTo = (screen) => {
    onClose();
    navigation.navigate(screen);
  };

  const handleLoginLogout = () => {
    onClose();
    if (usuarioLogado) {
      setUsuarioLogado(null);
      alert("Você saiu da conta.");
    } else {
      openAuthModal('login'); 
    }
  };

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.background} onPress={onClose} activeOpacity={1} />
      
      <View style={styles.menuContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Menu</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Feather name="x" size={28} color="#FFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.menuItems}>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Home')}>
            <Feather name="home" size={22} color="#00ff00" />
            <Text style={styles.menuText}>Início</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Buques')}>
            <Ionicons name="flower-outline" size={22} color="#00ff00" />
            <Text style={styles.menuText}>Buquês</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Conjuntos')}>
            <Feather name="grid" size={22} color="#00ff00" />
            <Text style={styles.menuText}>Conjuntos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Mudas')}>
            <Feather name="target" size={22} color="#00ff00" />
            <Text style={styles.menuText}>Mudas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Personalizados')}>
            <Feather name="edit-3" size={22} color="#00ff00" />
            <Text style={styles.menuText}>Personalizados</Text>
          </TouchableOpacity>

          <View style={{ height: 1, backgroundColor: '#2C3A35', marginVertical: 15 }} />

          <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('AdminProdutos')}>
            <Feather name="settings" size={22} color="#00ff00" />
            <Text style={styles.menuText}>Painel Admin</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.loginButton} onPress={handleLoginLogout}>
            <Feather name={usuarioLogado ? "log-out" : "log-in"} size={22} color="#1B1F1D" />
            <Text style={styles.loginText}>
              {usuarioLogado ? "Sair da Conta" : "Fazer Login"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000, flexDirection: 'row', justifyContent: 'flex-end' },
  background: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)' },
  menuContainer: { width: width * 0.75, height: '100%', backgroundColor: '#1A2421', padding: 20, shadowColor: '#000', shadowOffset: { width: -5, height: 0 }, shadowOpacity: 0.5, shadowRadius: 10, elevation: 15 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 40, marginBottom: 30, borderBottomWidth: 1, borderBottomColor: '#2C3A35', paddingBottom: 15 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#FFF' },
  closeButton: { padding: 5 },
  menuItems: { flex: 1 },
  menuItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 25 },
  menuText: { fontSize: 18, color: '#FFF', marginLeft: 15, fontWeight: '500' },
  footer: { borderTopWidth: 1, borderTopColor: '#2C3A35', paddingTop: 20, marginBottom: 20 },
  loginButton: { backgroundColor: '#00ff00', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 15, borderRadius: 12 },
  loginText: { color: '#1B1F1D', fontSize: 16, fontWeight: 'bold', marginLeft: 10 }
});