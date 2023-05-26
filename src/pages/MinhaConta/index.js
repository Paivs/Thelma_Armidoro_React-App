import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground } from 'react-native';

export default function MinhaConta() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState({
    logradouro: 'Rua Itaipava',
    bairro: 'Parque Jaçatuba',
    cep: '09290510',
    numero: '468',
    complemento: 'Casa 2',
    cidade: 'Santo André',
    uf: 'SP'
  });

  const handleNameChange = (text) => {
    setName(text);
  };

  const handlePhoneChange = (text) => {
    setPhone(text);
  };

  const handleAddressChange = (field, text) => {
    setAddress((prevAddress) => ({
      ...prevAddress,
      [field]: text
    }));
  };

  const handleSave = () => {
    // Aqui você pode implementar a lógica para salvar os dados no banco de dados ou em algum serviço de backend
    console.log('Dados salvos:', {
      name,
      phone,
      address
    });
  };

  return (
    <ImageBackground
    source={require('../../../assets/fundo1.png')}
    style={styles.background}
  >
    <View style={styles.container}>
      <Text style={styles.title}>Minha Conta</Text>
      <View style={styles.separator} />
      <Text>Nome:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={handleNameChange}
      />
      <Text>Telefone:</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={handlePhoneChange}
      />

      <Text>Logradouro:</Text>
      <TextInput
        style={styles.input}
        value={address.logradouro}
        onChangeText={(text) => handleAddressChange('logradouro', text)}
      />

      <Text>Número:</Text>
      <TextInput
        style={styles.input}
        value={address.logradouro}
        onChangeText={(text) => handleAddressChange('logradouro', text)}
      />

      <Text>Bairro:</Text>
      <TextInput
        style={styles.input}
        value={address.logradouro}
        onChangeText={(text) => handleAddressChange('logradouro', text)}
      />

      <Text>Complemento:</Text>
      <TextInput
        style={styles.input}
        value={address.logradouro}
        onChangeText={(text) => handleAddressChange('logradouro', text)}
      />

      <Text>CEP:</Text>
      <TextInput
        style={styles.input}
        value={address.logradouro}
        onChangeText={(text) => handleAddressChange('logradouro', text)}
      />

      <Text>Cidade:</Text>
      <TextInput
        style={styles.input}
        value={address.logradouro}
        onChangeText={(text) => handleAddressChange('logradouro', text)}
      />

      <Text>UF:</Text>
      <TextInput
        style={styles.input}
        value={address.logradouro}
        onChangeText={(text) => handleAddressChange('logradouro', text)}
      />

      <Button title="Salvar" onPress={handleSave} />
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    backgroundColor: '#674188',
  },
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 10
  },
  separator: {
    height: 2,
    backgroundColor: 'black',
    marginVertical: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10
  }
});
