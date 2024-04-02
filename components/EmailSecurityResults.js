import React from 'react';
import { Text, View, StyleSheet, useColorScheme } from 'react-native';
import { moderateVerticalScale } from '../functions/helpers';
import { SecurityLabel } from './SecurityLabel';
import { LARGE_TEXT, MEDIUM_TEXT } from '../globalStyles/sizes';

export const EmailSecurityResults = (props) => {
  const isDarkMode = useColorScheme() === "dark"

  if (props.visible) {
    return (
      props.data.map((item, index) => (
        <FlatListItem 
          key={index}
          isDarkMode={isDarkMode}
          title={item.title} 
          description={item.description} 
          securityLabel={item.securityLabel} 
        />
      ))
    )
  }
  else return <></>
}

const FlatListItem = ({ title, description, securityLabel, isDarkMode }) => (
  <View style={styles.itemContainer}>
    <View style={isDarkMode ? styles.darkDivider : styles.lightDivider}></View>
    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginVertical: moderateVerticalScale(8)}}>
      <Text style={{...styles.title, color: isDarkMode ? "#E8E8E8" : "#272727"}}>{title}</Text>
      <SecurityLabel 
        securityLabel={securityLabel}
        position={'relative'}
      />
    </View>
    <Text style={{...styles.description, color: isDarkMode ? "#E8E8E8" : "#272727"}}>{description}</Text>
  </View>
);

const styles = StyleSheet.create({
  itemContainer: {

  },
  title: {
    fontSize: LARGE_TEXT,
    fontWeight: 'bold',
  },
  description: {
    fontSize: MEDIUM_TEXT,
  },
  lightDivider: {
    borderColor: "#BEBEBE",
    borderTopWidth: .75,
    alignSelf: "center",
    width: "150%",
    marginTop: moderateVerticalScale(10)
  },
  darkDivider: {
    borderColor: "#4B4B4B",
    borderTopWidth: .75,
    alignSelf: "center",
    width: "150%",
    marginTop: moderateVerticalScale(10)
  },
});