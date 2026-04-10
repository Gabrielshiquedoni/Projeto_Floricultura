import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite';

export default function DatabaseDebugScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [tabelas, setTabelas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    carregarInformacoes();
  }, []);

  const carregarInformacoes = async () => {
    try {
      setLoading(true);
      const db = SQLite.openDatabaseSync('usuarios.db');
      
      
      const tabelasResult = await db.getAllAsync(
        "SELECT name FROM sqlite_master WHERE type='table'"
      );
      setTabelas(tabelasResult);

     
      const usuariosResult = await db.getAllAsync('SELECT * FROM usuarios');
      setUsuarios(usuariosResult);

      
      const totalUsuarios = usuariosResult.length;
      const comIdade = usuariosResult.filter(u => u.idade).length;
      const maisAntigo = usuariosResult.length > 0 ? 
        new Date(Math.min(...usuariosResult.map(u => new Date(u.criado_em)))).toLocaleDateString('pt-BR') : 
        'N/A';

      setStats({
        total: totalUsuarios,
        comIdade,
        maisAntigo,
        dbPath: 'usuarios.db'
      });

    } catch (error) {
      console.error('Erro ao carregar informações:', error);
      Alert.alert('Erro', 'Não foi possível carregar informações do banco');
    } finally {
      setLoading(false);
    }
  };

  const copiarDados = () => {
    const dados = JSON.stringify(usuarios, null, 2);
    console.log('📋 Dados do banco:', dados);
    Alert.alert(
      'Dados Copiados',
      'Os dados foram impressos no console. Abra o terminal do Expo para visualizar.',
      [{ text: 'OK' }]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Carregando informações...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Debug - Banco de Dados</Text>
        <TouchableOpacity 
          style={styles.refreshButton}
          onPress={carregarInformacoes}
        >
          <Ionicons name="refresh" size={24} color="#2196F3" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Estatísticas</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{stats?.total || 0}</Text>
              <Text style={styles.statLabel}>Total de Usuários</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{stats?.comIdade || 0}</Text>
              <Text style={styles.statLabel}>Com Idade</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Primeiro Registro:</Text>
            <Text style={styles.infoValue}>{stats?.maisAntigo}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Banco de Dados:</Text>
            <Text style={styles.infoValue}>{stats?.dbPath}</Text>
          </View>
        </View>

       
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🗃️ Tabelas ({tabelas.length})</Text>
          {tabelas.map((tabela, index) => (
            <View key={index} style={styles.tableItem}>
              <Ionicons name="file-tray-full" size={20} color="#2196F3" />
              <Text style={styles.tableName}>{tabela.name}</Text>
            </View>
          ))}
        </View>

        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>👥 Dados dos Usuários</Text>
            <TouchableOpacity 
              style={styles.copyButton}
              onPress={copiarDados}
            >
              <Ionicons name="copy-outline" size={20} color="#fff" />
              <Text style={styles.copyButtonText}>Copiar</Text>
            </TouchableOpacity>
          </View>
          
          {usuarios.length === 0 ? (
            <Text style={styles.emptyText}>Nenhum usuário cadastrado</Text>
          ) : (
            usuarios.map((usuario, index) => (
              <View key={usuario.id} style={styles.userCard}>
                <View style={styles.userHeader}>
                  <Text style={styles.userId}>ID: {usuario.id}</Text>
                </View>
                <Text style={styles.userField}>
                  <Text style={styles.fieldLabel}>Nome: </Text>
                  {usuario.nome}
                </Text>
                <Text style={styles.userField}>
                  <Text style={styles.fieldLabel}>Email: </Text>
                  {usuario.email}
                </Text>
                <Text style={styles.userField}>
                  <Text style={styles.fieldLabel}>Idade: </Text>
                  {usuario.idade || 'N/A'}
                </Text>
                <Text style={styles.userField}>
                  <Text style={styles.fieldLabel}>Criado: </Text>
                  {new Date(usuario.criado_em).toLocaleString('pt-BR')}
                </Text>
              </View>
            ))
          )}
        </View>

        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ℹ️ Localização do Banco</Text>
          <Text style={styles.helpText}>
            O arquivo usuarios.db está armazenado no diretório privado do aplicativo:
          </Text>
          <Text style={styles.codeText}>
            Android: /data/data/&lt;pacote&gt;/databases/usuarios.db
          </Text>
          <Text style={styles.codeText}>
            iOS: Library/LocalDatabase/usuarios.db
          </Text>
          <Text style={[styles.helpText, { marginTop: 12 }]}>
            Para exportar os dados, use o botão "Copiar" acima e veja o console do Expo.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  refreshButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: '#fff',
    marginBottom: 16,
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#e3f2fd',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
  },
  tableItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 8,
    gap: 12,
  },
  tableName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  copyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  userCard: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  userHeader: {
    marginBottom: 8,
  },
  userId: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2196F3',
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  userField: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
  },
  fieldLabel: {
    fontWeight: '600',
    color: '#666',
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    paddingVertical: 24,
  },
  helpText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  codeText: {
    fontSize: 12,
    color: '#2196F3',
    backgroundColor: '#f5f5f5',
    padding: 8,
    borderRadius: 4,
    fontFamily: 'monospace',
    marginBottom: 4,
  },
});
