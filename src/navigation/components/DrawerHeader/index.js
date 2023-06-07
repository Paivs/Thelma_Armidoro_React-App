import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { getPacienteDataDrawer, getLogado } from "../../../services/saveData.js"

const DrawerHeader = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused(); // Novo hook para verificar se a tela está focada
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [intervalId, setIntervalId] = useState(null);
  const [storedUsername, setStoredUsername] = useState(null);

  const seEstaLogado = async () => {
    const estaLogado = await getLogado();
    return estaLogado;
  }

  const getUsernameAndEmail = async () => {
    try {
      const username = await getPacienteDataDrawer();
      if (!isNaN(username) || !(username == {})) {
        console.log("Informações drawer prontas!")

        console.log(`${username.nome} <> ${nome}`)

        setStoredUsername(username); // Store the username temporarily
      }
    } catch (error) {
      console.log('Erro ao buscar o nome do usuário:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getUsernameAndEmail();
    }, 1000); // Executa a cada 1 segundo (1000 ms)
  
    setIntervalId(interval);
  
    return () => {
      clearInterval(interval); // Clear the interval when the component unmounts
    };
  }, []); // Adicionado isFocused como dependência do useEffect
  
  useEffect(() => {
    if (storedUsername) {
      setNome(storedUsername.nome);
      setEmail(storedUsername.email);
    }
  }, [storedUsername]);
  
  // New useEffect to check if the 'nome' variable changes its value
  useEffect(() => {
    if (nome !== '') {
      clearInterval(intervalId); // Stop the interval execution
    }
  }, [nome]);
  

  return (
    <View style={styles.container}>
      <Image
        style={styles.profileImage}
        source={require("../../../../assets/adaptive-icon-drawer.png")}
      />
      <Text style={styles.profileName}>{nome}</Text>
      <Text style={styles.profileEmail}>{email}</Text>
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: '#F7EFE5',
    padding: 16,
    marginTop: 25,
    marginBottom: -10,
  },
  profileImage: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 8,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    alignSelf: 'center',
  },
};

export default DrawerHeader;
