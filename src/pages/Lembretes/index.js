import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { Rectangle } from "./components/Rectangle/index.js"
import styles from "./styles.js"

import { getPacienteData } from "../../services/saveData.js"

export default function Lembretes() {
  const [nome, setNome] = useState('');

  const getUsername = async () => {
    try {
      const storedUsername = await getPacienteData();
      if (storedUsername !== null) {
        setNome(storedUsername.nome);
      }
    } catch (error) {
      console.log('Erro ao buscar o nome do usuário:', error);
    }
  };

  useEffect(() => {
    getUsername();
  }, []);

  return (
    <ImageBackground
      source={require('../../../assets/fundo2.png')}
      style={styles.background}
    >

      <View style={styles.container}>
        <Text style={styles.title}>Lembretes</Text>
        <View style={styles.line} />

        <View style={styles.conChamada}>
          <Text style={styles.chamada}>Não se esqueça de nada!</Text>
          <Text style={styles.chamada}>Faça suas anotações</Text>
        </View>
      </View>

        <Rectangle />

    </ImageBackground>
  );
}