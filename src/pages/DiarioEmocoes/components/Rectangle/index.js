import React, { useState } from 'react';
import { View, useWindowDimensions, StyleSheet, TextInput, ScrollView, Keyboard } from 'react-native';


export const Rectangle = () => {
  const windowHeight = useWindowDimensions().height;
  const [heightRectangle, setHeightRectangle] = useState(windowHeight * 0.65);

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  return (

    
    <View style={[styles.rectangle, {height: heightRectangle}]}>
    
      <View>
        <TextInput
        style={styles.input}
        placeholder="Título"
        placeholderTextColor="white"
        value={title}
        onChangeText={text => setTitle(text)}
        multiline
        />
      </View>

      <ScrollView>

      <View>
        <TextInput
        style={styles.inputText}
        placeholder="Digite suas emoções"
        placeholderTextColor="white"
        value={text}
        onChangeText={text => setText(text)}
        multiline
        />
      </View>

      </ScrollView>
    </View>
    

  );
};

const styles = StyleSheet.create({
  rectangle: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#282A3A',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    width: '100%',
    paddingHorizontal: 40,
    paddingVertical: 30,
  },
  input: {
    fontSize: 26,
    fontWeight: 'bold',
    color: "white",
    marginBottom: 15,
    
  },
  inputText: {
    fontSize: 20,
    color: "white",
    marginBottom: 15,
    paddingBottom: 80,
  }
});