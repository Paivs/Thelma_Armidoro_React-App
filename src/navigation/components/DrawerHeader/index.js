import React, {useState, useEffect} from 'react';
import { View, Text, Image } from 'react-native';
import { getPacienteData } from "../../../services/saveData.js"

const DrawerHeader = () => {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  const getUsernameAndEmail = async () => {
    console.log('CHAMA');
    try {
      const storedUsername = await getPacienteData();
      if (storedUsername !== null) {
        setNome(storedUsername.nome);
        setEmail(storedUsername.email);
      }
    } catch (error) {
      console.log('Erro ao buscar o nome do usuário:', error);
    }
  };
  useEffect(() => {
    getUsernameAndEmail();
  }, []);

  return (
    <View style={styles.container}>
      { <Image
        style={styles.profileImage}
        source={require("../../../../assets/adaptive-icon-drawer.png")}
      /> }
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
