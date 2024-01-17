import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';

const SecurityModal = ({ visible, displayUrl, onClose, onContinue }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.warningText}>
            Caution: Security Alert
          </Text>
          <Text>
            Our system has detected signs of suspicious content in this email.
            The link you are about to open leads to:
          </Text>
          <Text style={styles.urlText}>{displayUrl}</Text>
          <Text>Proceed with caution.</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.buttonText}>Go Back</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onContinue}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '80%',
  },
  warningText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  urlText: {
    color: 'blue',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  buttonText: {
    color: 'blue',
    fontSize: 16,
  },
});

export default SecurityModal;