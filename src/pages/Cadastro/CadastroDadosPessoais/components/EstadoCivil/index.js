import React, { useState } from 'react';
import { View } from 'react-native';
import { Picker } from "@react-native-picker/picker"

import { DataStateContext } from "../../../components/DataCenter/index.js"

export default function EstadoCivil({onStatusChange}) {
    let [valor, setValor] = useState('')

    const handleStatusChange = (itemValue) => {
        setValor(itemValue);
        onStatusChange(itemValue); // Chama a função de callback passando o valor selecionado
      };

    return (
        <View style={styles.container}>
            <Picker
                selectedValue={valor}
                onValueChange={handleStatusChange}
            >
                <Picker.Item key={0} label='Solteiro(a)' value='SOLTEIRO' />
                <Picker.Item key={1} label='Casado(a)' value='CASADO' />
                <Picker.Item key={2} label='Divorciado(a)' value='DIVORCIADO' />
                <Picker.Item key={3} label='Separado(a)' value='SEPARADO' />
                <Picker.Item key={4} label='Viúvo(a)' value='VIUVO' />
            </Picker>
        </View>
    );
}

const styles = {
    container: {
        backgroundColor: '#fff',
        borderRadius: 10,
    },
};