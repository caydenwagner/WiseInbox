// File: LoginScreen.js
// Author: Cayden Wagner
// Date: 09/7/23
// Purpose: Provide the login page for the application
import * as React from 'react';
import { Text, SafeAreaView, StyleSheet, useColorScheme } from "react-native";
import { SmartTextInput } from '../components/textInputs';

export default function LoginScreen() {
  return ( 
    <SafeAreaView>
      <SmartTextInput
        placeholder="Enter your email"
      />
    </SafeAreaView>
  );
}