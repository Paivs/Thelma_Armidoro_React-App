import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ImageBackground, TextInput, StyleSheet } from 'react-native';
import { temConsulta } from "../../services/api.js"
import Perfil from "./components/Contato"
import ButtonHome from "./components/ButtonHome/index.js"

export default function Consultas({ navigation }) {

  // TEM CONSULTA **************************************************
  const [imageUrl, setImageUrl] = useState('https://storage.alboom.ninja/sites/1071/albuns/844197/00019.jpg'); 
  const [phoneNumber, setPhoneNumber] = useState('5511980697346');
  const [mensagem, setMensagem] = useState("")
  const [mensagemReal, setMensagemReal] = useState("")

  const handleMensagem = (item) => {
    const mensagemAtualizada = item.nativeEvent.text.replace(/ /g, '%20');
    setMensagem(item);
    setMensagemReal(mensagemAtualizada)
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

  // TEM CONSULTA **************************************************

  const [consulta, setConsulta] = useState(false);

  const getConsultaLocal = async () => {
    setConsulta(await temConsulta())
  }

  const focusListener = navigation.addListener('focus', () => {
    getConsultaLocal();
  });

  useEffect(() => {
    getConsultaLocal();
  }, []);

  if (!consulta) {
    return (
      <ImageBackground
        source={require('../../../assets/fundo2.png')}
        style={stylesNao.background}
      >
        <View style={stylesNao.container}>
          <View style={stylesNao.header}>
            <Text style={stylesNao.headerText}>Marque sua consulta!</Text>
          </View>

          <Perfil imageUrl={imageUrl} phoneNumber={phoneNumber} />

          <Text style={stylesNao.descriptionTop}>Estamos aqui para tornar o processo de agendamento de suas sessões o mais conveniente e eficiente possível.
          </Text>
          <Text style={stylesNao.description}>
            Com alguns toques na tela, você poderá garantir seu encontro com a psicóloga e cuidar do seu bem-estar mental.
          </Text>

          <ButtonHome />

        </View>
      </ImageBackground>
    )
  } else if (consulta) {
    return (
      <ImageBackground
        source={require('../../../assets/fundo2.png')}
        style={stylesTem.background}
      >
        <View style={stylesTem.container}>
          <View style={stylesTem.header}>
            <Text style={stylesTem.headerText}>Fale com seu psicologo atual</Text>
          </View>

          <Perfil imageUrl={imageUrl} navigation={navigation} />

          <Text style={stylesTem.description}>Este é o momento da sua consulta, assim que estiver pronto pode escrever sua mensagem e mandá-la ao seu(a) psicólogo. Tenha uma ótima consulta, obrigado por confiar em nós...</Text>

          <Text style={stylesTem.label}>Mensagem:</Text>
          <TextInput style={stylesTem.input}
            multiline
            placeholder='Digite sua mensagem'
            value={mensagem}
            onChange={item => handleMensagem(item)}
          ></TextInput>

          <ButtonHome mensagem={mensagemReal} phoneNumber={phoneNumber} />

        </View>

      </ImageBackground>
    )
  }


}
const stylesTem = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    backgroundColor: '#674188',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 175,
  },
  header: {
    marginBottom: 0,
    marginTop: 20,
    alignItems: 'center',
  },
  botaoDireita: {
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#282A3A",
    zIndex: 9999,
  },
  botaoDireitaText: {
    margin: 5,
    marginRight: 10,
    marginLeft: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  label: {
    margin: 20,
    marginBottom: 5,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "justify",
    fontWeight: "bold",
    width: "75%",
  },
  input: {
    margin: 20,
    marginBottom: 0,
    marginTop: 0,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "justify",
    fontWeight: "bold",
    width: "75%",
    borderRadius: 15,
    color: "black",
    borderWidth: 3,
    paddingHorizontal: 10,
    borderColor: "#282A3A",
    height: 50,
    backgroundColor: "#F7EFE5",
  },

  subHeaderText: {
    fontSize: 16,
    color: 'gray',
  },
  map: {
    width: '90%',
    height: 200,
    textAlign: "center"
  },
  description: {
    margin: 20,
    marginBottom: 0,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "justify",
    width: "75%",
  },
});

const stylesNao = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    backgroundColor: '#674188',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 175,
  },
  header: {
    marginBottom: 0,
    marginTop: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subHeaderText: {
    fontSize: 16,
    color: 'gray',
  },
  map: {
    width: '90%',
    height: 200,
    textAlign: "center"
  },
  description: {
    margin: 20,
    marginBottom: 0,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "justify",
    width: "75%",
  },
  descriptionTop: {
    margin: 20,
    marginBottom: -15,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "justify",
    width: "75%",
  },
});