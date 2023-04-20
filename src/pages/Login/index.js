import React, { useState, useEffect  } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Image, Alert } from 'react-native';
import { login } from "../../../src/services/api"
import { getCredentials, isUserLoggedFor24Hours, hasExpiredLogin } from "../../../src/services/saveData"
import { useNavigation } from '@react-navigation/native';


const handleLogin = async () => { const token = await login(username, password) };

const handleCadastrar = async () => {
  console.log("foi1")
  navigation.navigate('Cadastro');
  console.log("foi2")
};


const handleEsqueciSenha = async () => {
  ;//tem que fazer
};

export function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>

            <Text style={styles.logo}>Bem vindo!</Text>
            <Text style={styles.subtext}>Faça login para continuar</Text>

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
                    placeholder="Digite sua senha"
                    placeholderTextColor="#aaaaaa"
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry={true} />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonTitle}>Entrar</Text>
            </TouchableOpacity>

            <View style={styles.bottomContainer}>
                <View style={styles.bottomLinks}>

                    <TouchableOpacity onPress={handleCadastrar}>
                        <Text style={styles.link}>Cadastrar-se</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleEsqueciSenha}>
                        <Text style={styles.link}>Esqueci a senha</Text>
                    </TouchableOpacity>

                </View>
            </View>

        </View>
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
  
  