import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, useColorScheme } from "react-native";
import { EXTRA_LARGE_TEXT } from '../globalStyles/sizes';
import { moderateScale, moderateVerticalScale } from '../functions/helpers';
import { dark, light } from '../globalStyles/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const EmailScreenHeader = (props) => {
  const isDarkMode = useColorScheme() === "dark"

  if (isDarkMode) {
    return <DarkHeader handleRefresh={props.handleRefresh}/>
  }
  return <LightHeader handleRefresh={props.handleRefresh}/>
}

const DarkHeader = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => props.handleRefresh()}>
        <MaterialCommunityIcons 
          name="refresh"
          color={dark.white.color} 
          size={moderateScale(30)}
        />
      </TouchableOpacity>
      <Text style={styles.darkHeader}>Inbox</Text>
      <MaterialCommunityIcons 
        name="account-circle"
        color={dark.white.color} 
        size={moderateScale(30)}
      />
    </View>
  )
}

const LightHeader = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => props.handleRefresh()}>
        <MaterialCommunityIcons 
          name="refresh"
          color={light.black.color} 
          size={moderateScale(30)}
        />
      </TouchableOpacity>
      <Text style={styles.lightHeader}>Inbox</Text>
      <MaterialCommunityIcons 
        name="account-circle"
        color={light.black.color} 
        size={moderateScale(30)}
      />
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
    color: dark.white.color,
    fontSize: EXTRA_LARGE_TEXT,
    fontWeight: "700",
    justifyContent: 'center',
  },
  lightHeader: {
    color: light.black.color,
    fontSize: EXTRA_LARGE_TEXT,
    fontWeight: "700",
  }
})