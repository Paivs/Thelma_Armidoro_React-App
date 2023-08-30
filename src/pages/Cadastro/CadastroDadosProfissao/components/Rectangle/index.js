import React, { useState, useContext, useEffect } from 'react';
import { View, useWindowDimensions, StyleSheet, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import GrauEscolaridade from "../GrauEscolaridade/index.js"
import { DataStateContext } from '../../../components/DataCenter/index.js';
import { ValidarCargo, ValidarProfissao, ValidarCurso } from "../validator/index.js"


export const Rectangle = ({ navigation }) => {
  const { profissao, setProfissao, cargo, setCargo, curso, setCurso, grau_escolaridade, setGrau_escolaridade } = useContext(DataStateContext);

  const windowHeight = useWindowDimensions().height;
  const heightRectangle = windowHeight * 0.65;

  useEffect(() => {
    setGrau_escolaridade(0)
  }, [])


  const handleSubmit = async () => {

    let erros = []

    if(!ValidarCargo(cargo)) erros.push("Cargo")
    if(!ValidarProfissao(profissao)) erros.push("Profissão")
    if(!ValidarCurso(curso)) erros.push("Curso")

    let texto = ""

    console.log("\nErros")
    erros.forEach(c => {
      console.log(c)
      texto = texto + "- " + c + "\n"
    })
    console.log("---\n")
    
    if(erros.length == 0){
      navigation.navigate('Dados Endereco');
    }else{
      Alert.alert(
        'Alerta!', "Os seguintes campos foram preenchidos incorretamentes:\n" + texto,
        [{ text: 'OK', onPress: () => console.log('Botão OK pressionado') },],
        { cancelable: false }
      );      
    }

  };

  return (
      <View style={[styles.rectangle, { height: heightRectangle }]}>
        <View style={styles.form}>

        <View style={styles.formControl}>
          <Text style={styles.label}>Grau de escolaridade:</Text>
          <GrauEscolaridade
              onStatusChange={(text) => setGrau_escolaridade(text)}
            />
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