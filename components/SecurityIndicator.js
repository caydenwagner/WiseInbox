import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { moderateScale, moderateVerticalScale } from '../functions/helpers';
import { lightPallete } from '../globalStyles/colors';
import CircularProgress from 'react-native-circular-progress-indicator';

export default SecurityIndicator = (props) => {
  switch (props.label) {
    case "Unsafe": 
      return (
        <CircularProgress value={props.value} />
      )
    case "Caution": 
      return (
        <CircularProgress value={props.value} />
      )
    case "Safe": 
      return (
        <CircularProgress value={props.value} />
      )
    default:
      return <></>
  }
}