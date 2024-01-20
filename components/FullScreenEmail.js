import React, { useState } from 'react';
import { View, Text, StyleSheet, useColorScheme, Dimensions, Linking, Platform } from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview'
import { addToTrustedDomains, moderateScale, moderateVerticalScale } from '../functions/helpers';
import { LARGE_TEXT } from '../globalStyles/sizes';
import { NewIndicator } from './NewIndicator'; 
import { SecurityLabel } from './SecurityLabel';
import SecurityModal from './SecurityModal';

function parseUrl(url) {
  const regex = /^(.*?:\/\/)(.*?)(\/[^?]*)(\?.*)?$/;
  const match = url.match(regex);

  if (match) {
    const protocol = match[1];
    const domain = match[2];
    const path = match[3].split('?')[0]; // Stop at the first occurrence of '?'

    // Create the result array
    const resultArray = [protocol, domain, path];

    return resultArray;
  } else {
    // Handle invalid URLs
    return [];
  }
}

export const FullScreenEmail = (props) => {
  if (!props.email) {
    return <></>
  }

  return (
    <AutoThemeFullScreenEmail 
      email={props.email} 
      trustedDomains={props.trustedDomains}
      setTrustedDomains={props.setTrustedDomains}
    />
  )
}

const AutoThemeFullScreenEmail = (props) => {
  const [isModalVisible, setModalVisible] = useState(false)
  const [url, setUrl] = useState("")
  const [displayUrl, setDisplayUrl] = useState("")
  const isDarkMode = useColorScheme() === "dark"

  var headerTextStyle = isDarkMode ? styles.darkHeaderText : styles.lightHeaderText
  var infoTextStyle = isDarkMode ? styles.darkInfoText : styles.lightInfoText
  var dividerStyle = isDarkMode ? styles.darkDivider : styles.lightDivider

  function isDomainTrusted (url) {
    const domain = parseUrl(url)[1]
    return (props.trustedDomains.includes(domain))
  }

  function addDomainToTrusted (url) {
    const domain = parseUrl(url)[1]
    addToTrustedDomains(domain)
    props.setTrustedDomains[{...props.trustedDomains, domain}]
  }

  function onContinue(url, checkboxValue) {
    if (checkboxValue) {
      addDomainToTrusted(url)
    }
    Linking.openURL(url)
    setModalVisible(false)
  }

  function openLink(url) {
    if (url.slice(0,4) === 'http') {
      if (props.email.securityLabel === "Safe") {
        Linking.openURL(url)
        return false
      }
      else if (props.email.securityLabel === "Caution" || props.email.securityLabel === "Unsafe") {
        const isTrusted = isDomainTrusted(url)
        if (isTrusted) {
          Linking.openURL(url)
          return false
        }
        else {
          setUrl(url)
          setDisplayUrl(parseUrl(url))
          setModalVisible(true)
          return false
        }
      }
    }
    return true
  }

  return (
    <>
      <SecurityModal 
        visible={isModalVisible}
        displayUrl={displayUrl}
        onClose={() => setModalVisible(false)}
        onContinue={onContinue}
        url={url}
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
        userAgent={
          Platform.OS === "android"
            ? "Chrome/18.0.1025.133 Mobile Safari/535.19"
            : "AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75"
        }
        androidLayerType={'hardware'}
        scalesPageToFit={false}
        viewportContent={'width=device-width, user-scalable=no'}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        javaScriptEnabled={true}
        startInLoadingState={true}
        onShouldStartLoadWithRequest={(event) => {
          return openLink(event.url)
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