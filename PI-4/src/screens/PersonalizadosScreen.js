import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from "@expo/vector-icons";

// Componentes da Infraestrutura
import MenuOverlay from '../components/MenuOverlay';
import { AuthContext } from '../contexts/AuthContext';

export default function PersonalizadosScreen() {
  const navigation = useNavigation();
  
  // NUVEM E ESTADOS
  const { openAuthModal } = useContext(AuthContext);
  const [menuVisible, setMenuVisible] = useState(false);
  
  // Estado para fazer os Checkboxes funcionarem de verdade
  const [selecoes, setSelecoes] = useState([]);

  const toggleSelecao = (item) => {
    if (selecoes.includes(item)) {
      setSelecoes(selecoes.filter(i => i !== item)); // Desmarca
    } else {
      setSelecoes([...selecoes, item]); // Marca
    }
  };

  const goToHome = () => {
    navigation.navigate('Home'); 
  };

  const AdicionarCarrinho = () => {
    alert("Orçamento personalizado adicionado ao carrinho!");
    navigation.navigate('CarrinhoComItem'); 
  };

  return (
    <SafeAreaView style={styles.container}>
      
      {/* CABEÇALHO PADRONIZADO E CONECTADO */}
      <View style={styles.header}>
        {/* ESQUERDA: Logo + Usuário */}
        <View style={styles.headerSide}>
          <TouchableOpacity onPress={goToHome}>
            <Image source={require('../../assets/images/LogoSemFundo.png')} style={styles.logo} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openAuthModal('login')} style={{ marginLeft: 15 }}>
            <Feather name="user" size={24} color="#00ff00" />
          </TouchableOpacity>
        </View>

        {/* CENTRO: Título */}
        <TouchableOpacity onPress={goToHome}>
          <Text style={styles.logoText}>Jardim Encantado</Text>
        </TouchableOpacity>

        {/* DIREITA: Carrinho + Menu */}
        <View style={[styles.headerSide, { justifyContent: 'flex-end' }]}>
          <TouchableOpacity onPress={() => navigation.navigate('CarrinhoComItem')} style={{ marginRight: 15 }}>
            <Ionicons name="cart-outline" size={26} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setMenuVisible(true)}>
            <Ionicons name="menu" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* CARD PRINCIPAL (Design Original Mantido) */}
        <View style={styles.card}>
          
          <Text style={styles.title}>Bem vindo à aba de personalizados!</Text>

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
              {["Rosas", "Tulipas", "Orquídeas", "Girassóis", "Jasmins"].map((item, index) => (
                <TouchableOpacity key={`flor-${index}`} style={styles.optionRow} onPress={() => toggleSelecao(item)}>
                  <View style={styles.checkbox}>
                    {selecoes.includes(item) && <Feather name="check" size={16} color="#00ff00" />}
                  </View>
                  <Text style={styles.optionLabel}>{item}</Text>
                </TouchableOpacity>
              ))}

              {/* TAMANHO */}
              <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
                Tamanho do buquê:
              </Text>
              {["Pequeno", "Médio", "Grande"].map((item, index) => (
                <TouchableOpacity key={`tam-${index}`} style={styles.optionRow} onPress={() => toggleSelecao(item)}>
                  <View style={styles.checkbox}>
                    {selecoes.includes(item) && <Feather name="check" size={16} color="#00ff00" />}
                  </View>
                  <Text style={styles.optionLabel}>{item}</Text>
                </TouchableOpacity>
              ))}

            </View>

            {/* COLUNA 2 */}
            <View style={styles.column}>
              
              {/* CORES */}
              <Text style={styles.sectionTitle}>Cores das flores:</Text>
              {["Rosa", "Branca", "Amarela", "Laranja", "Lilás", "Roxa"].map((item, index) => (
                <TouchableOpacity key={`cor-${index}`} style={styles.optionRow} onPress={() => toggleSelecao(item)}>
                  <View style={styles.checkbox}>
                    {selecoes.includes(item) && <Feather name="check" size={16} color="#00ff00" />}
                  </View>
                  <Text style={styles.optionLabel}>{item}</Text>
                </TouchableOpacity>
              ))}

              {/* PRESENTE */}
              <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
                Acompanhamento:
              </Text>
              {["Caixa para buquê", "Urso de pelúcia", "Chocolate"].map((item, index) => (
                <TouchableOpacity key={`pres-${index}`} style={styles.optionRow} onPress={() => toggleSelecao(item)}>
                  <View style={styles.checkbox}>
                    {selecoes.includes(item) && <Feather name="check" size={16} color="#00ff00" />}
                  </View>
                  <Text style={styles.optionLabel}>{item}</Text>
                </TouchableOpacity>
              ))}

            </View>

          </View>

          {/* BOTÃO (Ajustei a cor para manter a identidade visual do app) */}
          <TouchableOpacity style={styles.btn} onPress={AdicionarCarrinho}>
            <Text style={styles.btnText}>Adicionar ao carrinho</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>

      {/* MENU RENDRIZADO FORA DO SCROLL */}
      {menuVisible && (
        <MenuOverlay onClose={() => setMenuVisible(false)} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#141B18" },

  // Estilos do Cabeçalho Padronizado
  header: { backgroundColor: '#1B1F1D', paddingVertical: 15, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 6 },
  headerSide: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  logoText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  logo: { width: 40, height: 40 },

  // Estilos do Card da sua colega
  card: {
    backgroundColor: "#1A2421", // Escureci levemente para dar destaque contra o fundo
    margin: 20,
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    color: "#A0AAB2",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 25,
    lineHeight: 20,
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
    marginBottom: 12,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#A0AAB2", // Cor neutra quando desmarcado
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  optionLabel: { color: "#fff", fontSize: 14 },
  btn: {
    backgroundColor: "#00ff00", // Verde padrão de botões de ação do app
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 35,
    shadowColor: "#00ff00", 
    shadowOpacity: 0.3, 
    shadowRadius: 6, 
    elevation: 4
  },
  btnText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1B1F1D",
  },
});