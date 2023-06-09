import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { tempoConsulta } from "../../services/api.js"
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const PersonWithWhatsApp = ({ imageUrl }) => {

  const [tempo, setTempo] = useState('')

  const navigation = useNavigation();

  const tempoRestante = async () => {
    const tempo = await tempoConsulta();
    setTempo(tempo);
  };

  useFocusEffect(
    useCallback(() => {
      tempoRestante();
      return () => {
        // Limpar os efeitos do tempoRestante, se necessário
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />

      <View style={styles.retangulo}>
        <Text style={styles.personName}>Thelma Armidoro</Text>

        <View style={styles.divider} />

        <View style={styles.iconContainer}>
          <View style={styles.iconTextContainer}>
            <TouchableOpacity onPress={tempoRestante} style={[{alignItems: "center"}]}>
              <Ionicons name="time-outline" size={45} color="white" />
              <Text style={styles.iconText}>{tempo}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dividerVertical} />

          <View style={styles.iconTextContainer}>

            <TouchableOpacity onPress={() => { navigation.navigate("Marcar Consulta") }}>
              <Ionicons name="chatbox-outline" size={45} color="white" />

              <Text style={styles.iconText}>Consulta</Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    padding: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginBottom: -85,
    zIndex: 1000,
  },
  retangulo: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: '#282A3A',
    padding: 16,
    width: '155%',
    marginLeft: 25,
    marginRight: 25,
    borderRadius: 25,
    marginTop: 15,
  },
  divider: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    width: '50%',
    marginBottom: 8,
  },
  personName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    marginTop: 60,
  },
  iconContainer: {
    textAlign: 'center',
    flexDirection: 'row',
  },
  dividerVertical: {
    height: 45,
    borderRightColor: 'white',
    borderRightWidth: 1,
    marginHorizontal: 8,
  },
  iconTextContainer: {
    alignItems: 'center',
    textAlign: 'center',
    width: '25%',
  },
  iconText: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
  },
});

export default PersonWithWhatsApp;
