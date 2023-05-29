import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  Platform,
  ScrollView,
  Keyboard
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Perfil from './components/Perfil/index.js';
import Senha from './components/Senha/index.js';
import Endereco from './components/Endereco/index.js';
import Telefone from './components/Telefone/index.js';

export default function MinhaConta({ navigation }) {
  const isFocused = useIsFocused();
  const [keyboardActive, setKeyboardActive] = useState(false); // Track keyboard visibility

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

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardActive(true);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardActive(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    if (isFocused) {
      navigation.setOptions({
        headerStyle: {
          backgroundColor: '#282A3A', // Defina a cor desejada aqui
          elevation: 0, // Remover sombra do cabeçalho
        },
        headerLeft: () => <CustomDrawerButton />,
      });
    }
  }, [isFocused]);

  const CustomDrawerContent = (props) => {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <DrawerHeader />
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      </SafeAreaView>
    );
  };

  const CustomDrawerButton = () => {
    const handlePress = () => {
      navigation.toggleDrawer(); // Abre o menu lateral
    };

    return (
      <TouchableOpacity onPress={handlePress} style={{ marginLeft: 15 }}>
        <Image
          source={require('../../../assets/btnNavegacaoBranco.png')}
          style={{ width: 35, height: 35 }} // Tamanho do ícone
        />
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground source={require('../../../assets/fundoMinhaConta.png')} style={styles.background}>
      {!keyboardActive && ( // Conditionally render rectangleTop if keyboard is not active
        <View style={styles.rectangleTop}>
          <Text style={styles.title}>Minha Conta</Text>
          <Perfil />
        </View>
      )}

      <ScrollView>
        <View style={styles.content}>

          <View style={styles.senhaContainer}>
            <Senha />
          </View>

          <View style={styles.senhaContainer}>
            <Endereco />
          </View>

          <View style={styles.senhaContainer}>
            <Telefone />
          </View>

        </View>

        <View style={styles.horizontalLine} />
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    backgroundColor: '#674188'
  },
  rectangleTop: {
    backgroundColor: '#282A3A',
    height: '20%',
    width: '100%',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    marginTop: -1,
    marginBottom: 0,
    zIndex: 1
  },
  content: {
    flex: 1,
    marginTop: '5%',
    paddingHorizontal: 5
  },
  horizontalLine: {
    width: '50%',
    height: 2,
    backgroundColor: 'black',
    alignSelf: 'center',
    marginBottom: '10%',
    marginTop: "10%",
  },
  title: {
    fontSize: 28,
    textAlign: 'left',
    marginTop: 5,
    marginBottom: 0,
    marginHorizontal: 20,
    fontWeight: 'bold',
    color: 'white'
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
  },
  senhaContainer: {
    marginBottom: 10
  }
});
