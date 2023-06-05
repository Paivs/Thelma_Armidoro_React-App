import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import NotificationService from "../../../../../services/NotificationService.js"
import { useNavigation } from '@react-navigation/native';

export default function ButtonHome({marcado}) {
    const navigation = useNavigation();

    const handleNotification = async () => {
        navigation.navigate("Marcar Consulta")
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handleNotification}>
            <Text style={styles.title}>Marcar Consulta</Text>
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