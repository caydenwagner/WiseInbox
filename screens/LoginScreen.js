// File: LoginScreen.js
// Author: Cayden Wagner
// Date: 09/7/23
// Purpose: Provide the login page for the application
import React, {useState, useRef, useEffect} from 'react';
import * as Keychain from 'react-native-keychain';
import { Text, ScrollView, StyleSheet, useColorScheme, View, Keyboard, TouchableOpacity, SafeAreaView, Platform, Linking } from "react-native";
import SafariView from "react-native-safari-view";
import { WebView } from "react-native-webview";
import { SmartTextInput } from '../components/textInputs';
import { light, dark } from "../globalStyles/colors";
import { moderateVerticalScale, moderateScale } from '../functions/helpers';
import { EXTRA_LARGE_TEXT } from '../globalStyles/sizes';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function LoginScreen(props) {
  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const [uri, setURL] = useState("");
  const isDarkMode = useColorScheme() === "dark"
  const password_input = useRef();

  async function onSubmitPassword() 
  {
    // Store the email and password securely in the native keychain
    props.setCredentials(await Keychain.setGenericPassword(userEmail, userPassword))
    props.setAppScreen("LoggedIn")
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

  const handleOpenURL = (url) => {
    const status = decodeURI(url).match(
      /status=([^#]+)/
    );
    
    if (status === "Success")
    {
      const user = decodeURI(url).match(
        /firstName=([^#]+)\/email=([^#]+)/
      );
  
      console.log(user)
    }
    else
    {
      //TODO: Handle Failure
      console.log(status)
    }

    if (Platform.OS === "ios") {
      SafariView.dismiss();
    } else {
      setURL("");
    }
  };

  return ( 
    <ScrollView 
      style={{...styles.background, backgroundColor: isDarkMode ? dark.primary.color : light.primary.color}}
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps='handled'>

      <SafeAreaView style={styles.iconContainer}>
        <MaterialCommunityIcons 
          name="owl"
          color={isDarkMode ? dark.white.color : dark.secondary.color} 
          size={moderateScale(120)}
        />
      </SafeAreaView>

      <Text style={{...styles.headerText, color: isDarkMode ? dark.white.color : light.black.color}}>Add an Account</Text>
      <View>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => openUrl(`http://localhost:3000/user/login/google`)}>
          <Text>Login With Google</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => {
            fetch(`http://localhost:3000/user/logout`)
            .catch(function(error) {
              console.log('There has been a problem with your fetch operation: ' + error.message);
            });
          }}>
          <Text>Logout</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%", 
    height: "100%"
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    fontSize: EXTRA_LARGE_TEXT,
    fontWeight: "700",
    alignSelf: 'center',
    marginTop: moderateVerticalScale(20),
    marginBottom: moderateVerticalScale(8)
  },
  button: {
    backgroundColor: light.accent.color,
    paddingVertical: moderateVerticalScale(8),
    marginHorizontal: moderateVerticalScale(15),
    paddingHorizontal: moderateScale(15),
    borderRadius: moderateVerticalScale(8),
    alignSelf: 'flex-end',
  },
})