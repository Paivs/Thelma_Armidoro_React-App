import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getPacienteData } from "../../../../services/saveData.js"
import { Feather } from '@expo/vector-icons';

export default function Perfil() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');

    const getUsernameAndEmail = async () => {
        console.log('CHAMA');
        try {
            const storedUsername = await getPacienteData();
            if (storedUsername !== null) {
                setNome(storedUsername.nome);
                setEmail(storedUsername.email);
            }
        } catch (error) {
            console.log('Erro ao buscar o nome do usuário:', error);
        }
    };
    useEffect(() => {
        getUsernameAndEmail();
    }, []);

    return (
        <View style={styles.centralizador}>
            <View style={styles.container}>
                <View style={styles.icon}>
                    <Feather name="user" size={50} color="#282A3A" />
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.nome}>{nome}</Text>
                    <Text style={styles.email}>{email}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    centralizador: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    container: {
        borderRadius: 15,
        backgroundColor: "#F7EFE5",
        width: "90%",
        height: 75,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        backgroundColor: "rgba(195, 172, 208, 0.3)",
        marginLeft: 10,
        borderRadius: 15,
        borderColor: "#282A3A",
        borderWidth: 5,
        zIndex: 999,
    },
    textContainer: {
        marginLeft: 10,
    },
    nome: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    email: {
        fontSize: 18,
    },
});
