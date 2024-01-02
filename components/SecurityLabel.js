import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { moderateScale, moderateVerticalScale } from '../functions/helpers';
import { lightPallete } from '../globalStyles/colors';
import SecurityIndicator from './SecurityIndicator';
import { LARGE_TEXT } from '../globalStyles/sizes';

export const SecurityLabel = (props) => {
  if (props.securityScore) {
    var color = "white"
    var textColor = "white"
    var label

    if (props.securityScore >= 80) {
      color = lightPallete.safe
      label = "Safe"
    }
    else if (props.securityScore >= 60) {
      color = lightPallete.warning
      label = "Caution"
      textColor = "black"
    }
    else {
      color = lightPallete.unsafe
      label = "Unsafe"
    }
    return (
      <View style={styles.container}>
        <SecurityIndicator 
          label={label}
          value={props.securityScore}
        />
        <View style={{...styles.labelContainer, backgroundColor: color}}>
          <Text style={{...styles.securityLabelText, color: textColor}}>{label}</Text>
        </View> 
      </View>
    )
  }
  else {
    return (
      <></>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: moderateVerticalScale(5)
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
  }
})