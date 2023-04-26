
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, TextInput } from 'react-native'
import { cadastrarUsuarioPin } from "../../services/api.js"

const { height } = Dimensions.get('window')

export const PinPopup = ({show, close, pin}) => {
  const [localPin, setPin] = useState(pin);
  const [state, setState] = useState({
    opacity: new Animated.Value(0),
    container: new Animated.Value(height),
    modal: new Animated.Value(height)
  })

  const openModal = () => {
    Animated.sequence([
      Animated.timing(state.container, { toValue: 0, duration: 100, useNativeDriver: true  }),
      Animated.timing(state.opacity, { toValue: 1, duration: 300, useNativeDriver: true  }),
      Animated.spring(state.modal, { toValue: 0, bounciness: 5, useNativeDriver: true })
    ]).start()
  }

  const closeModal = () => {
    Animated.sequence([
      Animated.timing(state.modal, { toValue: height, duration: 250, useNativeDriver: true }),
      Animated.timing(state.opacity, { toValue: 0, duration: 300, useNativeDriver: true  }),
      Animated.timing(state.container, { toValue: height, duration: 100, useNativeDriver: true  })
    ]).start()
  }

  useEffect(() => {
    if (show) {
      openModal()
    } else {
      closeModal()
    }
  }, [show])

  const handleSave = () => {
    close(localPin);
  };

  return (
    <Animated.View
      style={[styles.container, {
        opacity: state.opacity,
        transform: [
          { translateY: state.container }
        ]
      }]}
    >
      <Animated.View
        style={[styles.modal, {
          transform: [
            { translateY: state.modal }
          ]
        }]}
      >
        <View style={styles.indicator} />

        <Text style={styles.label}>PIN</Text>
      <TextInput
        style={styles.input}
        value={localPin}
        onChangeText={setPin}
        placeholder="Digite seu PIN aqui"
        keyboardType='email-address'
        maxLength={5}
        secureTextEntry
      />

        <TouchableOpacity style={styles.btn} onPress={handleSave}>
          <Text style={{ color: '#fff' }}>Enviar</Text>
        </TouchableOpacity>

        <Text style={styles.info}>Caso não receba seu PIN pelo e-mail em 30 segundos ou mais, faça outra requisição</Text>

      </Animated.View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 100
  },
  modal: {
    bottom: -200,
    position: 'absolute',
    height: '100%',
    backgroundColor: '#fff',
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingLeft: 25,
    paddingRight: 25
  },
  indicator: {
    width: 75,
    height: 8,
    backgroundColor: '#ccC',
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 8
  },
  text: {
    marginTop: 50,
    textAlign: 'center'
  },
  btn: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#9b59b6',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 25,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  info: {
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 25,
    textAlign: "justify",
  },
})