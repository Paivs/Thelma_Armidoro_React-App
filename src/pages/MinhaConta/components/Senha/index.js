import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { alterarSenha } from '../../../../services/api.js';

export default function Senha({ navigation }) {
  const [expanded, setExpanded] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const handleIconPress = () => {
    setExpanded(!expanded);
  };

  const handleChangePassword = async () => {
    // Logic to change the password here
    console.log('Current password:', currentPassword);
    console.log('New password:', newPassword);
    console.log('Confirm new password:', confirmNewPassword);

    const foi = await alterarSenha(currentPassword, newPassword);

    console.log('foifoifoifoifoifoi');
    console.log(foi);

    if (foi) {
      navigation.navigate('Login');
    }
  };

  const toggleShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleShowConfirmNewPassword = () => {
    setShowConfirmNewPassword(!showConfirmNewPassword);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <FontAwesome name="lock" size={24} color="#282A3A" style={styles.icon} />
          <Text style={styles.text}>Senha</Text>
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
        <Text style={styles.label}>Senha atual</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholder="Digite a senha atual"
            secureTextEntry={!showCurrentPassword}
          />
          <TouchableOpacity style={styles.passwordVisibilityIcon} onPress={toggleShowCurrentPassword}>
            <FontAwesome
              name={showCurrentPassword ? 'eye' : 'eye-slash'}
              size={20}
              color="#282A3A"
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.label}>Nova senha</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="Digite a nova senha"
            secureTextEntry={!showNewPassword}
          />
          <TouchableOpacity style={styles.passwordVisibilityIcon} onPress={toggleShowNewPassword}>
            <FontAwesome
              name={showNewPassword ? 'eye' : 'eye-slash'}
              size={20}
              color="#282A3A"
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.label}>Confirmar nova senha</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            value={confirmNewPassword}
            onChangeText={setConfirmNewPassword}
            placeholder="Confirme a nova senha"
            secureTextEntry={!showConfirmNewPassword}
          />
          <TouchableOpacity
            style={styles.passwordVisibilityIcon}
            onPress={toggleShowConfirmNewPassword}
          >
            <FontAwesome
              name={showConfirmNewPassword ? 'eye' : 'eye-slash'}
              size={20}
              color="#282A3A"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
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
    borderColor: '#282A3A',
    padding: 10,
    paddingTop: 15,
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 15,
    justifyContent: 'center',
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
    flex: 1,
    paddingRight: 30, // Espaço para o ícone à direita
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Alinha ao centro horizontalmente
  },
  passwordVisibilityIcon: {
    position: 'absolute',
    right: 10, // Alinha à direita
    justifyContent: "center",
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
