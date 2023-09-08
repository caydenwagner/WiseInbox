// File: textInputs.js
// Author: Cayden Wagner
// Date: 05/9/23
// Purpose: Create some custom text inputs
import React from "react";
import { TouchableOpacity, useColorScheme, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { moderateScale, moderateVerticalScale, scale } from "../functions/helpers";
import { light, dark } from "../globalStyles/colors";
import { MEDIUM_TEXT } from "../globalStyles/sizes";

const LightTextInput = (props) => {
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps='handled'
    >
      <TextInput 
        style={styles.lightTextInput}
        placeholderTextColor= {light.accent.color}
        {...props}
      />
    </ScrollView>
  )
}

const DarkTextInput = (props) => {
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps='handled'
    >
      <TextInput 
        style={styles.darkTextInput}
        placeholderTextColor= {dark.accent.color}
        {...props}
      />
    </ScrollView>
  )
}

const SmartTextInput = (props) => {
  const isDarkMode = useColorScheme() === "dark"
  if (isDarkMode) {
    return <DarkTextInput {...props}/>
  }
  else {
    return <LightTextInput {...props}/>
  }
}

export {LightTextInput, DarkTextInput, SmartTextInput}

const styles = StyleSheet.create({
  darkTextInput: {
    backgroundColor: dark.secondary.color,
    color: dark.white.color,
    height: moderateVerticalScale(35),
    borderRadius: scale(4),
    marginHorizontal: moderateScale(15),
    paddingHorizontal: moderateScale(15),
    fontSize: MEDIUM_TEXT,
  },  
  lightTextInput: {
    backgroundColor: light.secondary.color,
    color: light.black.color,
    height: moderateVerticalScale(35),
    borderRadius: scale(4),
    marginHorizontal: moderateScale(15),
    paddingHorizontal: moderateScale(15),
    fontSize: MEDIUM_TEXT,
  }
})