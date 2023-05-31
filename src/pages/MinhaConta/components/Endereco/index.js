import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import {alterarEndereco} from "../../../../services/api.js"

export default function Endereco() {
  const [expanded, setExpanded] = useState(false);
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [bairro, setBairro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');

  const handleIconPress = () => {
    setExpanded(!expanded);
  };

  const handleChangeEndereco = async () => {
    // Lógica para alterar a senha aqui

    const endereco = {
      "logradouro": logradouro,
      "bairro": bairro,
      "cep": cep,
      "cidade": cidade,
      "uf": uf,
      "complemento": complemento,
      "numero": numero,
    }

    await alterarEndereco(endereco)
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Icon name="home" size={24} color="#282A3A" style={styles.icon} />
          <Text style={styles.text}>Endereço</Text>
        </View>
        <Ionicons
          name={expanded ? 'ios-arrow-up' : 'ios-arrow-down'}
          size={24}
          color="#282A3A"
          style={styles.icon}
          onPress={handleIconPress}
        />
      </View>
      <Animatable.View
        style={[styles.fieldsContainer, { height: expanded ? 'auto' : 0 }]}
        animation={expanded ? 'fadeIn' : 'fadeOut'}
        duration={450}
      >
        <Text style={styles.label}>CEP</Text>
        <TextInput
          style={styles.input}
          value={cep}
          onChangeText={setCep}
          placeholder="Digite o novo CEP"
        />

        <Text style={styles.label}>Logradouro</Text>
        <TextInput
          style={styles.input}
          value={logradouro}
          onChangeText={setLogradouro}
          placeholder="Digite o novo logradouro"
        />

        <Text style={styles.label}>Bairro</Text>
        <TextInput
          style={styles.input}
          value={bairro}
          onChangeText={setBairro}
          placeholder="Digite o novo bairro"
        />

        <Text style={styles.label}>Número</Text>
        <TextInput
          style={styles.input}
          value={numero}
          onChangeText={setNumero}
          placeholder="Digite o novo número"
        />

        <Text style={styles.label}>Complemento</Text>
        <TextInput
          style={styles.input}
          value={complemento}
          onChangeText={setComplemento}
          placeholder="Digite o complemento"
        />

        <Text style={styles.label}>Cidade</Text>
        <TextInput
          style={styles.input}
          value={cidade}
          onChangeText={setCidade}
          placeholder="Digite a nova cidade"
        />

        <Text style={styles.label}>UF</Text>
        <TextInput
          style={styles.input}
          value={uf}
          onChangeText={setUf}
          placeholder="Digite o novo UF"
        />

        <TouchableOpacity style={styles.button} onPress={handleChangeEndereco}>
          <Text style={styles.buttonText}>Alterar</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7EFE5',
    borderRadius: 20,
    borderWidth: 10,
    paddingTop: 15,
    borderColor: '#282A3A',
    padding: 10,
    marginHorizontal: 15,
    marginTop: 0,
    marginBottom: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
  },
  text: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#282A3A',
    marginLeft: 10,
  },
  fieldsContainer: {
    overflow: 'hidden',
    marginTop: 10,
  },
  label: {
    color: '#282A3A',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#282A3A',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
