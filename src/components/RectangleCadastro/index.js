import React, { useState } from 'react';
import { View, useWindowDimensions, StyleSheet, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { PinPopup } from "../PIN/index.js"
import { cadastrarUsuario, cadastrarUsuarioPin } from "../../services/api.js"


export const RectangleCadastro = ({ navigation }) => {
  const windowHeight = useWindowDimensions().height;
  const heightRectangle = windowHeight * 0.65;

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaNovamente, setSenhaNovamente] = useState('');
  const [senhaOculta, setSenhaOculta] = useState(true);
  const [senhaOcultaNovamente, setSenhaOcultaNovamente] = useState(true);
  const [pinpopup, setPinPopup] = useState(false)
  const [pin, setPin] = useState('');
  const [editavel, setEditavel] = useState(true);

  const toggleSenhaOculta = () => {
    setSenhaOculta(!senhaOculta);
  };

  const toggleSenhaOcultaNovamente = () => {
    setSenhaOcultaNovamente(!senhaOcultaNovamente);
  };

  const handleEnvio = async (newPin) => {
    if (pin !== null) {
      setPin(newPin);
    }
    console.log("ENTREI")
    console.log(`user: ${email}`)
    console.log(`password: ${senha}`)
    console.log(`pin: ${newPin}`)

    const foi = await cadastrarUsuarioPin(email, senha, newPin)

    if (foi) {
      setPinPopup(false)
      navigation.navigate('LoginCadastro');
    }

    setEditavel(false)

  }

  const handleSubmit = async () => {

    console.log("handleSumit")
    if (senha == senhaNovamente) {
      console.log("bateu")
      const passou = cadastrarUsuario(email.trim(), senha)
      setPinPopup(true)
    } else {
      console.log("não bateu")
      Alert.alert(
        'Erro', 'As senhas não correspondem!',
        [{ text: 'OK', onPress: () => console.log('Botão OK pressionado') },],
        { cancelable: false }
      );
    }

    
  };


  return (
      <View style={[styles.rectangle, { height: heightRectangle }]}>
        <View style={styles.form}>
          <View style={styles.formControl}>
            <Text style={styles.label}>E-mail:</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu e-mail"
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)}
              value={email}
              editable={editavel}
            />
          </View>

          <PinPopup
        show={pinpopup}
        usuario={email}
        senha={senha}
        pin={pin}
        close={handleEnvio} />

          <View style={styles.inputSenhaContainer}>
            <Text style={styles.label}>Senha:</Text>
            <View style={styles.inputSenha}>
              <TextInput
                style={styles.inputSenhaTexto}
                value={senha}
                onChangeText={setSenha}
                placeholder="Digite sua senha"
                secureTextEntry={senhaOculta}
                editable={editavel}
              />
              <TouchableOpacity
                style={styles.btnOcultarSenha}
                onPress={toggleSenhaOculta}
              >
                <Text style={styles.btnOcultarSenhaTexto}>
                  {toggleSenhaOculta ? 'Ocultar' : 'Mostrar'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputSenhaContainer}>
            <View style={styles.inputSenha}>
              <TextInput
                style={styles.inputSenhaTexto}
                value={senhaNovamente}
                onChangeText={setSenhaNovamente}
                placeholder="Digite sua senha novamente"
                secureTextEntry={senhaOcultaNovamente}
                editable={editavel}
              />
              <TouchableOpacity
                style={styles.btnOcultarSenha}
                onPress={toggleSenhaOcultaNovamente}
              >
                <Text style={styles.btnOcultarSenhaTexto}>
                  {toggleSenhaOcultaNovamente ? 'Ocultar' : 'Mostrar'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.btnEntrar} onPress={handleSubmit}>
            <Text style={styles.btnEntrarTexto}>Cadastrar</Text>
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