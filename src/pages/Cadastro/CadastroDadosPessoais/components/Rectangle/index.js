import React, { useState, useContext } from 'react';
import { View, useWindowDimensions, StyleSheet, TextInput, Text, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import DateInput from "../../../../../components/DateInput/index.js"
import { TextInputMask } from 'react-native-masked-text';
import EstadoCivil from "../EstadoCivil/index.js"
import { getCredentials } from "../../../../../services/saveData.js"
import {DataStateContext} from "../../../components/DataCenter/index.js"

export const Rectangle = ({ navigation }) => {
  const windowHeight = useWindowDimensions().height;
  const heightRectangle = windowHeight * 0.65;

  const { nome, setNome, email, setEmail, cpf, setCpf, nascimento, setNascimento, estadoCivil, setEstadoCivil, nacionalidade, setNacionalidade } = useContext(DataStateContext);
  const { telefone, setTelefone, telefoneFixo, setTelefoneFixo } = useContext(DataStateContext)

  const handleDateChange = (date) => {
    const dateString = date;
    const dateParts = dateString.split("/");

    // Formato: YYYY-MM-DDTHH:mm:ss.sssZ
    const formattedDate = `${dateParts[0]}-${dateParts[1]}-${dateParts[2]}T23:07:54.913Z`;


    setNascimento(formattedDate);
  };

  const handleEnvio = async () => {

  }

  const handleSubmit = async () => {

    const username = await getCredentials()

    setEmail(username.username)

    navigation.navigate('Dados Profissao');
  };



  return (
    <View style={[styles.rectangle, { height: heightRectangle }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Nome e sobrenome:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome completo"
            onChangeText={(text) => setNome(text)}
            value={nome}
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Data de nascimento:</Text>
          <DateInput onChange={handleDateChange} value={nascimento} />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>CPF:</Text>
          <TextInputMask
            style={styles.input}
            type={'cpf'}
            value={cpf}
            onChangeText={text => setCpf(text)}
            placeholder="Digite seu cpf"
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Nacionalidade:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua naturalidade"
            onChangeText={(text) => setNacionalidade(text)}
            value={nacionalidade}
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Estado civil:</Text>
          <EstadoCivil 
            onStatusChange={(text) => setEstadoCivil(text)}
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Celular:</Text>
          <TextInputMask
            style={styles.input}
            type={'custom'}
            value={telefone}
            onChangeText={text => setTelefone(text)}
            placeholder="Digite seu celular"
            options={{
              mask: "+99 (99) 999999999"
            }}
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Telefone fixo:</Text>
          <TextInputMask
            style={styles.input}
            type={'custom'}
            value={telefoneFixo}
            onChangeText={text => setTelefoneFixo(text)}
            placeholder="Digite o telefone fixo"
            options={{
              mask: "+99 (99) 99999999"
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