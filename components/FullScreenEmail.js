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
      <Text>Light - {props.email.body}</Text>
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
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
  },
  darkContentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
  },
})