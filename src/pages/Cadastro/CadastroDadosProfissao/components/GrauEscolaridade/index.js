import React, { useState } from 'react';
import { View } from 'react-native';
import { Picker } from "@react-native-picker/picker"

export default function GrauEscolaridade({ onStatusChange }) {
    let [valor, setValor] = useState('SOLTEIRO')

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

                <Picker.Item key={0} label='Sem Escolaridade' value='SEM_ESCOLARIDADE' />
                <Picker.Item key={1} label='Ensino Fundamental Completo' value='ENSINO_FUNDAMENTAL_COMPLETO' />
                <Picker.Item key={2} label='Ensino Fundamental Incompleto' value='ENSINO_FUNDAMENTAL_INCOMPLETO' />
                <Picker.Item key={3} label='Ensino Médio Completo' value='ENSINO_MEDIO_COMPLETO' />
                <Picker.Item key={4} label='Ensino Médio Incompleto' value='ENSINO_MEDIO_INCOMPLETO' />
                <Picker.Item key={5} label='Ensino Superior Completo' value='ENSINO_SUPERIOR_COMPLETO' />
                <Picker.Item key={6} label='Ensino Superior Incompleto' value='ENSINO_SUPERIOR_INCOMPLETO' />
                <Picker.Item key={7} label='Pós Graduação' value='POS_GRADUACAO' />
                <Picker.Item key={8} label='Mestrado, Doutorado, outros' value='OUTROS' />

            </Picker>
        </View>
    );
}

const styles = {
    container: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 10,
    },
};