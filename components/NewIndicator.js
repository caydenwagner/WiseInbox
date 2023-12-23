import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { moderateScale } from '../functions/helpers';

export const NewIndicator = (props) => {
  if (props.isNew) {
    return (
      <View style={styles.container}>
        <Text style={styles.newText}>New</Text>
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
    backgroundColor: "#0A55C5",
    paddingVertical: moderateScale(4),
    paddingHorizontal: moderateScale(8),
    borderRadius: moderateScale(10),
    alignSelf: "flex-start",
  },
  newText: {
    fontSize: moderateScale(14), 
    fontWeight: "500",
    color: "#DBDBDB"
  }
})