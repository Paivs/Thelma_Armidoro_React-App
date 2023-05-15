import React, { useContext, useState } from 'react';
import { View, useWindowDimensions, StyleSheet, TextInput, Text, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { TextInputMask } from 'react-native-masked-text';
import { DataStateContext } from "../../../components/DataCenter/index.js"


export const Rectangle = ({ navigation }) => {
  const { endereco, setEndereco } = useContext(DataStateContext);

  const windowHeight = useWindowDimensions().height;
  const heightRectangle = windowHeight * 0.65;


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
            value={endereco.cep}
            onChangeText={text => setEndereco({ ...endereco, cep: text})}
            placeholder="Digite seu CEP"
            options={{
              mask: "99999999"
            }}
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Logradouro:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu endereço (logradouro)"
            onChangeText={(text) => setEndereco({ ...endereco, logradouro: text})}
            value={endereco.logradouro}
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Número:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o número do seu endereço"
            onChangeText={(text) => setEndereco({ ...endereco, numero: text})}
            value={endereco.numero}
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Complemento:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o complemento"
            onChangeText={(text) => setEndereco({ ...endereco, complemento: text})}
            value={endereco.complemento}
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Bairro:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu bairro"
            onChangeText={(text) => setEndereco({ ...endereco, bairro: text})}
            value={endereco.bairro}
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Cidade:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua cidade"
            onChangeText={(text) => setEndereco({ ...endereco, cidade: text}) }
            value={endereco.cidade}
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Estado:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua estado"
            onChangeText={(text) => setEndereco({ ...endereco, uf: text}) }
            value={endereco.uf}
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>País:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu país"
            onChangeText={(text) => setEndereco({ ...endereco, pais: text})}
            value={endereco.pais}
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