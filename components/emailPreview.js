import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { dark, light } from '../globalStyles/colors';
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
          numberOfLines={1}>
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
        numberOfLines={1}>
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
        numberOfLines={1}>
          {props.message.snippet}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  darkBackground: {
    backgroundColor: dark.primary.color,
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateVerticalScale(15),
    borderBottomWidth: .2,
    borderBlockColor: dark.accent.color
  },
  lightBackgroud: {
    backgroundColor: light.primary.color,
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateVerticalScale(15),
    borderBottomWidth: .2,
    borderBlockColor: light.accent.color
  },
  headerContainer: {
    flexDirection: 'row-reverse', 
    marginBottom: 3,
  },
  darkSender: {
    fontSize: LARGE_TEXT,
    color: dark.white.color,
    fontWeight: "600",
    flex: 1
  },
  lightSender: {
    fontSize: LARGE_TEXT,
    color: light.black.color,
    fontWeight: "600",
    flex: 1
  },
  darkDate: {
    fontSize: SMALL_TEXT,
    color: dark.white.color,
    alignSelf: "flex-end",
  },
  lightDate: {
    fontSize: SMALL_TEXT,
    color: light.black.color,
    alignSelf: "flex-end",
  },
  darkSubject: {
    fontSize: MEDIUM_TEXT,
    color: dark.white.color,
    fontWeight: "600",
  },
  lightSubject: {
    fontSize: MEDIUM_TEXT,
    color: light.black.color,
    fontWeight: "600",
  },
  darkSnippet: {
    fontSize: SMALL_TEXT,
    color: dark.white.color,
  },
  lightSnippet: {
    fontSize: SMALL_TEXT,
    color: light.black.color,
  }
})