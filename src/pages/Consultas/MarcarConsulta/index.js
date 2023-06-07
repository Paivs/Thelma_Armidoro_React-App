import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Switch, Dimensions, Alert, TextInput, ScrollView, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';
import PsychologistPicker from './components/Psicologos/index.js';
import { marcarUmaConsulta } from "../../../services/api.js"
import { TextInputMask } from 'react-native-masked-text';
import { useNavigation } from '@react-navigation/native';

export default function MarcarConsulta({ navigation }) {
  const imageUrl = 'https://storage.alboom.ninja/sites/1071/albuns/844197/00019.jpg'; // Substitua pela URL real da imagem
  const phoneNumber = '5511980697346'; // Substitua pelo número de telefone desejado

  const [recurrent, setRecurrent] = useState(false);
  const [selectedDates, setSelectedDates] = useState({});
  const [selectedDatesValues, setSelectedDatesValues] = useState('');
  const [selectedDatesArray, setSelectedDatesArray] = useState({});
  const [dateSelected, setDateSelected] = useState(false);
  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState(null);
  const [numberWeeks, setNumberWeeks] = useState(0 || null);
  const [idMedico, setIdMedico] = useState('');

  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');

  function obterProximasDiasSemanaEmSemanas(diaSemana, quantidadeSemanas) {
    const proximosDiasSemana = [];
    let contador = 0;
  
    // Obtém a data atual
    let dataAtual = new Date();
  
    // Enquanto o número de semanas não for atingido
    while (contador < quantidadeSemanas) {
      // Verifica se o dia corresponde ao dia da semana desejado
      if (dataAtual.getDay() === diaSemana) {
        const dataFormatada = dataAtual.toISOString().slice(0, 10);
        proximosDiasSemana.push(dataFormatada);
        contador++;
      }
  
      // Avança para o próximo dia
      dataAtual.setDate(dataAtual.getDate() + 1);
    }
  
    return proximosDiasSemana;
  }
  

  const handleAgendar = async () => {

    if (recurrent) {

      if((isNaN(numberWeeks) || numberWeeks == "") || (isNaN(selectedDayOfWeek) || selectedDayOfWeek == "")){
        alert("Selecione o dia da semana e os meses")
      }else{
        if ((isNaN(hour) || hour == "") || (isNaN(minute) || minute == "")) {
          alert("Coloque o horário certo!")
        } else {
        const datas = obterProximasDiasSemanaEmSemanas(selectedDayOfWeek, numberWeeks * 4)

        datas.forEach((date) => {
          const formattedDate = date.toLocaleDateString();
          console.log(formattedDate);
        });

        for(let i = 0; i < datas.length; i++) {
          //marcarUmaConsulta(`${datas[i]}T${hour}:${minute}`, idMedico)
        }
      }
    }
    } else {
      if ((isNaN(hour) || hour == "") || (isNaN(minute) || minute == "")) {
        alert("Coloque o horário certo!")
      } else {

        console.log("\nidMedico\n")
        console.log(idMedico)

        console.log("\nHORA")
        console.log(`${hour}:${minute}`)

        console.log("\nData\n")
        const keys = Object.keys(selectedDates);
        const primeiraData = keys[0];
        console.log(primeiraData)

        const foi = await marcarUmaConsulta(`${primeiraData}T${hour}:${minute}`, idMedico)

        if (foi) { navigation.navigate("Com Consulta") }

      }
    }
  };

  const handleRecurrenceToggle = () => {
    if (!recurrent) {
      setSelectedDates({});
      setSelectedDayOfWeek(null);
    }
    setRecurrent(!recurrent);
  };


  const handleDateSelect = (date) => {
    const currentDate = new Date().toISOString().split('T')[0];

    if (date >= currentDate) {

      console.log(date)
      console.log(selectedDates)

      if (date == selectedDates) {
        setSelectedDates('');
      } else {



        const markedDate = { [date]: { selected: true, marked: true } };
        setSelectedDates(markedDate);
        setDateSelected(true);
        console.log("\nDATA\n")
        console.log(date)
      }
    } else {
      Alert.alert(
        'Erro',
        'Só é possível marcar uma consulta de hoje em diante!',
        [{ text: 'OK', onPress: () => console.log('Botão OK pressionado') }],
        { cancelable: false }
      );
    }
  };

  const handleDayOfWeekSelect = (dayOfWeek) => {
    setSelectedDayOfWeek(dayOfWeek);
  };


  const screenWidth = Dimensions.get('window').width;
  const calendarWidth = screenWidth * 0.9;

  return (
    <ImageBackground source={require('../../../../assets/fundo2.png')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Marcar consulta</Text>
        <View style={styles.line} />

        <PsychologistPicker
          onPsychologistChange={(psychologist) => { setIdMedico(psychologist) }}
        />

        <ScrollView showsVerticalScrollIndicator={false}>

          {!recurrent &&
            <View style={styles.calendarContainer}>
              <Calendar
                onDayPress={(day) => handleDateSelect(day.dateString)}
                markedDates={selectedDates}
                style={{ width: calendarWidth, borderRadius: 15, borderColor: '#282A3A' }}
                theme={{
                  calendarBackground: 'white',
                  textSectionTitleColor: '#282A3A',
                  selectedDayBackgroundColor: '#282A3A',
                  selectedDayTextColor: 'white',
                  todayTextColor: 'blue',
                  dayTextColor: '#282A3A',
                  textDisabledColor: 'gray',
                  dotColor: 'white',
                  selectedDotColor: '#282A3A',
                  arrowColor: '#282A3A',
                  monthTextColor: '#282A3A',
                  indicatorColor: '#282A3A',
                  textDayFontSize: 14,
                  textMonthFontSize: 16,
                  textDayHeaderFontSize: 14,
                }}
              />
            </View>
          }

          {dateSelected &&
            <View>
              <View style={styles.inputContainer}>
                <Text style={[styles.dayOfWeekText, { marginTop: 10, marginRight: 10, fontWeight: "bold" }]}>Selecione o horário:</Text>

                <TextInputMask
                  style={styles.input}
                  type={'custom'}
                  value={hour}
                  onChangeText={(item) => {

                    if (Number(item) >= 0 && Number(item) <= 23) {
                      setHour(item)
                    } else {
                      alert('Por favor, insira uma hora válida.');
                      setHour("")
                    }


                  }}
                  placeholder="HH"
                  options={{
                    mask: "99"
                  }}
                />

                <Text style={styles.colon}>:</Text>

                <TextInputMask
                  style={styles.input}
                  type={'custom'}
                  value={minute}
                  onChangeText={(item) => {

                    if (Number(item) >= 0 && Number(item) <= 59) {
                      setMinute(item)
                    } else {
                      alert('Por favor, insira uma hora válida.');
                      setMinute("")
                    }


                  }}
                  placeholder="MM"
                  options={{
                    mask: "99"
                  }}
                />
              </View>
            </View>
          }

          {recurrent && (
            <View style={styles.dayOfWeekContainer}>
              <Text style={styles.dayOfWeekText}>Selecione o dia da semana:</Text>
              <View style={styles.dayOfWeekButtonsContainer}>
                <TouchableOpacity
                  style={[
                    styles.dayOfWeekButton,
                    selectedDayOfWeek === 0 && styles.selectedDayOfWeekButton,
                  ]}
                  onPress={() => handleDayOfWeekSelect(0)}
                >
                  <Text style={[styles.dayOfWeekButtonText, selectedDayOfWeek === 0 && styles.dayOfWeekButtonTextSelected]}>Domingo</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.dayOfWeekButton,
                    selectedDayOfWeek === 1 && styles.selectedDayOfWeekButton,
                  ]}
                  onPress={() => handleDayOfWeekSelect(1)}
                >
                  <Text style={[styles.dayOfWeekButtonText, selectedDayOfWeek === 1 && styles.dayOfWeekButtonTextSelected]}>Segunda</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.dayOfWeekButton,
                    selectedDayOfWeek === 2 && styles.selectedDayOfWeekButton,
                  ]}
                  onPress={() => handleDayOfWeekSelect(2)}
                >
                  <Text style={[styles.dayOfWeekButtonText, selectedDayOfWeek === 2 && styles.dayOfWeekButtonTextSelected]}>Terça</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.dayOfWeekButton,
                    selectedDayOfWeek === 3 && styles.selectedDayOfWeekButton,
                  ]}
                  onPress={() => handleDayOfWeekSelect(3)}
                >
                  <Text style={[styles.dayOfWeekButtonText, selectedDayOfWeek === 3 && styles.dayOfWeekButtonTextSelected]}>Quarta</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.dayOfWeekButton,
                    selectedDayOfWeek === 4 && styles.selectedDayOfWeekButton,
                  ]}
                  onPress={() => handleDayOfWeekSelect(4)}
                >
                  <Text style={[styles.dayOfWeekButtonText, selectedDayOfWeek === 4 && styles.dayOfWeekButtonTextSelected]}>Quinta</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.dayOfWeekButton,
                    selectedDayOfWeek === 5 && styles.selectedDayOfWeekButton,
                  ]}
                  onPress={() => handleDayOfWeekSelect(5)}
                >
                  <Text style={[styles.dayOfWeekButtonText, selectedDayOfWeek === 5 && styles.dayOfWeekButtonTextSelected]}>Sexta</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.dayOfWeekButton,
                    selectedDayOfWeek === 6 && styles.selectedDayOfWeekButton,
                  ]}
                  onPress={() => handleDayOfWeekSelect(6)}
                >
                  <Text style={[styles.dayOfWeekButtonText, selectedDayOfWeek === 6 && styles.dayOfWeekButtonTextSelected]}>Sábado</Text>
                </TouchableOpacity>

                <TextInput
  style={styles.inputSemanas}
  keyboardType='numeric'
  placeholder='Digite o número de meses que terá consulta'
  value={numberWeeks !== null ? numberWeeks.toString() : ''}
  onChangeText={(text) => {
    const value = parseInt(text, 10);
    setNumberWeeks(isNaN(value) ? null : value);
  }}
