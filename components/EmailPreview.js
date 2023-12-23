import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { darkPallete, lightPallete } from '../globalStyles/colors';
import { moderateScale, moderateVerticalScale } from '../functions/helpers';
import { LARGE_TEXT, MEDIUM_TEXT, SMALL_TEXT } from '../globalStyles/sizes';

export const EmailPreview = (props) => {
  const isDarkMode = useColorScheme() === "dark"

  if (isDarkMode) {
    return <DarkEmailPreview message={props.message}/>
  }
  return <LightEmailPreview message={props.message}/>
}

const LightEmailPreview = (props) => {
  return (
    <View style={styles.lightBackgroud}>
      <View style={styles.headerContainer}>
        <Text 
          style={styles.lightDate}
          numberOfLines={2}>
            {props.message.date}
        </Text>

        <Text
          style={styles.lightSender}
          numberOfLines={1}>
            {props.message.sender}
        </Text>
      </View>
      
      <Text 
        style={styles.lightSubject}
        numberOfLines={1}>
          {props.message.subject}
      </Text>

      <Text 
        style={styles.lightSnippet}
        numberOfLines={2}>
          {props.message.snippet}
      </Text>
    </View>
  )
}

const DarkEmailPreview = (props) => {
  return (
    <View style={styles.darkBackground}>
      <View style={styles.headerContainer}>
        <Text 
          style={styles.darkDate}
          numberOfLines={1}>
            {props.message.date}
        </Text>

        <Text
          style={styles.darkSender}
          numberOfLines={1}>
            {props.message.sender}
        </Text>
      </View>

      <Text 
        style={styles.darkSubject}
        numberOfLines={1}>
          {props.message.subject}
      </Text>

      <Text 
        style={styles.darkSnippet}
        numberOfLines={2}>
          {props.message.snippet}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  darkBackground: {
    backgroundColor: darkPallete.primary,
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateVerticalScale(15),
    borderTopWidth: .2,
    borderBlockColor: darkPallete.accent
  },
  lightBackgroud: {
    backgroundColor: lightPallete.primary,
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateVerticalScale(15),
    borderTopWidth: .2,
    borderBlockColor: lightPallete.accent
  },
  headerContainer: {
    flexDirection: 'row-reverse', 
    marginBottom: 3,
  },
  darkSender: {
    fontSize: LARGE_TEXT,
    color: darkPallete.white,
    fontWeight: "600",
    flex: 1
  },
  lightSender: {
    fontSize: LARGE_TEXT,
    color: lightPallete.black,
    fontWeight: "600",
    flex: 1
  },
  darkDate: {
    fontSize: SMALL_TEXT,
    color: darkPallete.white,
    alignSelf: "flex-end",
  },
  lightDate: {
    fontSize: SMALL_TEXT,
    color: lightPallete.black,
    alignSelf: "flex-end",
  },
  darkSubject: {
    fontSize: MEDIUM_TEXT,
    color: darkPallete.white,
    fontWeight: "600",
  },
  lightSubject: {
    fontSize: MEDIUM_TEXT,
    color: lightPallete.black,
    fontWeight: "600",
  },
  darkSnippet: {
    fontSize: SMALL_TEXT,
    color: darkPallete.white,
  },
  lightSnippet: {
    fontSize: SMALL_TEXT,
    color: lightPallete.black,
  }
})