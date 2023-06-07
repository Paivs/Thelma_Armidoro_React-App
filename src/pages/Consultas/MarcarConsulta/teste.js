import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Switch, Dimensions, Alert, TextInput, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import PsychologistPicker from './components/Psicologos/index.js';
import { marcarUmaConsulta } from "../../../services/api.js"

import { useNavigation } from '@react-navigation/native';

export default function MarcarConsulta({ navigation }) {
  const imageUrl = 'https://storage.alboom.ninja/sites/1071/albuns/844197/00019.jpg'; // Substitua pela URL real da imagem
  const phoneNumber = '5511980697346'; // Substitua pelo número de telefone desejado

  const [recurrent, setRecurrent] = useState(false);
  const [selectedDates, setSelectedDates] = useState({});
  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState(null);
  const [numberWeeks, setNumberWeeks] = useState(null);
  const [idMedico, setIdMedico] = useState('');
  const [showRecurrence, setShowRecurrence] = useState(true);
  const [selectedTime, setSelectedTime] = useState('');

  const handleAgendar = () => {
    setSelectedDates({});
    if (recurrent) {
      // Código para lidar com consultas recorrentes
    } else {
      // Código para lidar com consultas não recorrentes
    }

    navigation.navigate("Com Consulta")
  };

  const handleRecurrenceToggle = () => {
    if (!recurrent) {
      setSelectedDates({});
      setSelectedDayOfWeek(null);
    }
    setShowRecurrence(!showRecurrence);
    setRecurrent(!recurrent);
  };

  const handleDateSelect = (date) => {
    const currentDate = new Date().toISOString().split('T')[0];

    if (date >= currentDate) {
      const markedDate = { [date]: { selected: true, marked: true } };
      setSelectedDates(markedDate);
      setSelectedTime('');
      setShowRecurrence(false);
      console.log("\nDATA\n")
      console.log(date)
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

          {!recurrent && showRecurrence && Object.keys(selectedDates).length > 0 && (
            <View>
              <View style={styles.calendarContainer}>
                <Text style={styles.subHeaderText}>Selecione uma data:</Text>
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
              <Text style={styles.subHeaderText}>Selecione um horário:</Text>
              <TouchableOpacity onPress={() => console.log('Horário selecionado')}>
                <Text style={styles.timeText}>{selectedTime}</Text>
              </TouchableOpacity>
            </View>
          )}

          {recurrent && showRecurrence && (
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

                <Text style={[styles.dayOfWeekText, { marginTop: 5 }]}>Quantidade de meses:</Text>
                <TextInput
                  style={styles.inputSemanas}
                  keyboardType='numeric'
                  placeholder='Digite o número de meses que terá consulta'
                  value={numberWeeks}
                  onChange={setNumberWeeks}
                ></TextInput>

              </View>
            </View>
          )}



          <View style={styles.recurrenceContainer}>
            <Text style={styles.subHeaderText}>Recorrência:</Text>
            <View style={styles.recurrenceToggleContainer}>
              <Text style={styles.recurrenceToggleText}>Não</Text>
              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={recurrent ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={handleRecurrenceToggle}
                value={recurrent}
              />
              <Text style={styles.recurrenceToggleText}>Sim</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.agendarButton} onPress={handleAgendar}>
            <Text style={styles.agendarButtonText}>Agendar</Text>
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
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#FFF',
    marginBottom: 20,
  },
  subHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  timeText: {
    fontSize: 16,
    color: '#FFF',
  },
  dayOfWeekContainer: {
    marginBottom: 20,
  },
  dayOfWeekButton: {
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  selectedDayOfWeekButton: {
    backgroundColor: '#81b0ff',
  },
  dayOfWeekButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  calendarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  calendar: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#FFF',
  },
  recurrenceContainer: {
    marginBottom: 20,
  },
  recurrenceToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recurrenceToggleText: {
    fontSize: 16,
    color: '#FFF',
    marginRight: 10,
  },
  agendarButton: {
    backgroundColor: '#81b0ff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  agendarButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
