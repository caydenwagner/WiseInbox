import React from 'react';
import { View, StyleSheet, Text, useColorScheme } from 'react-native';
import { moderateScale, moderateVerticalScale } from '../functions/helpers';
import { lightPalette } from '../globalStyles/colors';
import SecurityIndicator from './SecurityIndicator';
import { LARGE_TEXT } from '../globalStyles/sizes';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export const SecurityScanSection = (props) => {
  const isDarkMode = useColorScheme() === "dark"

  if (props.securityScore) {
    var color = "white"
    var textColor = "white"

    if (props.securityScore >= 80) {
      color = lightPalette.safe
      return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={props.headerTextStyle}>Security Scan:  </Text>
          <View style={{...styles.labelContainer, backgroundColor: color, position: 'relative', top: moderateVerticalScale(5)}}>
            <Text style={{...styles.securityLabelText, color: textColor}}>{props.label}</Text>
          </View> 
        </View>
      )
    }
    else if (props.securityScore >= 60) {
      color = lightPalette.warning
      textColor = "black"
    }
    else {
      color = lightPalette.unsafe
    }
    return (
      <>
        <Text style={props.headerTextStyle}>Security Scan: </Text>
        <View style={styles.container}>
          <SecurityIndicator 
            label={props.label}
            value={props.securityScore}
          />
          <View style={{...styles.labelContainer, backgroundColor: color}}>
            <Text style={{...styles.securityLabelText, color: textColor}}>{props.label}</Text>
          </View> 
        </View>
      </>
    )
  }
  else {
    return (
      <View>
        <Text style={props.headerTextStyle}>Security Scan: </Text>
        <SkeletonPlaceholder backgroundColor={isDarkMode ? 'grey' : 'lightgrey'} speed={900} highlightColor={isDarkMode ? "#1E1E1E" : '#E7E7E7'}>
          <SkeletonPlaceholder.Item height={moderateVerticalScale(110)}>
            <SkeletonPlaceholder.Item {...styles.loadingTextContainer}/>
            <SkeletonPlaceholder.Item {...styles.loadingCircleContainer}/>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: moderateVerticalScale(5),
    marginBottom: moderateVerticalScale(10)
  },
  labelContainer: {
    position: "absolute",
    left: moderateScale(0),
    backgroundColor: "#0A55C5",
    paddingVertical: moderateScale(4),
    paddingHorizontal: moderateScale(8),
    borderRadius: moderateScale(10),
  },
  securityLabelText: {
    fontSize: LARGE_TEXT, 
    fontWeight: "500",
    color: "#DBDBDB"
  },
  loadingTextContainer: {
    width: moderateScale(55),
    height: moderateVerticalScale(26), 
    borderRadius: moderateScale(10),
    marginVertical: moderateVerticalScale(10)
  },
  loadingCircleContainer: {
    width: moderateVerticalScale(90),
    height: moderateVerticalScale(90),
    borderRadius: 200,
    alignSelf: 'center',
    position: "absolute",
    top: moderateVerticalScale(10)
  }
})