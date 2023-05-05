import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function MyDropdown() {
  const [selectedValue, setSelectedValue] = useState(null);
  const [open, setOpen] = useState(false);

  const options = [
    { label: 'Solteiro(a)', value: 'SOLTEIRO' },
    { label: 'Casado(a)', value: 'CASADO' },
    { label: 'Divorciado(a)', value: 'DIVORCIADO' },
    { label: 'Separado(a)', value: 'SEPARADO' },
    { label: 'Viúvo(a)', value: 'VIUVO' },
    
  ];

  const containerStyle = {
    height: 50,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: '#fff',
  };

  const dropDownStyle = {
    backgroundColor: '#fafafa',
    borderColor: '#ccc',
    borderWidth: 1,
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
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dropdownContainer: {
    height: 40,
    width: '100%',
    marginBottom: 10,
  },
  dropdown: {
    backgroundColor: '#fafafa',
    borderWidth: 0,
    color: '#333',
  },
  dropdownItem: {
    justifyContent: 'flex-start',
  },
  dropdownList: {
    backgroundColor: '#fafafa',
    borderWidth: 0,
  },
  selected: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
});