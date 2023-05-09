import React from 'react';
import { ImageBackground, View, Image, Text, useWindowDimensions } from 'react-native';
import { Rectangle } from "./components/Rectangle/index.js"
import styles from "./styles.js"
import { ScrollView } from 'react-native-web';

export function CadastroDadosEndereco({ navigation }) {
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
          <Text style={styles.welcomeText}>Onde você mora?</Text>
          <Text style={styles.instructionsText}>Preencha o formulário para que possamos te conhecer.</Text>
        </View>

        <Rectangle navigation={navigation}/>


      </View>
    </ImageBackground>
  );
};
