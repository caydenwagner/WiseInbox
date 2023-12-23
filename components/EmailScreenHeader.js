import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, useColorScheme } from "react-native";
import { EXTRA_LARGE_TEXT } from '../globalStyles/sizes';
import { moderateScale, moderateVerticalScale } from '../functions/helpers';
import { darkPallete, lightPallete } from '../globalStyles/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const EmailScreenHeader = (props) => {
  const isDarkMode = useColorScheme() === "dark"

  if (isDarkMode) {
    return (
      <DarkHeader 
        handleRefresh={props.handleRefresh} 
        handleLogOut={props.handleLogOut}
      />
    )
  }
  return (
    <LightHeader 
      handleRefresh={props.handleRefresh}
      handleLogOut={props.handleLogOut}
    />
  )
}

const DarkHeader = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => props.handleRefresh()}>
        <MaterialCommunityIcons 
          name="refresh"
          color={darkPallete.white} 
          size={moderateScale(30)}
        />
      </TouchableOpacity>

      <Text style={styles.darkHeader}>Inbox</Text>

      <TouchableOpacity onPress={() => props.handleLogOut()}>
        <MaterialCommunityIcons 
          name="account-circle"
          color={darkPallete.white} 
          size={moderateScale(30)}
        />
      </TouchableOpacity>
      
    </View>
  )
}

const LightHeader = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => props.handleRefresh()}>
        <MaterialCommunityIcons 
          name="refresh"
          color={lightPallete.black} 
          size={moderateScale(30)}
        />
      </TouchableOpacity>
      <Text style={styles.lightHeader}>Inbox</Text>

      <TouchableOpacity onPress={() => props.handleLogOut()}>
        <MaterialCommunityIcons 
          name="account-circle"
          color={lightPallete.black} 
          size={moderateScale(30)}
        />
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: moderateScale(20),
    marginBottom: moderateVerticalScale(10),
  },
  darkHeader: {
    color: darkPallete.white,
    fontSize: EXTRA_LARGE_TEXT,
    fontWeight: "700",
    justifyContent: 'center',
  },
  lightHeader: {
    color: lightPallete.black,
    fontSize: EXTRA_LARGE_TEXT,
    fontWeight: "700",
  }
})