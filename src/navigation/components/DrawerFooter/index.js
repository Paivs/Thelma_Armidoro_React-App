import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { storeLogado } from "../../../services/saveData.js"

const DrawerFooter = () => {
    const navigation = useNavigation();

    const handleLogout = async () => {
        navigation.navigate("Login")
        storeLogado(false)
      }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleLogout} style={styles.ConbuttonLogout}>
                <Text style={styles.buttonLogout}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = {
    container: {
        backgroundColor: '#F7EFE5',
        padding: 16,
        marginTop: 25,
        marginBottom: -10,
    },
    ConbuttonLogout: {
        borderRadius: 15,
        width: "100%",
        height: 50,
        padding: 5,
        textAlign: "center",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#282A3A",
        borderWidth: 3,
      },
    profileImage: {
        width: 80,
        height: 80,
        alignSelf: 'center',
        marginBottom: 8,
    },
    buttonLogout: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#282A3A",
      },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 4,
    },
    profileEmail: {
        fontSize: 14,
        alignSelf: 'center',
    },
};

export default DrawerFooter;
