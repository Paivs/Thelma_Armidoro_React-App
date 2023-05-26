import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ImageBackground, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import Rectangle from "./components/Rectangle/index.js"
import styles from "./styles.js"
import NotificationService from "../../services/NotificationService.js"
import { getPacienteData } from "../../services/saveData.js"


const mesesAno = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

export default function DiarioEmocoes({ navigation }) {
  const [nome, setNome] = useState('');
  const [dia, setDia] = useState('');
  const [diaReal, setDiaReal] = useState('');
  const [diaAnterior, setDiaAnterior] = useState('');
  const [mes, setMes] = useState('');
  const [ano, setAno] = useState('');

  const rectangleRef = useRef(null);
  const salvar = () => {
    rectangleRef.current.salvar(); // Chama a função salvar do componente Rectangle
  };
  const update = () => {
    header();
    rectangleRef.current.pegarAtual(); // Chama a função salvar do componente Rectangle
  };


  const minusDiaAnterior = () => {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
  
    if (diaAnterior > 1) {
      if (diaAnterior - 1 >= currentDay - 15) {
        setDia(diaAnterior);
        setDiaAnterior(diaAnterior - 1);
        update();
      }
    } else {
      const currentMonth = currentDate.getMonth();
      let previousMonth, previousYear;
  
      if (currentMonth === 0) {
        // Janeiro (índice 0)
        previousMonth = 11; // Dezembro (índice 11)
        previousYear = currentDate.getFullYear() - 1;
      } else {
        previousMonth = currentMonth - 1;
        previousYear = currentDate.getFullYear();
      }
  
      const previousDate = new Date(previousYear, previousMonth + 1, 0);
      const lastDayOfPreviousMonth = previousDate.getDate();
  
      if (lastDayOfPreviousMonth > dia) {
        setDia(lastDayOfPreviousMonth);
        setDiaAnterior(lastDayOfPreviousMonth - 1);
        setMes(mesesAno[previousMonth]);
        setAno(previousYear);
      } else {
        setDia(lastDayOfPreviousMonth);
        setDiaAnterior(lastDayOfPreviousMonth);
        setMes(mesesAno[previousMonth]);
        setAno(previousYear);
      }
      update();
    }
  };
  


  const plusDiaAtual = () => {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const lastDayOfMonth = getLastDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());
  
    if (dia + 1 <= lastDayOfMonth && dia + 1 <= currentDay) {
      setDia(dia + 1);
      setDiaAnterior(dia);
      setMes(mes);
      setAno(currentDate.getFullYear());
      update();
    } else if (dia !== currentDay) {
      const nextMonth = getNextMonth(currentDate.getMonth());
      const nextYear = currentDate.getMonth() === 11 ? currentDate.getFullYear() + 1 : currentDate.getFullYear();
  
      setDia(1);
      setDiaAnterior(lastDayOfMonth);
      setMes(nextMonth);
      setAno(nextYear);
      update();
    }
  };
  

  const getLastDayOfMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getNextMonth = (currentMonth) => {
    const nextMonthIndex = currentMonth + 1;
    if (nextMonthIndex > 11) {
      return mesesAno[0]; // Janeiro
    }
    return mesesAno[nextMonthIndex];
  };


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

  const getDate = () => {
    const currentDate = new Date();
    const diasSemana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    const diaSemanaAtual = diasSemana[currentDate.getDay()];
    const diaAtual = currentDate.getDate();
    const mesAtual = mesesAno[currentDate.getMonth()];
    const ano = currentDate.getFullYear();
    setDia(diaAtual);
    setDiaReal(diaAtual);
    setDiaAnterior(diaAtual - 1);
    setMes(mesAtual);
    setAno(ano)
  };

  const header = () => {

    const currentDate = new Date();
    const diaAtual = currentDate.getDate(); 

    navigation.setOptions({
      headerRight: () => {
        if (dia == diaAtual) {
          return <>
            <TouchableOpacity onPress={salvar} style={styles.botaoDireita}>
              <Text style={styles.botaoDireitaText}>Salvar</Text>
            </TouchableOpacity>
          </>
        } else {
          return <></>
        }
      }
    });

  }

  useEffect(() => {
    header();
  }, [dia, diaReal]);

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
        <Text style={styles.title}>Diário de Emoções</Text>
        <View style={styles.line} />

        <View style={styles.conChamada}>
          <Text style={styles.chamada}>Olá {nome}!</Text>
          <Text style={styles.chamada}>Como está se sentindo hoje?</Text>
        </View> 
      </View>

      <View style={styles.conData}>
        <TouchableOpacity onPress={minusDiaAnterior}>
          <Text style={styles.dataAnterior}>{diaAnterior} ... </Text>
        </TouchableOpacity  >
        <TouchableOpacity onPress={plusDiaAtual}>
          <Text style={styles.dataAtual}>{dia} de {mes}</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
      <Rectangle ref={rectangleRef} onSalvar={salvar} onUpdate={update} data={`${ano}-${mes}-${dia}`} />
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
