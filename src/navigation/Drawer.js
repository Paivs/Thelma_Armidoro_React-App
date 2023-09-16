import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { Image, TouchableOpacity, View, Text, SafeAreaView } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import DrawerHeader from './components/DrawerHeader/index';
import DrawerFooter from './components/DrawerFooter/index';

import DiarioEmocoes from "../pages/DiarioEmocoes/index.js";
import DiarioSonhos from "../pages/DiarioSonhos/index.js";
import Lembretes from "../pages/Lembretes/index.js";
import MinhaConta from "../pages/MinhaConta/index.js";
import Home from "../pages/Home/index.js";
import Consulta from "../pages/Consultas/index.js";
import MarcarConsulta from "../pages/Consultas/MarcarConsulta/index.js";
import NaoConsulta from "../pages/Consultas/NaoConsulta/index.js";
import TemConsulta from "../pages/Consultas/TemConsulta/index.js";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const ConsultaStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Consultas">
    <Stack.Screen name="Consultas" component={Consulta} options={{ headerTitle: "" }} />
    <Stack.Screen name="Sem Consulta" component={NaoConsulta} options={{ headerTitle: "" }} />
    <Stack.Screen name="Com Consulta" component={TemConsulta} options={{ headerTitle: "" }} />
    <Stack.Screen name="Marcar Consulta" component={MarcarConsulta} options={{ headerTitle: "" }} />
  </Stack.Navigator>
);

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          width: '60%',
        },
        drawerActiveTintColor: "white",
        drawerActiveBackgroundColor: "#282A3A",
        drawerStyle: {
          backgroundColor: "#F7EFE5"
        },
        headerStyle: {
          backgroundColor: "#F7EFE5"
        },
        headerLeft: () => <CustomDrawerButton />,
      }}
    >
      {/* Tela a tela abaixo */}
      <Drawer.Screen name="Início" component={Home} options={{ headerTitle: '' }} />
      <Drawer.Screen name="Consulta" component={ConsultaStack} options={{ headerTitle: '' }} />
      <Drawer.Screen name="Diário de Emoções" component={DiarioEmocoes} options={{ headerTitle: '' }} />
      <Drawer.Screen name="Diário dos Sonhos" component={DiarioSonhos} options={{ headerTitle: '' }} />
      <Drawer.Screen name="Lembretes" component={Lembretes} options={{ headerTitle: '' }} />
      <Drawer.Screen name="Minha Conta" component={MinhaConta} options={{ headerTitle: '' }} />
    </Drawer.Navigator>
  );
}

const CustomDrawerContent = (props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DrawerHeader />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <DrawerFooter />
    </SafeAreaView>
  );
};

const CustomDrawerButton = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.toggleDrawer(); // Abre o menu lateral
  };

  return (
    <TouchableOpacity onPress={handlePress} style={{ marginLeft: 15 }}>
      <Image
        source={require('../../assets/btnNavegacao.png')}
        style={{ width: 35, height: 35 }} // Tamanho do ícone
      />
    </TouchableOpacity>
  );
};
