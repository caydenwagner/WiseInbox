import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { dark, light } from '../globalStyles/colors';
import { moderateScale, moderateVerticalScale } from '../functions/helpers';
import { LARGE_TEXT, MEDIUM_TEXT, SMALL_TEXT } from '../globalStyles/sizes';

export const FullScreenEmail = (props) => {
  const isDarkMode = useColorScheme() === "dark"

  if (!props.email) {
    return <></>
  }

  if (isDarkMode) {
    return <DarkFullScreenEmail email={props.email}/>
  }
  else {
    return <LightFullScreenEmail email={props.email}/>
  }
}

const LightFullScreenEmail = (props) => {
  return (
    <View style={styles.lightContentContainer}>
      <Text style={styles.lightHeaderText}>From:</Text>
      <Text style={styles.lightInfoText}>{props.email.sender}</Text>
      <View style={styles.lightDivider}></View>
      <Text style={styles.lightHeaderText}>Subject:</Text>
      <Text style={styles.lightInfoText}>{props.email.subject}</Text>
      <View style={styles.lightDivider}></View>
      <Text style={styles.lightHeaderText}>Security Scan:</Text>
      <View style={styles.lightDivider}></View>
      <Text style={styles.lightHeaderText}>{props.email.body}</Text>
    </View>
  )
}

const DarkFullScreenEmail = (props) => {
  return (
    <View style={styles.darkContentContainer}>
      <Text>Dark - {props.email.body}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  lightContentContainer: {
    flex: 1,
    paddingHorizontal: moderateScale(20),
  },
  darkContentContainer: {
    flex: 1,
    paddingHorizontal: moderateScale(20),
  },
  lightHeaderText: {
    fontSize: moderateScale(14),
    color: "#272727"
  },
  lightInfoText: {
    fontSize: moderateScale(16),
    color: "black",
    fontWeight: "500",
    marginTop: moderateVerticalScale(5), 
  },
  lightDivider: {
    borderColor: "#BEBEBE",
    borderTopWidth: .75,
    alignSelf: "center",
    width: "150%",
    marginVertical: moderateVerticalScale(10)
  }
})