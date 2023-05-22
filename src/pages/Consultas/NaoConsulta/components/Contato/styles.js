import React from 'react';
import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      padding: 16,
    },
    image: {
      width: 200,
      height: 200,
      borderRadius: 100,
      marginBottom: 16,
    },
    whatsappButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#282A3A', // Cor de fundo do botão do WhatsApp
      padding: 12,
      borderRadius: 8,
    },
    whatsappIcon: {
      marginRight: 8,
    },
    whatsappText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });
  