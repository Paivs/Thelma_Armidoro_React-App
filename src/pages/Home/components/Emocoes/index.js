import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';

export default function Emocoes({title, text}) {
    return (
        <View style={styles.container}>
            <Text style={styles.title} multiline>{title}</Text>
            <Text style={styles.text} numberOfLines={3}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#282A3A",
        height: 115,
        width: 265,
    },
    title: {
        color: 'white',
        fontSize: 20,
        fontWeight: "bold",
        textAlign: 'left',
        margin: 5,
        marginBottom: 0,
    },
    text: {
        color: 'white',
        textAlign: "justify",
        fontSize: 18,
        margin: 5,
        marginTop: 0,
    }
})
