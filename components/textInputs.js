// File: textInputs.js
// Author: Cayden Wagner
// Date: 05/9/23
// Purpose: Create some custom text inputs
import React from "react";
import { TouchableOpacity, useColorScheme, Text, TextInput, StyleSheet } from 'react-native';
import { moderateScale, moderateVerticalScale, scale } from "../functions/helpers";
import { light, dark } from "../globalStyles/colors";

const LightTextInput = (props) => {
  return (
    <TextInput 
      style={styles.lightTextInput}
      placeholderTextColor= {light.accent.color}
      {...props}
    />
  )
}

const DarkTextInput = (props) => {
  return (
    <TextInput 
      style={styles.darkTextInput}
      placeholderTextColor= {dark.accent.color}
      {...props}
    />
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
    backgroundColor: dark.primary.color,
    color: dark.accent.color,
    height: moderateVerticalScale(40),
    borderRadius: scale(10),
  },  
  lightTextInput: {
    backgroundColor: light.primary.color,
    color: light.accent.color,
    height: moderateVerticalScale(40),
    borderRadius: scale(10),
  }
})