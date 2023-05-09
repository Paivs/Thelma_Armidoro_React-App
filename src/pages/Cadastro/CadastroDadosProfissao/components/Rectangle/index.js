import React, { useState } from 'react';
import { View, useWindowDimensions, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import GrauEscolaridade from "../GrauEscolaridade/index.js"


export const Rectangle = ({ navigation }) => {
  const windowHeight = useWindowDimensions().height;
  const heightRectangle = windowHeight * 0.65;

  const [curso, setCurso] = useState('');
  const [profissao, setProfissao] = useState('');
  const [cargo, setCargo] = useState('');



  const handleEnvio = async () => {

  }

  const handleSubmit = async () => {
    navigation.navigate('Dados Endereco');
  };

  const renderVirtualizedList = () => {
    return (
      <GrauEscolaridade/>
    );
  };


  return (
      <View style={[styles.rectangle, { height: heightRectangle }]}>
        <View style={styles.form}>

        <View style={styles.formControl}>
          <Text style={styles.label}>Grau de escolaridade:</Text>
          {renderVirtualizedList()}
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label2}>Qual curso superior cursou ou está cursando?</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite aqui o curso"
            onChangeText={(text) => setCurso(text)}
            value={curso}
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Profissão:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite aqui sua profissão"
            onChangeText={(text) => setProfissao(text)}
            value={profissao}
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Cargo:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite aqui seu cargo"
            onChangeText={(text) => setCargo(text)}
            value={cargo}
          />
        </View>
          

          <TouchableOpacity style={styles.btnEntrar} onPress={handleSubmit}>
            <Text style={styles.btnEntrarTexto}>Próximo</Text>
          </TouchableOpacity>
          <View style={styles.linksContainer}>
          </View>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  rectangle: {
    position: 'absolute',
    bottom: -30,
    backgroundColor: '#8868A5',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    width: '100%',
    paddingHorizontal: 40,
    paddingVertical: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16,
  },
  label2: {
    marginBottom: 5,
    marginTop: 5,
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 10
  },
  inputSenhaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 10,
    backgroundColor: '#9b7bb2',
  },
  inputSenha: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
  },
  btnOcultarSenha: {
    width: 50,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 12,
  },
  btnEntrar: {
    backgroundColor: '#6e5baa',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnEntrarTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  btnEntrarGoogle: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnEntrarGoogleTexto: {
    color: '#6e5baa',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linksContainer: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  link: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  inputSenhaContainer: {
    marginBottom: 20,
  },
  inputSenha: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  inputSenhaTexto: {
    flex: 1,
  },
  btnOcultarSenha: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnOcultarSenhaTexto: {
    color: '#9b7bb2',
    fontSize: 16,
  },
});