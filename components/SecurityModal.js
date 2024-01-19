import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { darkPalette, lightPalette } from '../globalStyles/colors';
import { EXTRA_LARGE_TEXT, LARGE_TEXT } from '../globalStyles/sizes';
import { moderateScale, moderateVerticalScale } from '../functions/helpers';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


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
      <TouchableOpacity 
        style={styles.container} 
        activeOpacity={1} 
        onPress={onClose}>
        <View style={styles.modalContainer}>
          <TouchableOpacity 
            activeOpacity={1}
            style={{...styles.modalContent, backgroundColor: pallette.background}}>
            <View style={{flexDirection: "row"}}> 
              <MaterialCommunityIcons 
                name="shield-alert-outline"
                color={pallette.alternate} 
                size={moderateScale(30)}
              />
              <Text style={{...styles.warningText, color: pallette.alternate}}>
                Caution: Security Alert
              </Text>
            </View>
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
              <TouchableOpacity style={styles.activeButtonContainer} onPress={onClose}>
                <Text style={styles.activeButtonText}>Go Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.inactiveButtonContainer} onPress={onContinue}>
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    padding: moderateScale(20),
    backgroundColor: 'white',
    borderRadius: 10,
    width: '90%',
  },
  warningText: {
    marginLeft: moderateScale(10),
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
    marginTop: moderateVerticalScale(20),
    flexDirection: "row", 
    justifyContent: "space-around"
  },
  activeButtonContainer: {
    paddingVertical: moderateScale(8),
    paddingHorizontal: moderateScale(16),
    borderRadius: moderateScale(6),
    alignItems: 'center',
    backgroundColor: "#3366CC",
    justifyContent: 'space-around',
  },
  inactiveButtonContainer: {
    paddingVertical: moderateScale(8),
    paddingHorizontal: moderateScale(16),
    borderRadius: moderateScale(6),
    alignItems: 'center',
    borderWidth: 2,
    borderColor: "#3366CC",
    justifyContent: 'space-around',
  },
  activeButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: LARGE_TEXT,
  },
  buttonText: {
    color: '#3366CC',
    fontWeight: '600',
    fontSize: LARGE_TEXT,
  },
});

export default SecurityModal;