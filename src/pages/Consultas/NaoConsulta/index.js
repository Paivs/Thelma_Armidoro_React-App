import * as React from 'react';
import { View, Text, ScrollView, ImageBackground } from 'react-native';
import { styles } from "./styles.js"
import Perfil from "./components/Contato"
import ButtonHome from "./components/ButtonHome/index.js"
import { useNavigation } from '@react-navigation/native';


export default function NaoConsulta({ navigation, marcado }) {

  const imageUrl = 'https://storage.alboom.ninja/sites/1071/albuns/844197/00019.jpg'; // Substitua pela URL real da imagem
  const phoneNumber = '5511980697346'; // Substitua pelo número de telefone desejado

  return (
    <ImageBackground
    source={require('../../../../assets/fundo2.png')}
    style={styles.background}
  >
    <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Marque sua consulta!</Text>
        </View>

        <Perfil imageUrl={imageUrl} phoneNumber={phoneNumber} />

          <Text style={styles.descriptionTop}>Estamos aqui para tornar o processo de agendamento de suas sessões o mais conveniente e eficiente possível.
          </Text>
          <Text style={styles.description}>
          Com alguns toques na tela, você poderá garantir seu encontro com a psicóloga e cuidar do seu bem-estar mental.
          </Text>

        <ButtonHome marcado={marcado}/>

    </View>

    </ImageBackground>
  );
}
