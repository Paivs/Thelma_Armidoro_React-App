import React, { useState, useContext } from 'react';
import { View, useWindowDimensions, StyleSheet, TextInput, Text, TouchableOpacity, Keyboard } from 'react-native';
import { PinPopup } from "../PIN/index.js"
import { validarPin, esqueciMinhaSenha } from "../../../../services/api.js"
import { DataStateContextEsqueciMinhaSenha } from "../DataCenter/index.js"


export const RectangleEmail = ({ troca, navigation }) => {
  const windowHeight = useWindowDimensions().height;
  const heightRectangle = windowHeight * 0.65;

  const { email, setEmail, pin, setPin } = useContext(DataStateContextEsqueciMinhaSenha)

  const [editavel, setEditavel] = useState(true)
  const [pinpopup, setPinPopup] = useState(false)

  const handleEnvio = async (newPin) => {
    if (pin !== null) {
      setPin(newPin);
    }

    const foi = await validarPin(email, newPin)
    Keyboard.dismiss()

    if (foi) {
      setPinPopup(false)
      console.log("VAMO QUE VAMO CARAIO")
      troca()
      // navigation.navigate('LoginCadastro');
    }

    setEditavel(false)

  }

  const handleSubmit = async () => {
    const foi = esqueciMinhaSenha(email)
    setPinPopup(true)
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
          close={handleEnvio} />

        <TouchableOpacity style={styles.btnEntrar} onPress={handleSubmit}>
          <Text style={styles.btnEntrarTexto}>Enviar</Text>
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