import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import MenuOverlay from '../components/MenuOverlay';
import { createProduto, updateProduto } from '../services/api';

export default function AdminCadastroScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const produtoData = route.params?.produtoData || null;
  const isEdicao = !!produtoData;

  const [menuVisible, setMenuVisible] = useState(false);
  const [salvando, setSalvando] = useState(false);

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [imagemUrl, setImagemUrl] = useState('');
  const [estoque, setEstoque] = useState('');
  const [categoria, setCategoria] = useState('');
  const [emPromocao, setEmPromocao] = useState(false);

  // Preenche os campos se for edição
  useEffect(() => {
    if (produtoData) {
      setNome(produtoData.nome || '');
      setDescricao(produtoData.descricao || '');
      setPreco(produtoData.preco ? String(produtoData.preco) : '');
      setImagemUrl(produtoData.imagem_url || '');
      setEstoque(produtoData.estoque ? String(produtoData.estoque) : '');
      setCategoria(produtoData.fk_id_categoria ? String(produtoData.fk_id_categoria) : '');
      setEmPromocao(produtoData.em_promocao === 1);
    }
  }, [produtoData]);

  const handleSalvar = async () => {
    if (!nome.trim() || !preco.trim()) {
      Alert.alert('Atenção', 'Nome e Preço são obrigatórios.');
      return;
    }

    const payload = {
      nome: nome.trim(),
      descricao: descricao.trim(),
      preco: parseFloat(preco.replace(',', '.')),
      imagem_url: imagemUrl.trim(),
      estoque: parseInt(estoque) || 0,
      fk_id_categoria: parseInt(categoria) || null,
      em_promocao: emPromocao ? 1 : 0,
    };

    try {
      setSalvando(true);
      if (isEdicao) {
        await updateProduto(produtoData.id_produto, payload);
        Alert.alert('Sucesso', 'Produto atualizado!');
      } else {
        await createProduto(payload);
        Alert.alert('Sucesso', 'Produto cadastrado!');
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o produto.');
    } finally {
      setSalvando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
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

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Título */}
          <View style={styles.titleRow}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
              <Feather name="arrow-left" size={24} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.title}>{isEdicao ? 'Editar Produto' : 'Novo Produto'}</Text>
          </View>
          <Text style={styles.subtitle}>
            {isEdicao ? 'Altere os dados e salve' : 'Preencha os dados abaixo'}
          </Text>

          {/* Formulário */}
          <View style={styles.formContainer}>
            <Text style={styles.label}>Nome do Produto *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Buquê de Rosas"
              placeholderTextColor="#A0AAB2"
              value={nome}
              onChangeText={setNome}
            />

            <Text style={styles.label}>Descrição</Text>
            <TextInput
              style={[styles.input, styles.inputMultiline]}
              placeholder="Descreva o produto..."
              placeholderTextColor="#A0AAB2"
              value={descricao}
              onChangeText={setDescricao}
              multiline
              numberOfLines={3}
            />

            <View style={styles.row}>
              <View style={styles.halfInput}>
                <Text style={styles.label}>Preço (R$) *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0.00"
                  placeholderTextColor="#A0AAB2"
                  value={preco}
                  onChangeText={setPreco}
                  keyboardType="decimal-pad"
                />
              </View>
              <View style={[styles.halfInput, { marginLeft: 10 }]}>
                <Text style={styles.label}>Estoque</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0"
                  placeholderTextColor="#A0AAB2"
                  value={estoque}
                  onChangeText={setEstoque}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <Text style={styles.label}>URL da Imagem</Text>
            <TextInput
              style={styles.input}
              placeholder="https://... ou nome-do-arquivo.jpg"
              placeholderTextColor="#A0AAB2"
              value={imagemUrl}
              onChangeText={setImagemUrl}
              autoCapitalize="none"
            />

            <Text style={styles.label}>ID da Categoria</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 1"
              placeholderTextColor="#A0AAB2"
              value={categoria}
              onChangeText={setCategoria}
              keyboardType="numeric"
            />

            {/* Toggle Promoção */}
            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setEmPromocao(!emPromocao)}
              activeOpacity={0.7}
            >
              <View style={[styles.checkbox, emPromocao && styles.checkboxAtivo]}>
                {emPromocao && <Feather name="check" size={16} color="#1B1F1D" />}
              </View>
              <Text style={styles.checkboxLabel}>Produto em promoção</Text>
            </TouchableOpacity>

            {/* Botão Salvar */}
            <TouchableOpacity
              style={[styles.saveButton, salvando && { opacity: 0.6 }]}
              onPress={handleSalvar}
              disabled={salvando}
              activeOpacity={0.8}
            >
              <Feather name={isEdicao ? 'save' : 'plus-circle'} size={20} color="#1B1F1D" />
              <Text style={styles.saveButtonText}>
                {salvando ? 'Salvando...' : (isEdicao ? 'Salvar Alterações' : 'Cadastrar Produto')}
              </Text>
            </TouchableOpacity>
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
  subtitle: { fontSize: 14, color: '#A0AAB2', paddingHorizontal: 20, marginTop: 4, marginBottom: 20, marginLeft: 45 },

  formContainer: {
    backgroundColor: '#1A2421', marginHorizontal: 20, padding: 20, borderRadius: 20,
  },

  label: { color: '#FFF', fontSize: 14, fontWeight: 'bold', marginBottom: 8 },

  input: {
    backgroundColor: '#2C3A35', borderRadius: 12, padding: 15,
    color: '#FFF', marginBottom: 15, fontSize: 15,
  },
  inputMultiline: { textAlignVertical: 'top', minHeight: 80 },

  row: { flexDirection: 'row', justifyContent: 'space-between' },
  halfInput: { flex: 1 },

  checkboxRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 10, marginBottom: 20 },
  checkbox: {
    width: 26, height: 26, borderRadius: 6, borderWidth: 2, borderColor: '#A0AAB2',
    justifyContent: 'center', alignItems: 'center', marginRight: 12,
  },
  checkboxAtivo: { backgroundColor: '#00ff00', borderColor: '#00ff00' },
  checkboxLabel: { color: '#FFF', fontSize: 15 },

  saveButton: {
    backgroundColor: '#00ff00', paddingVertical: 16, borderRadius: 12,
    alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 10,
    shadowColor: '#00ff00', shadowOpacity: 0.3, shadowRadius: 6, elevation: 4,
  },
  saveButtonText: { color: '#1B1F1D', fontSize: 17, fontWeight: 'bold' },
});
