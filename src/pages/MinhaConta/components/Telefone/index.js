import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

export default function Senha() {
  const [expanded, setExpanded] = useState(false);
  const [telefone, setTelefone] = useState('');
  const [telefoneFixo, setTelefoneFixo] = useState('');

  const handleIconPress = () => {
    setExpanded(!expanded);
  };

  const handleChangePassword = () => {
    // Logic to change the password here
    console.log('Current password:', currentPassword);
    console.log('New password:', newPassword);
    console.log('Confirm new password:', confirmNewPassword);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <FontAwesome name="lock" size={24} color="#282A3A" style={styles.icon} />
          <Text style={styles.text}>Telefone</Text>
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
        <View style={styles.conAtual}>
          <View style={styles.valoresAtuais}>
            <Text style={styles.atual}>Telefone: </Text>
            <Text style={styles.atual}>+55 11 980697346</Text>
          </View>
          <View style={styles.valoresAtuais}>
            <Text style={styles.atual}>Telefone fixo: </Text>
            <Text style={styles.atual}>+55 11 23259953</Text>
          </View>
        </View>

        <Text style={styles.label}>Telefone novo</Text>
        <TextInput
          style={styles.input}
          value={telefone}
          onChangeText={setTelefone}
          placeholder="Digite o novo telefone atual"
          secureTextEntry
        />

        <Text style={styles.label}>Telefone fixo novo</Text>
        <TextInput
          style={styles.input}
          value={telefoneFixo}
          onChangeText={setTelefoneFixo}
          placeholder="Digite o novo telefone fixo"
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>Alterar</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F7EFE5",
    borderRadius: 20,
    borderWidth: 15,
    borderColor: '#282A3A',
    padding: 10,
    marginHorizontal: 15,
    marginTop: 0,
    marginBottom: 15,
  },
  conAtual: {
    marginBottom: 10,
  },
  valoresAtuais: {
    flexDirection: "row",
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
  atual: {
    color: '#282A3A',
    fontSize: 20,
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
