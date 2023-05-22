import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import DiarioEmocoes from "../pages/DiarioEmocoes/index.js"
import DiarioSonhos from "../pages/DiarioSonhos/index.js"
import Lembretes from "../pages/Lembretes/index.js"
import MinhaConta from "../pages/MinhaConta/index.js"
import Home from "../pages/Home/index.js"
import Consulta from "../pages/Consultas/index.js"

const Drawer = createDrawerNavigator()

export default function DrawerNavigation() {

  return (
      <Drawer.Navigator initialRouteName="Home" 
      screenOptions={{
        drawerStyle: {
          width: '60%',
      },
      drawerActiveTintColor: "white",
      drawerActiveBackgroundColor: "#282A3A",
      drawerStyle:{
        backgroundColor: "#F7EFE5"
      },
      headerStyle: {
        backgroundColor: "#F7EFE5"
      },
      headerLeft: () => <CustomDrawerButton />,
  }}>
        {/* Tela a tela abaixo */}
        <Drawer.Screen name="Thelma Armidoro" component={Home} options={{ headerTitle: '' }}/>
        <Drawer.Screen name="Consultas" component={Consulta} options={{ headerTitle: '' }}/>
        <Drawer.Screen name="Diário de Emoções" component={DiarioEmocoes} options={{ headerTitle: '' }} />
        <Drawer.Screen name="Diário dos Sonhos" component={DiarioSonhos} options={{ headerTitle: '' }}/>
        <Drawer.Screen name="Lembretes" component={Lembretes} options={{ headerTitle: '' }}/>
        <Drawer.Screen name="Minha Conta" component={MinhaConta} options={{ headerTitle: '' }}/>

      </Drawer.Navigator>
  );
}



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