import React from 'react';
import { View, StyleSheet } from 'react-native';
import { moderateScale } from '../functions/helpers';
import { lightPalette } from '../globalStyles/colors';
import CircularProgress from 'react-native-circular-progress-indicator';

export default SecurityIndicator = (props) => {
  switch (props.label) {
    case "Unsafe": 
      return (
        <View style={styles.container}>
          <CircularProgress 
            value={props.value} 
            showProgressValue={false}
            activeStrokeColor={lightPalette.unsafe}
            activeStrokeWidth={moderateScale(12)}
            inActiveStrokeWidth={moderateScale(12)}
            inActiveStrokeColor='#EAA1A1'
            radius={moderateScale(45)}
          />
        </View>
      )
    case "Caution": 
      return (
        <View style={styles.container}>
          <CircularProgress 
            value={props.value} 
            showProgressValue={false}
            activeStrokeColor={lightPalette.warning}
            activeStrokeWidth={moderateScale(12)}
            inActiveStrokeWidth={moderateScale(12)}
            inActiveStrokeColor='#D6CA9F'
            radius={moderateScale(45)}
          />
        </View>
      )
    case "Safe": 
      return (
        <View style={styles.container}>
          <CircularProgress 
            value={props.value} 
            showProgressValue={false}
            activeStrokeColor={lightPalette.safe}
            activeStrokeWidth={moderateScale(12)}
            inActiveStrokeWidth={moderateScale(12)}
            inActiveStrokeColor='#92D2A5'
            radius={moderateScale(40)}
          />
        </View>
      )
    default:
      return <></>
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
})