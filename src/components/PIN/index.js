
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, TextInput } from 'react-native'

const { height } = Dimensions.get('window')

const PinPopup = ({ show, close }) => {
  const [pin, setPin] = useState('');
  const [state, setState] = useState({
    opacity: new Animated.Value(0),
    container: new Animated.Value(height),
    modal: new Animated.Value(height)
  })

  const openModal = () => {
    Animated.sequence([
      Animated.timing(state.container, { toValue: 0, duration: 100 }),
      Animated.timing(state.opacity, { toValue: 1, duration: 300 }),
      Animated.spring(state.modal, { toValue: 0, bounciness: 5, useNativeDriver: true })
    ]).start()
  }

  const closeModal = () => {
    Animated.sequence([
      Animated.timing(state.modal, { toValue: height, duration: 250, useNativeDriver: true }),
      Animated.timing(state.opacity, { toValue: 0, duration: 300 }),
      Animated.timing(state.container, { toValue: height, duration: 100 })
    ]).start()
  }

  useEffect(() => {
    if (show) {
      openModal()
    } else {
      closeModal()
    }
  }, [show])

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
        value={pin}
        onChangeText={setPin}
        keyboardType="numeric"
        placeholder="Digite seu PIN aqui"
        maxLength={4}
        secureTextEntry
      />

        <TouchableOpacity style={styles.btn} onPress={close}>
          <Text style={{ color: '#fff' }}>Close</Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    //backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    zIndex: 100
  },
  modal: {
    bottom: 0,
    position: 'absolute',
    height: '50%',
    backgroundColor: '#fff',
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingLeft: 25,
    paddingRight: 25
  },
  indicator: {
    width: 50,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 5
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
})

export default PinPopup