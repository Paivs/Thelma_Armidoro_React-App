import * as React from 'react';
import { View, Text, ScrollView, ImageBackground } from 'react-native';
import { styles } from "./styles.js"
import Perfil from "../../components/Contato"
import ButtonHome from "./components/ButtonHome/index.js"


export default function Home({ navigation }) {

  const imageUrl = 'https://storage.alboom.ninja/sites/1071/albuns/844197/00019.jpg'; // Substitua pela URL real da imagem
  const phoneNumber = '5511980697346'; // Substitua pelo número de telefone desejado

  return (
    <ImageBackground
    source={require('../../../assets/fundo2.png')}
    style={styles.background}
  >


    </ImageBackground>
  );
}
