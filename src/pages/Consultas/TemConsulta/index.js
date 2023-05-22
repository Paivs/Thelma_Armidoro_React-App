import * as React from 'react';
import { View, Text, ScrollView, ImageBackground } from 'react-native';
import { styles } from "./styles.js"
import Perfil from "../../../components/Contato"
import ButtonHome from "./components/ButtonHome/index.js"


export default function Home({ navigation }) {

  const imageUrl = 'https://storage.alboom.ninja/sites/1071/albuns/844197/00019.jpg'; // Substitua pela URL real da imagem
  const phoneNumber = '5511980697346'; // Substitua pelo número de telefone desejado

  return (
    <ImageBackground
    source={require('../../../../assets/fundo2.png')}
    style={styles.background}
  >
    <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Fale com seu psicologo atual</Text>
        </View>

        <Perfil imageUrl={imageUrl} phoneNumber={phoneNumber} />

          <Text style={styles.description}>Lorem ipsum dolor sit amet. Ut voluptate enim et omnis praesentium in numquam minima qui maiores aspernatur id maxime eveniet aut aliquama. </Text>

        <ButtonHome/>

    </View>

    </ImageBackground>
  );
}
