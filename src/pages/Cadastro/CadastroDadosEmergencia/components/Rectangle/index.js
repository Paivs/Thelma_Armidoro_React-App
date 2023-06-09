import React, { useState, useContext } from 'react';
import { View, useWindowDimensions, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { TextInputMask } from 'react-native-masked-text';
import { cadastrarPaciente } from "../../../../../services/api.js"
import { getCredentials } from "../../../../../services/saveData.js"
import { DataStateContext } from "../../../components/DataCenter/index.js"

export const Rectangle = ({ navigation }) => {
  const windowHeight = useWindowDimensions().height;
  const heightRectangle = windowHeight * 0.65;

  const { contatoEmergencia, setContatoEmergencia } = useContext(DataStateContext);
  
  const {
    nome,
    email,
    telefone,
    telefoneFixo,
    cpf,
    nascimento,
    estadoCivil,
    curso,
    profissao,
    cargo,
    nacionalidade,
    endereco,
    } = useContext(DataStateContext);

  const handleDateChange = (date) => {
    setNascimento(date);
  };

  const handleEnvio = async () => {

  }

  const handleSubmit = async () => {
    

    const data = {
      "nome": nome,
      "email": email,
      "telefone": telefone,
      "telefone_fixo": telefoneFixo,
      "cpf": cpf,
      "nascimento": nascimento,
      "estado_civil": estadoCivil,
      "curso": curso,
      "profissao": profissao,
      "cargo": cargo,
      "nacionalidade": nacionalidade,
      "endereco": {
        "logradouro": endereco.logradouro,
        "bairro": endereco.bairro,
        "cep": endereco.cep,
        "cidade": endereco.cidade,
        "uf": endereco.uf,
        "complemento": endereco.complemento,
        "numero": endereco.numero
      },
      "contatoEmergencia": {
        "contato_nome": contatoEmergencia.contato_nome,
        "contato_vinculo": contatoEmergencia.contato_vinculo,
        "contato_telefone": contatoEmergencia.contato_telefone
      }
    }

    const getToken = await getCredentials()

    

    const foi = await cadastrarPaciente(getToken.token, data)

    if(foi){
      console.log("------------- Enviado paciente:")
      console.log(data)
      navigation.navigate('Home');
    }else{
      console.log("------------- não foi")
    }
    
  };

  const handleInputChange = (field, value) => {
    setContatoEmergencia((prevContatoEmergencia) => ({
      ...prevContatoEmergencia,
      [field]: value,
    }));
  };


  return (
    <View style={[styles.rectangle, { height: heightRectangle }]}>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Nome do contato:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o nome completo do contato"
            onChangeText={(value) => handleInputChange('contato_nome', value)}
            value={contatoEmergencia.contato_nome}
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Vínculo do contato com você:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o vínculo do contato com você"
            onChangeText={(value) => handleInputChange('contato_vinculo', value)}
            value={contatoEmergencia.contato_vinculo}
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Celular do contato:</Text>
          <TextInputMask
            style={styles.input}
            type={'custom'}
            value={contatoEmergencia.contato_telefone}
            onChangeText={(value) => handleInputChange('contato_telefone', value)}
            placeholder="Digite o celular do contato"
            options={{
              mask: "+99 (99) 999999999"
            }}
          />
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