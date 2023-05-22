import React, { useState } from 'react';
import { View, useWindowDimensions, StyleSheet, TextInput, Text, TouchableOpacity, Alert } from 'react-native';

export const RectangleLembrete = ({ title, text, page }) => {
  const windowHeight = useWindowDimensions().height;
  const heightRectangle = windowHeight * 0.3;

  return (
    <View style={styles.containerWrapper}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{text}</Text>
        <Text style={styles.page}>{page}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 15,
  },
  container: {
    backgroundColor: '#282A3A',
    borderRadius: 15,
    width: '90%',
    height: '100%',
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'center',
    textAlign: 'right',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
    marginTop: 5,
  },
  description: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
    textAlign: "justify",
  },
  page: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: "right",
  },
});
