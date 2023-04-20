import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { hasExpiredLogin } from "./src/services/saveData"

//TELAS - TELAS - TELAS - TELAS - TELAS - TELAS - TELAS - TELAS
import { Login } from "./src/pages/Login"
import { Cadastro } from "./src/pages/Cadastro"

export default function App() {
  const Stack = createStackNavigator();

  useEffect(() => {
    // verifica se já se passaram mais de 24 horas desde o último login
    hasExpiredLogin().then((hasExpired) => {
      if (hasExpired) {
        // se já se passaram mais de 24 horas, exige um novo login
        console.log('Faça login novamente');
      } else {
        // se ainda não se passaram 24 horas, atualiza a data do último login
        updateLastLogin();
        console.log('Bem-vindo de volta!');
      }
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
