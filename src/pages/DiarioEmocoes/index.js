import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { Rectangle } from "./components/Rectangle/index.js"
import styles from "./styles.js"
import NotificationService from "../../services/NotificationService.js"

import { getPacienteData } from "../../services/saveData.js"

export default function DiarioEmocoes() {
  const [nome, setNome] = useState('');
  const [dia, setDia] = useState('');
  const [diaAnterior, setDiaAnterior] = useState('');

  const handleNotification = async () => {
    console.log("chegou")
    NotificationService.scheduleNotification('Título da notificação', 'Corpo da notificação', 5);
    console.log("passou")
  };

  const getUsername = async () => {
    console.log('CHAMA');
    try {
      const storedUsername = await getPacienteData();
      if (storedUsername !== null) {
        setNome(storedUsername.nome);
      }
    } catch (error) {
      console.log('Erro ao buscar o nome do usuário:', error);
    }
  };

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

    setDiaAnterior(diaAtual - 1)
    setDia(dataFormatada)
  };

  useEffect(() => {
    getUsername();
    getDate();
    handleNotification();
  }, []);

  return (
    <ImageBackground
      source={require('../../../assets/fundo2.png')}
      style={styles.background}
    >

      <View style={styles.container}>
        <Text style={styles.title}>Diário de Emoções</Text>
        <View style={styles.line} />

        <View style={styles.conChamada}>
          <Text style={styles.chamada}>Olá {nome}!</Text>
          <Text style={styles.chamada}>Como está se sentindo hoje?</Text>
        </View>
      </View>

      <View style={styles.conData}>
      <TouchableOpacity>
          <Text style={styles.dataAnterior}>{diaAnterior} ... </Text>
        </TouchableOpacity>
        <Text style={styles.dataAtual}>{dia}</Text>
      </View>

      <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
        <Rectangle />
      </KeyboardAvoidingView>

    </ImageBackground>
  );
}