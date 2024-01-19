import React, { useState } from 'react';
import { View, Text, StyleSheet, useColorScheme, Dimensions, Linking } from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview'
import { moderateScale, moderateVerticalScale } from '../functions/helpers';
import { LARGE_TEXT } from '../globalStyles/sizes';
import { NewIndicator } from './NewIndicator'; 
import { SecurityLabel } from './SecurityLabel';
import SecurityModal from './SecurityModal';

export const FullScreenEmail = (props) => {
  if (!props.email) {
    return <></>
  }

  return <AutoThemeFullScreenEmail email={props.email}/>
}

const AutoThemeFullScreenEmail = (props) => {
  const [isModalVisible, setModalVisible] = useState(false)
  const [url, setUrl] = useState("")
  const [displayUrl, setDisplayUrl] = useState("")
  const isDarkMode = useColorScheme() === "dark"

  var headerTextStyle = isDarkMode ? styles.darkHeaderText : styles.lightHeaderText
  var infoTextStyle = isDarkMode ? styles.darkInfoText : styles.lightInfoText
  var dividerStyle = isDarkMode ? styles.darkDivider : styles.lightDivider



  return (
    <>
      <SecurityModal 
        visible={isModalVisible}
        displayUrl={displayUrl}
        onClose={() => setModalVisible(false)}
        onContinue={() => {Linking.openURL(url); setModalVisible(false)}}
      />

      
      <View style={styles.contentContainer}>
        { props.email.isRead ? 
          <>
            <View style={styles.headerContainer}>
              <Text style={headerTextStyle}>{props.email.date}</Text>
              <Text style={headerTextStyle}>From:</Text>
            </View>
          </>
        : 
          <>
            <View style={styles.headerContainer}>
              <Text style={headerTextStyle}>{props.email.date}</Text>
              <NewIndicator isNew={!props.email.isRead}/>
            </View>
            <Text style={headerTextStyle}>From:</Text>
          </>
        }
        <Text style={infoTextStyle}>{props.email.sender}</Text>
        <View style={dividerStyle}></View>
        <Text style={headerTextStyle}>Subject:</Text>
        <Text style={infoTextStyle}>{props.email.subject}</Text>
        <View style={dividerStyle}></View>
        <Text style={headerTextStyle}>Security Scan:</Text>
        <SecurityLabel 
          securityScore={props.email.securityScore}
          label={props.email.securityLabel}
        />
        <View style={dividerStyle}></View>
      </View>


      <AutoHeightWebView 
        style={{ width: Dimensions.get('window').width}}
        source={{ html: props.email.html || '<p>No content available</p>' }}
        scalesPageToFit={false}
        viewportContent={'width=device-width, user-scalable=no'}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        javaScriptEnabled={true}
        onShouldStartLoadWithRequest={event => {
          if (event.url.slice(0,4) === 'http') {
            if (props.email.securityLabel === "Safe") {
              Linking.openURL(event.url)
              return false
            }
            else if (props.email.securityLabel === "Caution" || props.email.securityLabel === "Unsafe") {
              setUrl(event.url)
              setDisplayUrl(event.url.split('?')[0])
              setModalVisible(true)
              return false
            }
          }
          return true
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: moderateScale(20),
  },
  headerContainer: {
    flexDirection: "row-reverse", 
    justifyContent: 'space-between',
  },
  lightHeaderText: {
    fontSize: LARGE_TEXT,
    marginTop: moderateVerticalScale(10),
    color: "#272727"
  },
  darkHeaderText: {
    fontSize: LARGE_TEXT,
    marginTop: moderateVerticalScale(10),
    color: "#E8E8E8"
  },
  lightInfoText: {
    fontSize: moderateScale(16),
    color: "black",
    fontWeight: "500",
    marginTop: moderateVerticalScale(5), 
  },
  darkInfoText: {
    fontSize: moderateScale(16),
    color: "white",
    fontWeight: "500",
    marginTop: moderateVerticalScale(5), 
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
  }
})