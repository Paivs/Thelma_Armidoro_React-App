import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, ScrollView } from 'react-native';
import { RectangleLembrete } from "./components/RectangleLembrete/index.js"
import styles from "./styles.js"

import { getPacienteData } from "../../services/saveData.js"

export default function Lembretes() {
  const [nome, setNome] = useState('');

  const getUsername = async () => {
    try {
      const storedUsername = await getPacienteData();
      if (storedUsername !== null) {
        setNome(storedUsername.nome);
      }
    } catch (error) {
      console.log('Erro ao buscar o nome do usuário:', error);
    }
  };

  const [dia, setDia] = useState('');
  const getDate = async () => {

    const currentDate = new Date();

    // Obter o dia da semana em português
    const diasSemana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    const diaSemanaAtual = diasSemana[currentDate.getDay()];
    
    // Obter o dia do mês com dois dígitos
    const diaAtual = currentDate.getDate().toString().padStart(2, '0');
    
    // Obter o nome do mês em português
    const mesesAno = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const mesAtual = mesesAno[currentDate.getMonth()];
    
    // Formatar a data completa
    const dataFormatada = `${diaSemanaAtual}, ${diaAtual} de ${mesAtual}`;

    setDia(dataFormatada)
  };

  useEffect(() => {
    getUsername();
    getDate();
  }, []);

  return (
    <ImageBackground
      source={require('../../../assets/fundo2.png')}
      style={styles.background}
    >

      <View style={styles.container}>
        <Text style={styles.title}>Lembretes</Text>
        <View style={styles.line} />

        <View style={styles.conChamada}>
          <Text style={styles.chamada}>Não se esqueça de nada!</Text>
          <Text style={styles.chamada}>Faça suas anotações</Text>
        </View>
      </View>

      <View style={styles.conData}>
        <Text style={styles.data}>{dia}</Text>
      </View>

      <ScrollView>

      <RectangleLembrete title="Parabéns" text="Hoje é seu aniversário. Tenha um ótimo dia!!!" page="01" />
      <RectangleLembrete title="Consulta!" text="A hora da sua consulta chegou, venha ter seu atendimento!!!" page="02" />
      <RectangleLembrete title="Diário dos sonhos" text="Você ainda não preencheu sue diário hoje." page="03" />
      <RectangleLembrete title="Diário de Emoçoes" text="Seu diário de emoções ainda não está salvo!" page="04" />

      </ScrollView>

    </ImageBackground>
  );
}