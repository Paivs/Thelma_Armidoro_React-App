import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ImageBackground, StyleSheet, FlatList } from 'react-native';
import { styles } from "./styles.js"
import Menus from "./components/Menus/index.js"
import Emocoes from "./components/Emocoes/index.js"
import RectangleLembrete from "./components/RectangleLembrete/index.js"

import { getPacienteData, getPacienteId } from "../../services/saveData.js"
import { listarDiarios } from "../../services/api.js"

export default function Home({ navigation }) {

  const imageUrl = 'https://storage.alboom.ninja/sites/1071/albuns/844197/00019.jpg'; // Substitua pela URL real da imagem
  const phoneNumber = '5511980697346'; // Substitua pelo número de telefone desejado

  const [diariosEmocoes, setDiariosEmocoes] = useState([]);
  const [diariosSonhos, setDiariosSonhos] = useState([]);

  const pegaLa = async () => {
    console.log("credenciais")
    const credenciais = await getPacienteData()
    console.log(credenciais)

    const id = await getPacienteId()
    console.log(id)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const diariosSonhosData = await listarDiarios("sonhos");
        const diariosEmocoesData = await listarDiarios("emocoes");
        setDiariosEmocoes(diariosEmocoesData);
        setDiariosSonhos(diariosSonhosData);
      } catch (error) {
        console.error("Error fetching diarios:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ImageBackground
      source={require('../../../assets/fundo2.png')}
      style={styles.background}
    >

      <ScrollView>
        <Text style={styles.title}>Menu</Text>
        <ScrollView style={styles.menus} horizontal showsHorizontalScrollIndicator={false}>
          <Menus title={"Consulta"} icon={"comments"} />
          <Menus title={"Diário de Emoções"} icon={"heart"} />
          <Menus title={"Diário dos Sonhos"} icon={"book"} />
          <Menus title={"Lembretes"} icon={"bell"} />
          <Menus title={"Minha Conta"} icon={"cog"} />
        </ScrollView>

        <Text style={styles.title}>Emoções</Text>
        <ScrollView style={styles.menus} horizontal showsHorizontalScrollIndicator={false}>
        <FlatList
            data={diariosEmocoes}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <Emocoes title={item.titulo} text={item.texto} />
            )}
          />
        </ScrollView>

        <Text style={styles.title}>Sonhos</Text>
        <ScrollView style={styles.menus} horizontal showsHorizontalScrollIndicator={false}>
        <FlatList
            data={diariosSonhos}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <Emocoes title={item.titulo} text={item.texto} />
            )}
          />
        </ScrollView>


        <Text style={styles.title}>Lembretes</Text>
        <ScrollView style={styles.menus} horizontal showsHorizontalScrollIndicator={false}>
          <RectangleLembrete title="Parabéns" text="Hoje é seu aniversário. Tenha um ótimo dia!!!" page="01" />
          <RectangleLembrete title="Consulta!" text="A hora da sua consulta chegou, venha ter seu atendimento!!!" page="02" />
          <RectangleLembrete title="Diário dos sonhos" text="Você ainda não preencheu sue diário hoje." page="03" />
          <RectangleLembrete title="Diário de Emoçoes" text="Seu diário de emoções ainda não está salvo!" page="04" />




        </ScrollView>

      </ScrollView>
    </ImageBackground>
  );
}