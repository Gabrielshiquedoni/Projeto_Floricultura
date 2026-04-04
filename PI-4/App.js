import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from './src/screens/HomeScreen';
import UsuarioDetailScreen from './src/screens/UsuarioDetailScreen';
import DatabaseDebugScreen from './src/screens/DatabaseDebugScreen';
import BuqueScreen from './src/screens/BuqueScreen';
import ConjuntoScreen from './src/screens/ConjuntoScreen';
import MudaScreen from './src/screens/MudaScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Buques" component={BuqueScreen} />
          <Stack.Screen name="Conjuntos" component={ConjuntoScreen} />
          <Stack.Screen name="Mudas" component={MudaScreen} />
          <Stack.Screen name="DatabaseDebug" component={DatabaseDebugScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
