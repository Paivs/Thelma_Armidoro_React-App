import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';

const DateInput = ({ label, onChange, value }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showValue, setShowValue] = useState(null);

  const handleDateChange = (date) => {
    setShowDatePicker(false);

    const dateString = date;
    const dateParts = dateString.split("/");

    // Formato: YYYY-MM-DDTHH:mm:ss.sssZ
    const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

    setShowValue(formattedDate)
    onChange(date);
  };

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={() => setShowDatePicker(true)}>
        {value && (
          <Text style={styles.label}>Data: {showValue}</Text>
        )}
        {!value && (
          <Text style={styles.label}>Selecione uma data</Text>
        )}
      </TouchableOpacity>

      {showDatePicker && (
        <DatePicker
          mode="calendar"
          onSelectedChange={handleDateChange}
          current={selectedDate}
          options={{
            backgroundColor: '#ffffff',
          }}
        />
      )}
    </View>
  );
};

export default DateInput;


const styles = StyleSheet.create({
  button: {
    padding: 10,
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#5868A5',
    borderRadius: 5,
    justifyContent: 'center',
  },
  rectangle: {
    position: 'absolute',
    bottom: -30,
    backgroundColor: '#8868A5',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    width: '100%',
    paddingHorizontal: 40,
    paddingVertical: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16,
  },
  sublabel: {
    marginBottom: 5,
    color: '#fff',
    fontSize: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 10
  },
  inputSenhaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 10,
    backgroundColor: '#9b7bb2',
  },
  inputSenha: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
  },
  btnOcultarSenha: {
    width: 50,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 12,
  },
  btnEntrar: {
    backgroundColor: '#6e5baa',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnEntrarTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  btnEntrarGoogle: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnEntrarGoogleTexto: {
    color: '#6e5baa',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linksContainer: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  link: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  inputSenhaContainer: {
    marginBottom: 20,
  },
  inputSenha: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  inputSenhaTexto: {
    flex: 1,
  },
  btnOcultarSenha: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnOcultarSenhaTexto: {
    color: '#9b7bb2',
    fontSize: 16,
  },
});