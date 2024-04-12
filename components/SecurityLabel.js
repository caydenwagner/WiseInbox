import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { moderateScale } from '../functions/helpers';
import { lightPalette } from '../globalStyles/colors';
import { LARGE_TEXT } from '../globalStyles/sizes';

export const SecurityLabel = (props) => {
  var color = "white"
  var textColor = "white"

  if (props.securityLabel === "Safe") {
    color = lightPalette.safe
  }
  else if (props.securityLabel === "Caution") {
    color = lightPalette.warning
    textColor = "black"
  }
  else {
    color = lightPalette.unsafe
  }

  return (
    <View style={{...styles.labelContainer, backgroundColor: color, position: props.position}}>
      <Text style={{...styles.securityLabelText, color: textColor}}>{props.securityLabel}</Text>
    </View> 
  )
}

const styles = StyleSheet.create({
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