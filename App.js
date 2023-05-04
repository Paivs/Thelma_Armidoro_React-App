import React, { useState, useEffect } from 'react';
// import { hasExpiredLogin } from "./src/services/saveData"
import Navigation from "./src/navigation/index.js"
import { View, Text } from 'react-native';

export default function App() {
  
  // useEffect(() => {
  //   // verifica se já se passaram mais de 24 horas desde o último login
  //   hasExpiredLogin().then((hasExpired) => {
  //     if (hasExpired) {
  //       // se já se passaram mais de 24 horas, exige um novo login
  //       console.log('Faça login novamente');
  //     } else {
  //       // se ainda não se passaram 24 horas, atualiza a data do último login
  //       updateLastLogin();

  //       console.log('Bem-vindo de volta!');
  //     }
  //   });
  // }, []);

  return (
    <Navigation/>
  );
}
