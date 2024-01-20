import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { darkPalette, lightPalette } from '../globalStyles/colors';
import { EXTRA_LARGE_TEXT, LARGE_TEXT } from '../globalStyles/sizes';
import { moderateScale, moderateVerticalScale } from '../functions/helpers';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from '@react-native-community/checkbox';


const SecurityModal = ({ visible, displayUrl, onClose, onContinue, url }) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
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
                Hang On
              </Text>
            </View>
            <Text style={{...styles.bodyText, color: pallette.alternate}}>
              The link you are about to open leads to:
            </Text>

            <View style={{...styles.linkContainer, backgroundColor: pallette.primary}}>
              <Text numberOfLines={1}>
                <Text style={{...styles.linkText, color: "grey"}}>
                  {displayUrl[0]}
                </Text>
                <Text style={{...styles.linkText, color: pallette.alternate, fontWeight: '600'}}>
                  {" "}{displayUrl[1]}{" "}
                </Text>
                <Text style={{...styles.linkText, color: "grey"}}>
                  {displayUrl[2]}
                </Text>
              </Text>
            </View>

            <Text style={{...styles.bodyText, color: pallette.alternate}}>
              Are you sure you want to go there?
            </Text>

            <View style={{flexDirection: "row", justifyContent: 'flex-start', alignItems: 'center', marginTop: moderateVerticalScale(20)}}> 
              <CheckBox
                style={{height: moderateScale(18), width: moderateScale(18), marginRight: moderateScale(8)}}
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                boxType={'square'}
                animationDuration={.2}
                lineWidth={2}
                tintColor={'#3366CC'}
                onCheckColor={isDarkMode ? pallette.alternate : pallette.primary}
                onFillColor={'#3366CC'}
              />
              <Text style={{...styles.bodyText, color: "#3366CC", fontWeight: '600'}}>
                Trust this Domain in the future
              </Text>
            </View>
            <View style={styles.buttonContainer}> 
              <TouchableOpacity style={styles.activeButtonContainer} onPress={onClose}>
                <Text style={styles.activeButtonText}>Go Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.inactiveButtonContainer} onPress={() => {onContinue(url, toggleCheckBox); setToggleCheckBox(false)}}>
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
  linkContainer: {
    backgroundColor: "black",
    marginVertical: moderateScale(6),
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(6),
    borderRadius: moderateScale(6),
    flexDirection: "row",
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    padding: moderateScale(20),
    backgroundColor: 'white',
    borderRadius: moderateScale(10),
    width: '90%',
  },
  warningText: {
    fontSize: EXTRA_LARGE_TEXT,
    fontWeight: '400',
    marginBottom: moderateVerticalScale(15),
    marginLeft: moderateVerticalScale(10)
  },
  bodyText: {
    fontSize: LARGE_TEXT,
    paddingVertical: moderateVerticalScale(3)
  },
  linkText: {
    fontSize: LARGE_TEXT,
    fontWeight: '400',
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