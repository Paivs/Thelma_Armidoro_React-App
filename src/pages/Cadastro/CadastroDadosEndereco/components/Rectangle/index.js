import React, { useState } from 'react';
import { View, useWindowDimensions, StyleSheet, TextInput, Text, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { TextInputMask } from 'react-native-masked-text';


export const Rectangle = ({ navigation }) => {
  const windowHeight = useWindowDimensions().height;
  const heightRectangle = windowHeight * 0.65;

  const [logradouro, setLogradouro] = useState('');
  const [CEP, setCEP] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [pais, setPais] = useState('');
  const [celular, setCelular] = useState('');



  const handleEnvio = async () => {

  }

  const handleSubmit = async () => {
    navigation.navigate('Dados Emergencia');
  };


  return (
    <View style={[styles.rectangle, { height: heightRectangle }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.form}>

        <View style={styles.formControl}>
          <Text style={styles.label}>CEP:</Text>
          <TextInputMask
            style={styles.input}
            type={'custom'}
            value={CEP}
            onChangeText={text => setCEP(text)}
            placeholder="Digite seu CPF"
            options={{
              mask: "9999-999"
            }}
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Logradouro:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu endereço (logradouro)"
            onChangeText={(text) => setLogradouro(text)}
            value={logradouro}
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Complemento:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o complemento"
            onChangeText={(text) => setComplemento(text)}
            value={complemento}
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Bairro:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu bairro"
            onChangeText={(text) => setBairro(text)}
            value={bairro}
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Cidade:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua cidade"
            onChangeText={(text) => setCidade(text)}
            value={cidade}
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Estado:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua estado"
            onChangeText={(text) => setEstado(text)}
            value={estado}
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>País:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu país"
            onChangeText={(text) => setPais(text)}
            value={pais}
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Celular:</Text>
          <TextInputMask
            style={styles.input}
            type={'custom'}
            value={celular}
            onChangeText={text => setCelular(text)}
            placeholder="Digite seu celular"
            options={{
              mask: "+99 (99) 999999999"
            }}
          />
        </View>

        <TouchableOpacity style={styles.btnEntrar} onPress={handleSubmit}>
          <Text style={styles.btnEntrarTexto}>Próximo</Text>
        </TouchableOpacity>
        <View style={styles.linksContainer}>
        </View>
      </View>

      </ScrollView>

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