/>

<View>
              <View style={styles.inputContainer}>
                <Text style={[styles.dayOfWeekText, { marginTop: 10, marginRight: 10, fontWeight: "bold" }]}>Selecione o horário:</Text>

                <TextInputMask
                  style={styles.input}
                  type={'custom'}
                  value={hour}
                  onChangeText={(item) => {

                    if (Number(item) >= 0 && Number(item) <= 23) {
                      setHour(item)
                    } else {
                      alert('Por favor, insira uma hora válida.');
                      setHour("")
                    }


                  }}
                  placeholder="HH"
                  options={{
                    mask: "99"
                  }}
                />

                <Text style={styles.colon}>:</Text>

                <TextInputMask
                  style={styles.input}
                  type={'custom'}
                  value={minute}
                  onChangeText={(item) => {

                    if (Number(item) >= 0 && Number(item) <= 59) {
                      setMinute(item)
                    } else {
                      alert('Por favor, insira uma hora válida.');
                      setMinute("")
                    }


                  }}
                  placeholder="MM"
                  options={{
                    mask: "99"
                  }}
                />
              </View>
            </View>



              </View>

            </View>
          )}

          {!dateSelected && <View style={styles.switchContainer}>
            <Switch
              value={recurrent}
              onValueChange={handleRecurrenceToggle}
              style={styles.switch}
              thumbColor="#ffffff"
              trackColor={{ false: '#cccccc', true: '#282A3A' }}
            />
            <Text style={styles.switchText}>Consulta recorrente</Text>
          </View>}

          <View style={styles.line} />

          <TouchableOpacity onPress={handleAgendar} style={styles.button}>
            <Text style={styles.buttonText}>Agendar</Text>
          </TouchableOpacity>

        </ScrollView>

      </View>





    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    backgroundColor: '#674188',
  },
  line: {
    width: '65%',
    borderBottomWidth: 2,
    alignSelf: "center",
    margin: 15,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  switch: {
    alignItems: 'center',
  },
  switchText: {
    marginLeft: 5,
    fontSize: 18,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
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
  button: {
    borderRadius: 15,
    margin: 15,
    width: "90%",
  },
  buttonText: {
    borderRadius: 15,
    backgroundColor: "#282A3A",
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    padding: 10,
    width: "100%",
  },
  calendarContainer: {
    alignItems: 'center',
  },
  dayOfWeekContainer: {
    marginTop: 20,
  },
  dayOfWeekText: {
    fontSize: 18,
    marginBottom: 10,
  },
  dayOfWeekButtonsContainer: {
    justifyContent: 'space-around',
  },
  dayOfWeekButton: {
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: '#282A3A',
    marginVertical: 5,
  },
  selectedDayOfWeekButton: {
    backgroundColor: '#282A3A',
    color: "white",
    fontWeight: "bold",
  },
  dayOfWeekButtonText: {
    color: '#282A3A',
    fontSize: 16,
    fontWeight: 'bold'
  },
  dayOfWeekButtonTextSelected: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  inputSemanas: {
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: '#282A3A',
    marginVertical: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  input: {
    width: 60,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  colon: {
    fontSize: 20,
    marginHorizontal: 5,
  },
});
