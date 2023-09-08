// File: LoginScreen.js
// Author: Cayden Wagner
// Date: 09/7/23
// Purpose: Provide the login page for the application
import React, {useState} from 'react';
import { Text, SafeAreaView, StyleSheet, useColorScheme } from "react-native";
import { SmartTextInput } from '../components/textInputs';
import { light, dark } from "../globalStyles/colors";
import { moderateVerticalScale } from '../functions/helpers';
import { EXTRA_LARGE_TEXT } from '../globalStyles/sizes';

export default function LoginScreen() {
  const [userEmail, setUserEmail] = useState("")
  const isDarkMode = useColorScheme() === "dark"

  return ( 
    <SafeAreaView style={{...styles.background, backgroundColor: isDarkMode ? dark.primary.color : light.primary.color}}>
      <Text style={{...styles.headerText, color: isDarkMode ? dark.white.color : light.black.color}}>Add an Account</Text>
      <SmartTextInput
        placeholder="Enter your email"
        numberOfLines={1}
        value={userEmail}
        onChangeText={(val) => setUserEmail(val)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    height: "100%",
    width: "100%", 
  },
  headerText: {
    fontSize: EXTRA_LARGE_TEXT,
    fontWeight: "700",
    alignSelf: 'center',
    marginTop: moderateVerticalScale(60),
    marginBottom: moderateVerticalScale(8)
  }
})