import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Image, Alert } from 'react-native';
import { cadastrarUsuario, cadastrarUsuarioPin } from "../../../src/services/api"
import PinPopup from "../../components/PIN/index.js"

export function Cadastro({ navigation }) {
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRetyped, setPasswordRetyped] = useState('');
  const [pinpopup, setPinPopup] = useState(false)

  const handleCadastrar = async () => {
    if (password == passwordRetyped) {
      const passou = cadastrarUsuario(username.trim(), password)
      setPinPopup(true)
      
    } else {
      Alert.alert(
        'Erro', 'As senhas não correspondem!',
        [{ text: 'OK', onPress: () => console.log('Botão OK pressionado') },],
        { cancelable: false }
      );
    }

  };

  const handleEnvio = async (newPin) => {
    if (pin !== null) {
      setPin(newPin);
    }
    console.log("ENTREI")
    console.log(`user: ${username}`)
    console.log(`password: ${password}`)
    console.log(`pin: ${newPin}`)

    const foi = await cadastrarUsuarioPin(username, password, newPin)

    if(foi){
      setPinPopup(false)
      navigation.navigate('Login');
    }
    
  }

  return ( 
  <>
    <View style={styles.container}>
    <PinPopup
        show={pinpopup}
        usuario={username}
        senha={password}
        pin={pin}
        close={handleEnvio}/>

      <Text style={styles.logo}>Cadastro</Text>
      <Text style={styles.subtext}>Faça seu perfil!</Text>

      <View style={[styles.inputContainer, { marginTop: 50 }]}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Endereço de email"
          placeholderTextColor="#aaaaaa"
          onChangeText={setUsername}
          value={username}
          autoCapitalize="none" />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a senha"
          placeholderTextColor="#aaaaaa"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true} />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite novamente a senha"
          placeholderTextColor="#aaaaaa"
          onChangeText={setPasswordRetyped}
          value={passwordRetyped}
          secureTextEntry={true} />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleCadastrar}>
        <Text style={styles.buttonTitle}>Cadastrar</Text>
      </TouchableOpacity>

      <View style={styles.bottomContainer}>
        <View style={styles.bottomLinks}></View>
      </View>

    </View>
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#735192',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 40,
    color: '#F7EFE5',
    marginBottom: 5,
    marginRight: 98,
  },
  subtext: {
    fontWeight: '500',
    fontSize: 18,
    color: '#F7EFE5',
    marginBottom: 80,
    marginRight: 96,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    color: '#C3ACD0',
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    backgroundColor: '#F7EFE5',
    borderWidth: 2,
    borderColor: '#C3ACD0',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: 'black',
  },
  button: {
    backgroundColor: '#C3ACD0',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginTop: 30,
  },
  buttonTitle: {
    color: '#674188',
    fontSize: 20,
    fontWeight: 'bold',
  },
  bottomLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  link: {
    color: '#F7EFE5',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginRight: 80,
    textAlign: 'left',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 30,
    left: 75,
    right: 0,
    backgroundColor: '#735192',
    alignItems: 'center',
  },
});

