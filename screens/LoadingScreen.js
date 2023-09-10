// File: LoadingScreen.js
// Author: Cayden Wagner
// Date: 09/10/23
// Purpose: Provide the laoding screen for the application
import React from 'react';
import { View, StyleSheet, Text, useColorScheme } from "react-native";
import { dark, light } from '../globalStyles/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { moderateScale, moderateVerticalScale } from '../functions/helpers';
import { EXTRA_LARGE_TEXT } from '../globalStyles/sizes';

export default function LoadingScreen({}) {
  const isDarkMode = useColorScheme() === "dark"
  const theme = isDarkMode ? dark : light

  return (
    <View style={{...styles.background, backgroundColor: theme.secondary.color}}> 
      <MaterialCommunityIcons 
        name="owl"
        color={isDarkMode ? dark.white.color : dark.secondary.color} 
        size={moderateScale(140)} />
      <Text style={{...styles.headerText, color: isDarkMode ? dark.white.color : dark.secondary.color}}>WiseInbox</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    width: "100%", 
    height: "100%",
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    marginTop: moderateVerticalScale(10),
    fontWeight: "700",
    fontSize: 1.8 * EXTRA_LARGE_TEXT,
  }
})