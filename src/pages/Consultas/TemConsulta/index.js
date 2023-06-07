import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ImageBackground, TextInput } from 'react-native';
import { styles } from "./styles.js"
import Perfil from "../../../components/Contato"
import ButtonHome from "./components/ButtonHome/index.js"
import { tempoConsulta } from "../../../services/api.js"


export default function TemConsulta({ navigation }) {

  const [imageUrl, setImageUrl] = useState('https://storage.alboom.ninja/sites/1071/albuns/844197/00019.jpg'); // Substitua pela URL real da imagem
  const [phoneNumber, setPhoneNumber] = useState('5511980697346'); // Substitua pelo número de telefone desejado
  const [mensagem, setMensagem] = useState("")
  const [mensagemReal, setMensagemReal] = useState("")

  const handleMensagem = (item) => {
    const mensagemAtualizada = item.nativeEvent.text.replace(/ /g, '%20');
    setMensagem(item);
    setMensagemReal(mensagemAtualizada)
  }

  const marcar = () => {

  }


  const header = () => {
    navigation.setOptions({
      headerRight: () => {
        return <>
          <TouchableOpacity onPress={marcar} style={styles.botaoDireita}>
            <Text style={styles.botaoDireitaText}>Marcar Consulta</Text>
          </TouchableOpacity>
        </>
      }});
  }

  useEffect(() => {
    header();
  }, []);


  return (
    <ImageBackground
      source={require('../../../../assets/fundo2.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Fale com seu psicologo atual</Text>
        </View>

        <Perfil imageUrl={imageUrl} navigation={navigation}/>

        <Text style={styles.description}>Este é o momento da sua consulta, assim que estiver pronto pode escrever sua mensagem e mandá-la ao seu(a) psicólogo. Tenha uma ótima consulta, obrigado por confiar em nós...</Text>

        <Text style={styles.label}>Mensagem:</Text>
        <TextInput style={styles.input}
          multiline
          placeholder='Digite sua mensagem'
          value={mensagem}
          onChange={item => handleMensagem(item)}
        ></TextInput>

        <ButtonHome mensagem={mensagemReal} phoneNumber={phoneNumber} />

      </View>

    </ImageBackground>
  );
}
