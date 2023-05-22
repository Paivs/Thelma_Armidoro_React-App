import * as React from 'react';
import { View, Text, ScrollView, ImageBackground, StyleSheet } from 'react-native';
import { styles } from "./styles.js"
import Menus from "./components/Menus/index.js"
import Emocoes from "./components/Emocoes/index.js"
import RectangleLembrete from "./components/RectangleLembrete/index.js"

export default function Home({ navigation }) {

  const imageUrl = 'https://storage.alboom.ninja/sites/1071/albuns/844197/00019.jpg'; // Substitua pela URL real da imagem
  const phoneNumber = '5511980697346'; // Substitua pelo número de telefone desejado

  return (
    <ImageBackground
      source={require('../../../assets/fundo2.png')}
      style={styles.background}
    >

      <ScrollView>
        <Text style={styles.title}>Menu</Text>
        <ScrollView style={styles.menus} horizontal showsHorizontalScrollIndicator={false}>
          <Menus title={"Consultas"} icon={"comments"} />
          <Menus title={"Diário de Emoções"} icon={"heart"} />
          <Menus title={"Diário dos Sonhos"} icon={"book"} />
          <Menus title={"Lembretes"} icon={"bell"} />
          <Menus title={"Minha Conta"} icon={"cog"} />
        </ScrollView>

        <Text style={styles.title}>Emoções</Text>
        <ScrollView style={styles.menus} horizontal showsHorizontalScrollIndicator={false}>
          <Emocoes title={"É difícil"} text={"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo."} />
          <Emocoes title={"Hoje foi legal"} text={"Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."} />
          <Emocoes title={"Tenho medo"} text={"Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."} />
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