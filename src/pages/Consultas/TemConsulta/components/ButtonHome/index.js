import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default function ButtonHome() {

    return (
        <TouchableOpacity style={styles.container}>
            <Text style={styles.title}>Iniciar Consulta</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        backgroundColor: "#282A3A",
        borderRadius: 15,
        width: "75%"
    },
    title: {
        color: "white",
        fontWeight: "bold"
    }
}); 