import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';

export default function Menus({title, icon}) {
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Icon
                    name={icon}
                    type="font-awesome"
                    color="white"
                    size={35}
                />
            </View>
            <Text style={styles.title} multiline>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#282A3A",
        alignItems: 'center',
        justifyContent: 'center',
        height: 115,
        width: 105,
    },
    iconContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        color: 'white',
        fontSize: 18,
        fontWeight: "bold",
        textAlign: 'center',
    }
})
