import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { moderateScale, moderateVerticalScale } from '../functions/helpers';
import { LARGE_TEXT } from '../globalStyles/sizes';
import { NewIndicator } from './NewIndicator'; 
import { SecurityLabel } from './SecurityLabel';

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
    <View style={styles.contentContainer}>
      <View style={styles.headerContainer}>
        <Text style={{...styles.lightHeaderText, alignSelf: 'center', alignItems: 'flex-end'}}>{props.email.date}</Text>
        <NewIndicator isNew={!props.email.isRead}/>
      </View>
      <Text style={styles.lightHeaderText}>From:</Text>
      <Text style={styles.lightInfoText}>{props.email.sender}</Text>
      <View style={styles.lightDivider}></View>
      <Text style={styles.lightHeaderText}>Subject:</Text>
      <Text style={styles.lightInfoText}>{props.email.subject}</Text>
      <View style={styles.lightDivider}></View>
      <View style={styles.securityScanContainer}>
        <Text style={styles.lightHeaderText}>Security Scan:</Text>
        <SecurityLabel securityScore={props.email.securityScore}/>
      </View>
      <View style={styles.lightDivider}></View>
      <Text style={{...styles.lightHeaderText, color: "black"}}>{props.email.body}</Text>
    </View>
  )
}

const DarkFullScreenEmail = (props) => {
  return (
    <View style={styles.contentContainer}>
      <View style={styles.headerContainer}>
        <Text style={{...styles.darkHeaderText, alignSelf: 'center', alignItems: 'flex-end'}}>{props.email.date}</Text>
        <NewIndicator isNew={!props.email.isRead}/>
      </View>
      <Text style={styles.darkHeaderText}>From:</Text>
      <Text style={styles.darkInfoText}>{props.email.sender}</Text>
      <View style={styles.darkDivider}></View>
      <Text style={styles.darkHeaderText}>Subject:</Text>
      <Text style={styles.darkInfoText}>{props.email.subject}</Text>
      <View style={styles.darkDivider}></View>
      <View style={styles.securityScanContainer}>
        <Text style={styles.darkHeaderText}>Security Scan:</Text>
        <SecurityLabel securityScore={props.email.securityScore}/>
      </View>
      <View style={styles.darkDivider}></View>
      <Text style={{...styles.darkHeaderText, color: "white"}}>{props.email.body}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: moderateScale(20),
  },
  headerContainer: {
    flexDirection: "row-reverse", 
    marginBottom: moderateVerticalScale(10), 
    justifyContent: 'space-between'
  },
  securityScanContainer: {
    flexDirection: "row",
  },
  lightHeaderText: {
    fontSize: LARGE_TEXT,
    marginTop: moderateVerticalScale(10),
    color: "#272727"
  },
  darkHeaderText: {
    fontSize: LARGE_TEXT,
    marginTop: moderateVerticalScale(10),
    color: "#E8E8E8"
  },
  lightInfoText: {
    fontSize: moderateScale(16),
    color: "black",
    fontWeight: "500",
    marginTop: moderateVerticalScale(5), 
  },
  darkInfoText: {
    fontSize: moderateScale(16),
    color: "white",
    fontWeight: "500",
    marginTop: moderateVerticalScale(5), 
  },
  lightDivider: {
    borderColor: "#BEBEBE",
    borderTopWidth: .75,
    alignSelf: "center",
    width: "150%",
    marginTop: moderateVerticalScale(10)
  },
  darkDivider: {
    borderColor: "#4B4B4B",
    borderTopWidth: .75,
    alignSelf: "center",
    width: "150%",
    marginTop: moderateVerticalScale(10)
  }
})