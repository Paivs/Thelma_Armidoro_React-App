import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ImageBackground, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { DrawerActions } from '@react-navigation/native';
import Rectangle from "./components/Rectangle/index.js"
import styles from "./styles.js"
import NotificationService from "../../services/NotificationService.js"
import { getPacienteData } from "../../services/saveData.js"
import { getDiaSeguinte, getDiaAnterior } from "../../services/DataService.js"


const mesesAno = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

export default function DiarioEmocoes({ navigation }) {
  const [nome, setNome] = useState('');
  const [dia, setDia] = useState('');
  const [diaReal, setDiaReal] = useState('');
  const [diaAnterior, setDiaAnterior] = useState('');
  const [mes, setMes] = useState('');
  const [mesDisplay, setMesDisplay] = useState('');
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
    let dataAtualizado = getDiaAnterior({ ano: ano, mes: mes, dia: dia })
    const meses = [
      "Janeiro",
      "Fevereiro", 
      "Marco",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro"]


    setDiaAnterior(getDiaAnterior({ ano: dataAtualizado.ano, mes: dataAtualizado.mes, dia: dataAtualizado.dia }).dia)
    setDia(dataAtualizado.dia)
    setMes(dataAtualizado.mes)
    setMesDisplay(meses[dataAtualizado.mes])
    setAno(dataAtualizado.ano)
    update()
  };

  const plusDiaAtual = () => {
    let dataAtualizado = getDiaSeguinte({ ano: ano, mes: mes, dia: dia })

    const dataAtual = new Date();
    const mesAtual = dataAtual.getMonth();
    const diaAtual = dataAtual.getDate();
    const anoAtual = dataAtual.getFullYear();

    const meses = [
      "Janeiro",
      "Fevereiro", 
      "Marco",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro"]


    if (!(dataAtualizado.dia > diaAtual && dataAtualizado.mes == mesAtual) && !(dataAtualizado.mes > mesAtual)) {
      setDiaAnterior(dia)
      setDia(dataAtualizado.dia)
      setMes(dataAtualizado.mes)
      setMesDisplay(meses[dataAtualizado.mes])
      setAno(dataAtualizado.ano)
      update()
    }
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
    const dataAtual = new Date();
    const mesAtual = dataAtual.getMonth();
    const diaAtual = dataAtual.getDate();
    const anoAtual = dataAtual.getFullYear();

    const meses = [
      "Janeiro",
      "Fevereiro", 
      "Marco",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro"]

    const diasSemana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    const diaSemanaAtual = diasSemana[dataAtual.getDay()];

    setDia(diaAtual);
    setDiaReal(diaAtual);
    setDiaAnterior(getDiaAnterior({ ano: anoAtual, mes: mesAtual, dia: diaAtual }).dia);
    setMes(mesAtual);
    setMesDisplay(meses[mesAtual])
    setAno(anoAtual)
  };

  
  useEffect(() => {
    header();
  }, [dia, diaReal]);

  useEffect(() => {
    getUsername();
    getDate();
  }, []);

  const header = () => {

    const currentDate = new Date();
    const diaAtual = currentDate.getDate();
    const mesAtual = currentDate.getMonth();
    const anoAtual = currentDate.getFullYear();

    navigation.setOptions({
      headerRight: () => {
        if (dia == diaAtual && mes == mesAtual && ano == anoAtual) {
          return <>
            <TouchableOpacity onPress={salvar} style={styles.botaoDireita}>
              <Text style={styles.botaoDireitaText}>Salvar</Text>
            </TouchableOpacity>
          </>
        } else {
          return <>
          <TouchableOpacity onPress={getDate} style={styles.botaoDireita}>
              <Text style={styles.botaoDireitaText}>Reset</Text>
            </TouchableOpacity>
          </>
        }
      }
    });

  }


  return (
    <ImageBackground
      source={require('../../../assets/fundo2.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Diário de Emoções</Text>
        <View style={styles.line} />

        <View style={styles.conChamada}>
          <Text style={styles.chamada} numberOfLines={1}>Olá {nome ? nome.split(' ')[0] : ''}!</Text>
          <Text style={styles.chamada}>Como está se sentindo hoje?</Text>
        </View> 
      </View>

      <View style={styles.conData}>
        <TouchableOpacity onPress={minusDiaAnterior}>
          <Text style={styles.dataAnterior}>{diaAnterior} ... </Text>
        </TouchableOpacity  >
        <TouchableOpacity onPress={plusDiaAtual}>
          <Text style={styles.dataAtual}>{dia} de {mesDisplay}</Text>
        </TouchableOpacity>
      </View>

      <Rectangle ref={rectangleRef} onSalvar={salvar} onUpdate={update} data={`${ano}-${mes}-${dia}`} />
    </ImageBackground>
  );
}
