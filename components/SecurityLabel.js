import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { moderateScale, moderateVerticalScale } from '../functions/helpers';
import { lightPallete } from '../globalStyles/colors';
import SecurityIndicator from './SecurityIndicator';

export const SecurityLabel = (props) => {
  if (props.securityScore) {
    var color = "white"
    var label
    if (props.securityScore >= 80) {
      color = lightPallete.safe
      label = "Safe"
    }
    else if (props.securityScore >= 60) {
      color = lightPallete.warning
      label = "Caution"
    }
    else {
      color = lightPallete.unsafe
      label = "Unsafe"
    }
    return (
      <>
        <View style={{...styles.container, backgroundColor: color}}>
          <Text style={styles.securityLabelText}>{label}</Text>
        </View> 

        <SecurityIndicator 
          label={label}
          value={props.securityScore}
        />
      </>
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
    position: "absolute",
    left: moderateScale(108),
    top: moderateVerticalScale(6),
    backgroundColor: "#0A55C5",
    paddingVertical: moderateScale(4),
    paddingHorizontal: moderateScale(8),
    borderRadius: moderateScale(10),
    alignSelf: "flex-start",
  },
  securityLabelText: {
    fontSize: moderateScale(14), 
    fontWeight: "500",
    color: "#DBDBDB"
  }
})