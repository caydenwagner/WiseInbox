// File: textInputs.js
// Author: Cayden Wagner
// Date: 05/9/23
// Purpose: Create some custom text inputs
import React from "react";
import { TouchableOpacity, useColorScheme, Text, TextInput } from 'react-native';
import { light, dark } from "../globalStyles/colors";

const LightTextInput = ({props}) => {
  return (
    <TextInput 
      style={{backgroundColor: light.primary.color, borderRadius: 8, justifyContent: 'center', alignItems: 'center'}}>
    </TextInput>
  )
}

const DarkTextInput = ({props}) => {
  return (
    <TextInput 
      style={{backgroundColor: dark.primary.color, borderRadius: 8, justifyContent: 'center', alignItems: 'center'}}>
    </TextInput>
  )
}

const SmartTextInput = ({props}) => {
  const isDarkMode = useColorScheme() === "dark"
  if (isDarkMode) {
    return <DarkTextInput props={props}/>
  }
  else {
    return <LightTextInput props={props}/>
  }
}

export {LightTextInput, DarkTextInput, SmartTextInput}