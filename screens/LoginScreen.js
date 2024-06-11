// File: LoginScreen.js
// Author: Cayden Wagner
// Date: 09/7/23
// Purpose: Provide the login page for the application
import React, { useState, useEffect } from 'react';
import { Text, ScrollView, StyleSheet, useColorScheme, View, TouchableOpacity, SafeAreaView, Platform, Linking } from "react-native";
import SafariView from "react-native-safari-view";
import { WebView } from "react-native-webview";
import { lightPalette, darkPalette } from "../globalStyles/colors";
import { moderateVerticalScale, moderateScale } from '../functions/helpers';
import { EXTRA_LARGE_TEXT } from '../globalStyles/sizes';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLastLogin } from '../functions/helpers';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [uri, setURL] = useState("");
  const isDarkMode = useColorScheme() === "dark"

  useEffect(() => {
    Linking.addEventListener("url", (url) => handleOpenURL(url.url));
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleOpenURL({ url });
      }
    });
    return () => {
      Linking.removeAllListeners("url"); 
    };
  }, []);

  useEffect(() => {
    const onLaunch = async () => {
      const lastLogin = await getLastLogin()

      if (lastLogin != null) {
        openUrl(`https://hopelessly-summary-chow.ngrok-free.app/user/login/google`)
      } 
    }

    onLaunch() 
  }, []);

  const logIn = () => {
    const onLaunch = async () => {
      const lastLogin = await getLastLogin()

      if (lastLogin != null) {
        openUrl(`https://hopelessly-summary-chow.ngrok-free.app/user/login/google`)
      } 
      else {
        openUrl(`https://hopelessly-summary-chow.ngrok-free.app/user/login/google/newuser`)
      }
    }

    onLaunch() 
  }

  const openUrl = (url) => {
    // // Use SafariView on iOS
    if (Platform.OS === "ios") {
      SafariView.show({
        url,
        fromBottom: true,
      });
    } else {
      setURL(url);
    }
  };

  const handleOpenURL = (url) => {
    const decodedUrl = decodeURI(url);
    const status = decodedUrl.match(/status=([^/]+)/);
    
    if (status && status[1] === "Success")
    {
      const currentTime = new Date()
      const firstName = decodedUrl.match(/firstName=([^/]+)/)
      const email = decodedUrl.match(/email=([^/]+)/)
      const accessToken = decodedUrl.match(/accessToken=([^/]+)/)

      const user = [{
        firstName: firstName[1],
        email: email[1],
        accessToken: accessToken[1],
        lastLogin: currentTime.toString(),
      }]

      AsyncStorage.setItem('User', JSON.stringify(user));

      // Set some global state using user email and first name
      if (Platform.OS === "ios") {
        SafariView.dismiss();
      } else {
        setURL("");
      }
      navigation.navigate("ViewEmailScreen")
    }
    else
    {
      //TODO: Handle Failure
      if (Platform.OS === "ios") {
        SafariView.dismiss();
      } else {
        setURL("");
      }
    }
  };

  return ( 
    <>
      { uri !== "" ? (
        <SafeAreaView style={{ flex: 1 }}>
          <WebView
            userAgent={
              Platform.OS === "android"
                ? "Chrome/18.0.1025.133 Mobile Safari/535.19"
                : "AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75"
            }
            source={{ uri }}
          />
        </SafeAreaView>
      ) : (
        <View style={styles.container}>
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps='handled'
          >
            <SafeAreaView style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="owl"
                color={lightPalette.white}
                size={moderateScale(120)}
              />
            </SafeAreaView>

            <Text style={styles.headerText}>Wise Inbox</Text>
            <Text style={styles.subtitleText}>Stay safe from email scams</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => logIn()}
            >
              <Text style={styles.buttonText}>Login With Google</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d6f6ff',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
  },
  iconContainer: {
    marginBottom: moderateVerticalScale(20),
  },
  headerText: {
    fontSize: EXTRA_LARGE_TEXT + 20,
    fontWeight: "700",
    color: lightPalette.white,
    marginBottom: moderateVerticalScale(8),
  },
  subtitleText: {
    fontSize: moderateScale(16) + 5,
    color: lightPalette.white,
    marginBottom: moderateVerticalScale(20),
    textAlign: 'center',
  },
  button: {
    backgroundColor: "#959ea1",
    paddingVertical: moderateVerticalScale(12),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateVerticalScale(8),
    elevation: 4,
  },
  buttonText: {
    color: lightPalette.white,
    fontWeight: 'bold',
    fontSize: 16
  },
});