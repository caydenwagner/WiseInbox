import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { darkPalette, lightPalette } from '../globalStyles/colors';
import { EXTRA_LARGE_TEXT, LARGE_TEXT, MEDIUM_TEXT } from '../globalStyles/sizes';
import { moderateScale, moderateVerticalScale } from '../functions/helpers';

const SecurityModal = ({ visible, displayUrl, onClose, onContinue }) => {
  const isDarkMode = useColorScheme() === "dark"
  var pallette = isDarkMode ? darkPalette : lightPalette

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={{...styles.modalContent, backgroundColor: pallette.background}}>
          <Text style={{...styles.warningText, color: pallette.alternate}}>
            Caution: Security Alert
          </Text>
          <Text style={{...styles.bodyText, color: pallette.alternate}}>
            The link you are about to open leads to:
          </Text>
          <Text style={{...styles.bodyText, color: isDarkMode ? "#3366CC" : "#0000FF"}}>
            {displayUrl}
          </Text>
          <Text style={{...styles.bodyText, color: pallette.alternate}}>
            Proceed with caution.
          </Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    padding: moderateScale(20),
    backgroundColor: 'white',
    borderRadius: 10,
    width: '90%',
  },
  warningText: {
    fontSize: EXTRA_LARGE_TEXT,
    fontWeight: '400',
    marginBottom: moderateVerticalScale(8)
  },
  bodyText: {
    fontSize: LARGE_TEXT,
    marginTop: moderateVerticalScale(3)
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