import React, { useState } from 'react';
import { StyleSheet, ImageBackground, View, Image, Text, useWindowDimensions } from 'react-native';
import { RectangleEmail } from "./components/RectangleEmail/index.js"
import { RectangleSenha } from "./components/RectangleSenha/index.js"

export function EsqueciMinhaSenha({ navigation }) {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const loginIconSize = Math.min(windowWidth, windowHeight) * 0.2;
  const [troca, setTroca] = useState(false);

  const handleTroca = () => {
    setTroca(true)
  }


  return (
    <ImageBackground
      source={require('../../../assets/background.png')}
      style={styles.background}
    >

      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <View style={styles.iconContainer}>
            <Image source={require('../../../assets/login-icon.png')} style={[styles.loginIcon, { width: loginIconSize, height: loginIconSize }]} />
          </View>
          <Text style={styles.welcomeText}>Esqueceu sua senha?</Text>
          <Text style={styles.instructionsText}>Insira seu e-mail para continuar</Text>
        </View>

        {!troca && <RectangleEmail navigation={navigation} troca={handleTroca}/>}
        {troca && <RectangleSenha navigation={navigation}/>}

      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    backgroundColor: '#674188',
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: 'center',
  },
  loginContainer: {
    alignSelf: 'flex-start',
    paddingLeft: '10%',
    paddingTop: '25%',
    marginTop: '10%',
  },
  iconContainer: {
    marginBottom: 20,
  },
  loginIcon: {
    resizeMode: 'contain',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'left',
  },
  instructionsText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'left',
    width: 350
  },
});
