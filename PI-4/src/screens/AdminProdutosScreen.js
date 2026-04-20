import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import MenuOverlay from '../components/MenuOverlay';
import { getProdutos, deleteProduto, BASE_URL } from '../services/api';

export default function AdminProdutosScreen() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  const carregarProdutos = async () => {
    try {
      setLoading(true);
      const data = await getProdutos();
      setProdutos(data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os produtos.');
    } finally {
      setLoading(false);
    }
  };

  // Recarrega sempre que a tela ganha foco (ex: voltou do cadastro)
  useFocusEffect(
    useCallback(() => {
      carregarProdutos();
    }, [])
  );

  const confirmarExclusao = (id, nome) => {
    Alert.alert(
      'Excluir Produto',
      `Tem certeza que deseja excluir "${nome}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteProduto(id);
              setProdutos(prev => prev.filter(p => p.id_produto !== id));
              Alert.alert('Sucesso', 'Produto removido!');
            } catch (error) {
              Alert.alert('Erro', 'Falha ao excluir produto.');
            }
          },
        },
      ]
    );
  };

  const renderProduto = ({ item }) => {
    let imagem = require('../../assets/images/LogoSemFundo.png');
    if (item.imagem_url && item.imagem_url.length > 4) {
      if (item.imagem_url.startsWith('http')) {
        imagem = { uri: item.imagem_url };
      } else {
        imagem = { uri: `${BASE_URL}/images/${item.imagem_url}` };
      }
    }

    const precoFormatado = Number(item.preco).toFixed(2).replace('.', ',');

    return (
      <View style={styles.card}>
        <Image source={imagem} style={styles.cardImage} />
        <View style={styles.cardInfo}>
          <Text style={styles.cardNome} numberOfLines={1}>{item.nome}</Text>
          <Text style={styles.cardPreco}>R$ {precoFormatado}</Text>
          <Text style={styles.cardEstoque}>Estoque: {item.estoque || 0}</Text>
        </View>
        <View style={styles.cardActions}>
          <TouchableOpacity
            style={styles.btnEditar}
            onPress={() => navigation.navigate('AdminCadastro', { produtoData: item })}
          >
            <Feather name="edit-2" size={18} color="#00ff00" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnExcluir}
            onPress={() => confirmarExclusao(item.id_produto, item.nome)}
          >
            <Feather name="trash-2" size={18} color="#FF6B6B" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
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

      {/* Título */}
      <View style={styles.titleRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Feather name="arrow-left" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Painel de Produtos</Text>
      </View>
      <Text style={styles.subtitle}>Gerencie o catálogo da floricultura</Text>

      {/* Lista */}
      {loading ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color="#00ff00" />
          <Text style={styles.loadingText}>Carregando produtos...</Text>
        </View>
      ) : (
        <FlatList
          data={produtos}
          keyExtractor={(item) => item.id_produto.toString()}
          renderItem={renderProduto}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Feather name="inbox" size={48} color="#2C3A35" />
              <Text style={styles.emptyText}>Nenhum produto cadastrado</Text>
            </View>
          }
        />
      )}

      {/* FAB - Novo Produto */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AdminCadastro', { produtoData: null })}
        activeOpacity={0.8}
      >
        <Feather name="plus" size={28} color="#1B1F1D" />
      </TouchableOpacity>

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

  titleRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginTop: 20 },
  backBtn: { padding: 8, marginRight: 8 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#FFF' },
  subtitle: { fontSize: 14, color: '#A0AAB2', paddingHorizontal: 20, marginTop: 4, marginBottom: 15, marginLeft: 45 },

  listContent: { paddingHorizontal: 20, paddingBottom: 100 },

  card: {
    backgroundColor: '#1A2421', borderRadius: 12, padding: 12, flexDirection: 'row',
    alignItems: 'center', marginBottom: 12,
    shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 3, elevation: 2,
  },
  cardImage: { width: 60, height: 60, borderRadius: 10, marginRight: 12 },
  cardInfo: { flex: 1 },
  cardNome: { fontSize: 15, fontWeight: 'bold', color: '#FFF', marginBottom: 3 },
  cardPreco: { fontSize: 16, color: '#00ff00', fontWeight: 'bold' },
  cardEstoque: { fontSize: 12, color: '#A0AAB2', marginTop: 2 },
  cardActions: { flexDirection: 'column', gap: 10, marginLeft: 8 },
  btnEditar: { padding: 8, backgroundColor: '#2C3A35', borderRadius: 8 },
  btnExcluir: { padding: 8, backgroundColor: '#2C3A35', borderRadius: 8 },

  loadingBox: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, color: '#A0AAB2' },

  emptyBox: { alignItems: 'center', marginTop: 60 },
  emptyText: { color: '#A0AAB2', marginTop: 12, fontSize: 16 },

  fab: {
    position: 'absolute', bottom: 30, right: 25,
    backgroundColor: '#00ff00', width: 60, height: 60, borderRadius: 30,
    justifyContent: 'center', alignItems: 'center',
    elevation: 8, shadowColor: '#00ff00', shadowOpacity: 0.4, shadowRadius: 8,
  },
});
