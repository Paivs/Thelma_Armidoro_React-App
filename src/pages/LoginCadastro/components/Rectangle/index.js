import React, { useState } from 'react';
import { View, useWindowDimensions, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { login } from "../../../../services/api.js"


export const Rectangle = ({ navigation }) => {
  const windowHeight = useWindowDimensions().height;
  const heightRectangle = windowHeight * 0.65;

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaOculta, setSenhaOculta] = useState(true);

  const toggleSenhaOculta = () => {
    setSenhaOculta(!senhaOculta);
  };

  const handleSubmit = async () => {
    console.log("entrar do login")
    const foi = await login(email.trim(), senha, navigation) 

    if (foi) {
      navigation.navigate('Dados Pessoais');
    }
  };



  return (
    <View style={[styles.rectangle, {height: heightRectangle}]}>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>E-mail:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
        </View>
        
        <View style={styles.inputSenhaContainer}>
        <Text style={styles.label}>Senha:</Text>
        <View style={styles.inputSenha}>
          <TextInput
            style={styles.inputSenhaTexto}
            value={senha}
            onChangeText={setSenha}
            placeholder="Digite sua senha"
            secureTextEntry={senhaOculta}
          />
          <TouchableOpacity
            style={styles.btnOcultarSenha}
            onPress={toggleSenhaOculta}
          >
            <Text style={styles.btnOcultarSenhaTexto}>
              {senhaOculta ? 'Mostrar' : 'Ocultar'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

        <TouchableOpacity style={styles.btnEntrar} onPress={handleSubmit}>
          <Text style={styles.btnEntrarTexto}>Entrar</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rectangle: {
    position: 'absolute',
    bottom: 0,
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
  // inputSenhaContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   borderWidth: 1,
  //   borderColor: '#ccc',
  //   borderRadius: 5,
  //   paddingHorizontal: 10,
  //   paddingVertical: 12,
  //   marginBottom: 20,
  //   backgroundColor: '#9b7bb2',
  // },
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