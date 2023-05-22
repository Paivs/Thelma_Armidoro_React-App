import React, { useState } from 'react';
import { View, useWindowDimensions, StyleSheet, TextInput, Text, TouchableOpacity, Alert } from 'react-native';


export const Rectangle = () => {
  const windowHeight = useWindowDimensions().height;
  const heightRectangle = windowHeight * 0.3;

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');


  return (
    <View style={styles.container}>
      <View style={styles.conData}>
        <Text style={styles.data}>Quinta, 19 de Maio</Text>
      </View>

      <View style={[styles.rectangle, { height: heightRectangle }]}>
        <View>
          <Text style={styles.input}>TITULO</Text>
        </View>

        <View>
          <Text style={styles.inputText}>DESCRICAO</Text>
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    textAlign: "center",
    justifyContent: "center"
  },
  rectangle: {
    backgroundColor: '#282A3A',

    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,

    height: 10,
    width: '90%',


  },
  input: {
    fontSize: 26,
    fontWeight: 'bold',
    color: "white",
    marginBottom: 15,
  },
  inputText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "white",
    marginBottom: 15,
  },
  data: {
    fontSize: 15,
    fontWeight: 'bold',
    color: "#282A3A",
    marginBottom: 0,
  },
  conData: {
    textAlign: "left",
    marginLeft: 40,
    marginTop: -5,
    marginBottom: 15,
  },
});