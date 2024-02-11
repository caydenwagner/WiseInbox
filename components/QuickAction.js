import React from 'react';
import { Text, View, StyleSheet, useColorScheme } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { moderateScale, moderateVerticalScale } from '../functions/helpers';
import { LARGE_TEXT } from '../globalStyles/sizes';


export const QuickAction = ({ label, isToggled, setToggled }) => {
  const isDarkMode = useColorScheme() === "dark"

  return (
    <View style={styles.container}>
      <CheckBox
        style={{height: moderateScale(18), width: moderateScale(18), marginRight: moderateScale(8)}}
        value={isToggled}
        onValueChange={(newValue) => setToggled(newValue)}
        boxType={'square'}
        animationDuration={.2}
        lineWidth={2}
        tintColor={isDarkMode ? "white" : "black"}
        onCheckColor={isDarkMode ? "white" : "black"}
        onTintColor={isDarkMode ? "white" : "black"}
      />

      <Text style={{...styles.labelText, color: isDarkMode ? "white" : "black"}}>
        {label}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: moderateVerticalScale(10)
  },
  labelText: {
    fontSize: moderateScale(16),
    marginLeft: moderateScale(2)
  }
})