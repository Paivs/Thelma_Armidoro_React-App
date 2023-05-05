import React from 'react';
import { ImageBackground, View, Image, Text, useWindowDimensions } from 'react-native';
import { Rectangle } from "./components/Rectangle/index.js"
import styles from "./styles.js"

export function CadastroDadosEmergencia({ navigation }) {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const loginIconSize = Math.min(windowWidth, windowHeight) * 0.2;


  return (
    <ImageBackground
      source = {require('../../../../assets/background.png')}
      style = {styles.background}
    >

      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <View style={styles.iconContainer}>
            <Image source={require('../../../../assets/login-icon.png')} style={[styles.loginIcon, { width: loginIconSize, height: loginIconSize }]} />
          </View>
          <Text style={styles.welcomeText}>Emergência</Text>
          <Text style={styles.instructionsText}>Este contato será acionado em caso de Emergência</Text>
        </View>

        <Rectangle navigation={navigation}/>

      </View>
    </ImageBackground>
  );
};
