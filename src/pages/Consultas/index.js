import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ImageBackground, TextInput, StyleSheet } from 'react-native'; 
import { temConsulta } from "../../services/api.js"

export default function Consultas({ navigation }) {

  const getConsultaLocal = async () => {
    const consulta = await temConsulta()

    console.log("\nvaloreslidos\n")
    console.log(consulta)
    
    if (!consulta) {
      navigation.navigate("Sem Consulta")
    } else if (consulta) {
      navigation.navigate("Com Consulta")
    }
  }

  const focusListener = navigation.addListener('focus', () => {
    getConsultaLocal();
  });

  useEffect(() => {
    // Call the function when the screen is loaded
    getConsultaLocal();
  
  }, [navigation]);  // Add navigation as a dependency to the useEffect


  return (
    <ImageBackground
      source={require('../../../assets/fundo1.png')}
      style={styles.background}
    >
      {/* Rest of your code */}
    </ImageBackground>
  )
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    backgroundColor: '#674188',
  },
  botaoDireita: {
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#282A3A",
  },
  botaoDireitaText: {
    margin: 5,
    marginRight: 10,
    marginLeft: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 175,
  },
  header: {
    marginBottom: 0,
    marginTop: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  label: {
    margin: 20,
    marginBottom: 5,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "justify",
    fontWeight: "bold",
    width: "75%",
  },  
  input: {
    margin: 20,
    marginBottom: 0,
    marginTop: 0,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "justify",
    fontWeight: "bold",
    width: "75%",
    borderRadius: 15,
    color: "black",
    borderWidth: 3,
    paddingHorizontal: 10,
    borderColor: "#282A3A",
    height: 50,
    backgroundColor: "#F7EFE5",
  },
  
  subHeaderText: {
    fontSize: 16,
    color: 'gray',
  },
  map: {
    width: '90%',
    height: 200,
    textAlign: "center"
  },
  description: {
    margin: 20,
    marginBottom: 0,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    width: "75%",
  },
});