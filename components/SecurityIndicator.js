import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { moderateScale, moderateVerticalScale } from '../functions/helpers';
import { lightPallete } from '../globalStyles/colors';
import CircularProgress from 'react-native-circular-progress-indicator';
import { LARGE_TEXT, MEDIUM_TEXT } from '../globalStyles/sizes';

export default SecurityIndicator = (props) => {
  switch (props.label) {
    case "Unsafe": 
      return (
        <View style={styles.container}>
          <CircularProgress 
            value={props.value} 
            showProgressValue={false}
            activeStrokeColor={lightPallete.unsafe}
            activeStrokeWidth={moderateScale(12)}
            inActiveStrokeWidth={moderateScale(12)}
            inActiveStrokeColor='#EAA1A1'
            radius={moderateScale(45)}
            titleStyle={styles.titleStyle}
          />
        </View>
      )
    case "Caution": 
      return (
        <View style={styles.container}>
          <CircularProgress 
            value={props.value} 
            showProgressValue={false}
            activeStrokeColor={lightPallete.warning}
            activeStrokeWidth={moderateScale(12)}
            inActiveStrokeWidth={moderateScale(12)}
            inActiveStrokeColor='#D6CA9F'
            radius={moderateScale(45)}
            titleStyle={styles.titleStyle}
          />
        </View>
      )
    case "Safe": 
      return (
        <View style={styles.container}>
          <CircularProgress 
            value={props.value} 
            showProgressValue={false}
            activeStrokeColor={lightPallete.safe}
            activeStrokeWidth={moderateScale(12)}
            inActiveStrokeWidth={moderateScale(12)}
            inActiveStrokeColor='#92D2A5'
            radius={moderateScale(40)}
            titleStyle={styles.titleStyle}
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
  titleStyle: {
    fontSize: LARGE_TEXT,
    fontWeight: '500'
  }
})