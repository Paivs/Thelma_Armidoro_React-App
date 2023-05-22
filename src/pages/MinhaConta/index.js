import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import styles from "./styles.js"

export default function MinhaConta() {
  return (
    <ImageBackground
    source={require('../../../assets/fundo2.png')}
    style={styles.background}
  >

    <View style={styles.container}>
      <Text style={styles.title}>Minha Conta</Text>
      <View style={styles.line} />
    </View>
    </ImageBackground>
  );
}