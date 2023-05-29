import React, { useState } from 'react';
import { View } from 'react-native';
import { Picker } from "@react-native-picker/picker"

export default function PsychologistPicker({ onPsychologistChange }) {
  const [selectedPsychologist, setSelectedPsychologist] = useState('');

  const handlePsychologistChange = (itemValue) => {
    setSelectedPsychologist(itemValue);
    onPsychologistChange(itemValue); // Chama a função de callback passando o valor selecionado
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedPsychologist}
        onValueChange={handlePsychologistChange}
        style={styles.picker}
      >
        <Picker.Item key={0} label='Psicólogo 1' value='Psicólogo 1' />
        <Picker.Item key={1} label='Psicólogo 2' value='Psicólogo 2' />
        <Picker.Item key={2} label='Psicólogo 3' value='Psicólogo 3' />
      </Picker>
    </View>
  );
}

const styles = {
  container: {
    backgroundColor: '#282A3A',
    borderRadius: 15,
    width: "90%",
    margin: 15,
  },
  picker: {
    color: "white",
  }
};
