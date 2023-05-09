import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Picker } from "@react-native-picker/picker"

export default function DropPicker() {
    let [valor, setValor] = useState('')

    return (
        <View style={styles.container}>
            <Picker
                selectedValue={valor}
                onValueChange={(item, indexItem) => {
                    setValor(item)
                }}
                style={styles.picker}
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
    picker: {
    },
};