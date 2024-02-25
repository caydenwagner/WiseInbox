import React, { useState } from 'react';
import { View, Text, StyleSheet, useColorScheme, Dimensions, Linking, Platform } from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview'
import { addToTrustedDomains, moderateScale, moderateVerticalScale } from '../functions/helpers';
import { LARGE_TEXT } from '../globalStyles/sizes';
import { NewIndicator } from './NewIndicator'; 
import { SecurityScanSection } from './SecurityScanSection';
import SecurityModal from './SecurityModal';
import { UnsafeQuickActions } from './UnsafeQuickActions';
import { formatDate } from '../functions/formatDate';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

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

function getRandomInt(min, max) {
  return Math.floor(Math.random() * max) + min;
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
      quickActionsIgnored={props.quickActionsIgnored}
      setQuickActionsIgnored={props.setQuickActionsIgnored}
      deleteMailById={props.deleteMailById}
      closeFullScreenMail={props.closeFullScreenMail}
    />
  )
}

const AutoThemeFullScreenEmail = (props) => {
  const [isModalVisible, setModalVisible] = useState(false)
  const [url, setUrl] = useState("")
  const [displayUrl, setDisplayUrl] = useState("")

  const isDarkMode = useColorScheme() === "dark"
  var bShouldDisplayEmail = props.email.securityScore && (props.email.securityLabel !== "Unsafe" || props.quickActionsIgnored)

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
    props.setTrustedDomains(domain)
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
              <Text style={headerTextStyle}>{formatDate(props.email.date)}</Text>
              <Text style={headerTextStyle}>From:</Text>
            </View>
          </>
        : 
          <>
            <View style={styles.headerContainer}>
              <Text style={headerTextStyle}>{formatDate(props.email.date)}</Text>
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
        <SecurityScanSection
          securityScore={props.email.securityScore}
          label={props.email.securityLabel}
          headerTextStyle={headerTextStyle}
        />
        <View style={dividerStyle}></View>
      </View>

      { props.email.securityLabel === "Unsafe" && !props.quickActionsIgnored ? 
          <UnsafeQuickActions
            email={props.email}
            onIgnore={props.setQuickActionsIgnored}
            deleteMailById={props.deleteMailById}
            closeFullScreenMail={props.closeFullScreenMail}
          />
        :
          <></>
      }

      { props.email.securityScore ?
          <></>
        :
        <View>
          <SkeletonPlaceholder backgroundColor={isDarkMode ? 'grey' : 'lightgrey'} speed={1100} highlightColor={isDarkMode ? "#1E1E1E" : '#E7E7E7'}>
            <SkeletonPlaceholder.Item marginHorizontal={moderateScale(20)}>
              <SkeletonPlaceholder.Item {...styles.loadingTextContainer} width={moderateScale(getRandomInt(30, 300))}/>
              <SkeletonPlaceholder.Item {...styles.loadingTextContainer} width={moderateScale(getRandomInt(30, 300))}/>
              <SkeletonPlaceholder.Item {...styles.loadingTextContainer} width={moderateScale(getRandomInt(30, 300))}/>
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        </View>
      }

      <AutoHeightWebView 
        style={{ width: Dimensions.get('window').width, marginTop: moderateVerticalScale(10)}}
        source={{ html: bShouldDisplayEmail ? props.email.html || '<p>No content available</p>' : '<p></p>'}}
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
  },
  loadingTextContainer: {
    height: moderateVerticalScale(26), 
    borderRadius: moderateScale(8),
    marginTop: moderateVerticalScale(10)
  },
})