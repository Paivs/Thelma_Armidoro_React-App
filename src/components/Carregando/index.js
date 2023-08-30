import React from 'react';
import { Modal, View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingModal = ({ isVisible }) => {
  return (
    <Modal
      transparent={true}
      animationType="none"
      visible={isVisible}
    >
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator animating={isVisible} size="large" color="white" />
          <Text style={styles.texto}>Carregando...</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#8868A5',
    borderRadius: 10,
    padding: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  texto: {
    color: "white",
    marginTop: 10,
    fontWeight: 'bold'
  }
});

export default LoadingModal;
