import React, { useState } from 'react';
import { View, StyleSheet, Text, useColorScheme, TouchableOpacity } from 'react-native';
import { moderateScale, moderateVerticalScale } from '../functions/helpers';
import { darkPalette, lightPalette } from '../globalStyles/colors';
import SecurityIndicator from './SecurityIndicator';
import { EXTRA_LARGE_TEXT, LARGE_TEXT } from '../globalStyles/sizes';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { EmailSecurityResults } from './EmailSecurityResults';
import { SecurityLabel } from './SecurityLabel';

export const SecurityScanSection = (props) => {
  const [ moreDetailsIsOpen, setMoreDetailsIsOpen ] = useState(false)
  const isDarkMode = useColorScheme() === "dark"

  if (props.securityScore) {
    var color = "white"
    var textColor = "white"

    if (props.securityLabel === "Safe") {
      color = lightPalette.safe
      return (
        <>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row'}}>
            <Text style={props.headerTextStyle}>Security Scan:  </Text>
            <View style={{top: moderateVerticalScale(8)}}>
              <SecurityLabel 
                securityLabel={props.securityLabel}
                position={'relative'}
              />
            </View>
            </View>
            <TouchableOpacity onPress={() => setMoreDetailsIsOpen(!moreDetailsIsOpen)}>
              {
                !moreDetailsIsOpen ? 
                  <View style={styles.dropDownButton}>
                    <Text>View More Details</Text>
                    <MaterialCommunityIcons 
                      name="arrow-down-drop-circle-outline"
                      color={isDarkMode ? darkPalette.white : lightPalette.black} 
                      size={moderateScale(20)}
                    />
                  </View>
                :
                  <View style={styles.dropDownButton}>
                    <Text>Close Details</Text>
                    <MaterialCommunityIcons 
                      name="arrow-up-drop-circle-outline"
                      color={isDarkMode ? darkPalette.white : lightPalette.black} 
                      size={moderateScale(20)}
                    />
                </View>
              }
            </TouchableOpacity>
          </View>
          <EmailSecurityResults
            data={props.resultsArray}
            visible={moreDetailsIsOpen}
          />
        </>
      )
    }
    else if (props.securityLabel === "Caution") {
      color = lightPalette.warning
      textColor = "black"
    }
    else {
      color = lightPalette.unsafe
    }
    return (
      <>
        <View style={{flexDirection: "row", justifyContent: 'space-between', alignContent: 'center'}}>
          <Text style={props.headerTextStyle}>Security Scan: </Text>
          <TouchableOpacity onPress={() => setMoreDetailsIsOpen(!moreDetailsIsOpen)}>
            {
              !moreDetailsIsOpen ? 
                <View style={styles.dropDownButton}>
                  <Text>View More Details</Text>
                  <MaterialCommunityIcons 
                    name="arrow-down-drop-circle-outline"
                    color={isDarkMode ? darkPalette.white : lightPalette.black} 
                    size={moderateScale(20)}
                  />
                </View>
              :
                <View style={styles.dropDownButton}>
                  <Text>Close Details</Text>
                  <MaterialCommunityIcons 
                    name="arrow-up-drop-circle-outline"
                    color={isDarkMode ? darkPalette.white : lightPalette.black} 
                    size={moderateScale(20)}
                  />
              </View>
            }
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <SecurityIndicator 
            label={props.securityLabel}
            value={props.securityScore}
          />
          <SecurityLabel
            securityLabel={props.securityLabel}
            position={'absolute'}
          />
          <EmailSecurityResults
            data={props.resultsArray}
            visible={moreDetailsIsOpen}
          />
        </View>
      </>
    )
  }
  else {
    if (props.predictionLoadingStatus === "Error") {
      return (
        <View style={styles.errorContainer}>
          <Text style={{...styles.errorLabelText, color: isDarkMode ? darkPalette.alternate : lightPalette.alternate}}>
            Something went wrong
          </Text>
          <Text style={{...styles.secondaryErrorLabelText, color: isDarkMode ? "lightgrey" : "grey"}}>
            Try Refreshing
          </Text>
          <TouchableOpacity onPress={() => props.onRefresh(props.email)}>
            <Text style={styles.refreshText}>Refresh</Text>
          </TouchableOpacity>
        </View>
      )
    }
    return (
      <View>
        <Text style={props.headerTextStyle}>Security Scan: </Text>
        <SkeletonPlaceholder backgroundColor={isDarkMode ? 'grey' : '#BEBEBE'} speed={1100} highlightColor={isDarkMode ? "#1E1E1E" : '#E7E7E7'}>
          <SkeletonPlaceholder.Item height={moderateVerticalScale(100)}>
            <SkeletonPlaceholder.Item {...styles.loadingTextContainer}/>
            <SkeletonPlaceholder.Item {...styles.loadingCircleContainer}/>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: moderateVerticalScale(5),
    marginBottom: moderateVerticalScale(10)
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
  },
  loadingTextContainer: {
    width: moderateScale(55),
    height: moderateVerticalScale(26), 
    borderRadius: moderateScale(10),
    marginVertical: moderateVerticalScale(10)
  },
  loadingCircleContainer: {
    width: moderateVerticalScale(90),
    height: moderateVerticalScale(90),
    borderRadius: 200,
    alignSelf: 'center',
    position: "absolute",
    top: moderateVerticalScale(10)
  },
  errorLabelText: {
    fontSize: EXTRA_LARGE_TEXT, 
  },
  secondaryErrorLabelText: {
    fontSize: LARGE_TEXT, 
    marginVertical: moderateVerticalScale(5)
  },
  errorContainer: {
    alignItems: "center",
    marginVertical: moderateVerticalScale(20),
  },
  refreshText: {
    fontSize: LARGE_TEXT, 
    marginTop: moderateVerticalScale(20),
    color: "#3366CC",
    fontWeight: "600"
  },
  dropDownButton: {
    flexDirection: "row", 
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: moderateVerticalScale(10)
  }
})