import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function MyDropdown() {
  const [selectedValue, setSelectedValue] = useState(null);
  const [open, setOpen] = useState(false);

  const options = [
    { label: 'Sem Escolaridade', value: 'SEM_ESCOLARIDADE' },

    { label: 'Ensino Fundamental Completo', value: 'ENSINO_FUNDAMENTAL_COMPLETO' },
    { label: 'Ensino Fundamental Incompleto', value: 'ENSINO_FUNDAMENTAL_INCOMPLETO' },

    { label: 'Ensino Médio Completo', value: 'ENSINO_MEDIO_COMPLETO' },
    { label: 'Ensino Médio Incompleto', value: 'ENSINO_MEDIO_INCOMPLETO' },

    { label: 'Ensino Superior Completo', value: 'ENSINO_SUPERIOR_COMPLETO' },
    { label: 'Ensino Superior Incompleto', value: 'ENSINO_SUPERIOR_INCOMPLETO' },

    { label: 'Pós Graduação', value: 'POS_GRADUACAO' },

    { label: 'Mestrado, Doutorado, outros', value: 'OUTROS' },
    
    
  ];

    const renderVirtualizedList = () => {
    return (
      <EstadoCivil/>
    );
  };

  return (
    <View>
      <DropDownPicker
        items={options}
        open={open}
        value={selectedValue}
        setOpen={setOpen}
        setValue={setSelectedValue}
        placeholder="Selecione..."

        defaultValue={selectedValue}
        containerStyle={styles.dropdownContainer}
        style={styles.dropdown}
        itemStyle={styles.dropdownItem}
        dropDownStyle={styles.dropdownList}
      />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    zIndex: 999
  },
  dropdownContainer: {
    height: 40,
    width: '100%',
    marginBottom: 10,
    zIndex: 999
  },
  dropdown: {
    backgroundColor: '#fafafa',
    borderWidth: 0,
    color: '#333',
    zIndex: 999
  },
  dropdownItem: {
    justifyContent: 'flex-start',
    zIndex: 999
  },
  dropdownList: {
    backgroundColor: '#fafafa',
    borderWidth: 0,
    zIndex: 999 
  },
  selected: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    zIndex: 999
  },
});