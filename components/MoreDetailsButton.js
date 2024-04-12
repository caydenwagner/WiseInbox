import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, useColorScheme } from 'react-native';
import { moderateScale, moderateVerticalScale } from '../functions/helpers';
import { darkPalette, lightPalette } from '../globalStyles/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const MoreDetailsButton = (props) => {
  const isDarkMode = useColorScheme() === "dark"

  if (props.status === "Empty") {
    return (
      <TouchableOpacity onPress={() => props.fetch(props.email)}>
        <View style={styles.container}>
          <Text>Show Me More Details</Text>
        </View>
      </TouchableOpacity>
    )
  }
  else if (props.status === "Fetching") {
    return (
      <View style={styles.container}>
        <Text style={{color: isDarkMode ? "#E8E8E8" : "#272727"}}>Loading...</Text>
      </View>
    )
  }
  else if (props.status === "Fetched") {
    return (
      <TouchableOpacity onPress={() => props.setIsOpen(!props.isOpen)}>
        {
          !props.isOpen ? 
            <View style={styles.dropDownButton}>
              <Text style={{color: isDarkMode ? "#E8E8E8" : "#272727"}}>View More Details  </Text>
              <MaterialCommunityIcons 
                name="arrow-down-drop-circle-outline"
                color={isDarkMode ? darkPalette.white : lightPalette.black} 
                size={moderateScale(20)}
              />
            </View>
          :
            <View style={styles.dropDownButton}>
              <Text style={{color: isDarkMode ? "#E8E8E8" : "#272727"}}>Close Details  </Text>
              <MaterialCommunityIcons 
                name="arrow-up-drop-circle-outline"
                color={isDarkMode ? darkPalette.white : lightPalette.black} 
                size={moderateScale(20)}
              />
          </View>
        }
      </TouchableOpacity>
    )
  }
  else if (props.status === "Error") {
    return (
      <TouchableOpacity onPress={() => props.fetch(props.email)}>
        <View style={styles.container}>
          <Text style={{color: isDarkMode ? "#E8E8E8" : "#272727"}}>An Error has Occured, Try Again</Text>
        </View>
      </TouchableOpacity>
    )
  }
  return <></>
  
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", 
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: moderateVerticalScale(10)
  },
  dropDownButton: {
    flexDirection: "row", 
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: moderateVerticalScale(10)
  }
})