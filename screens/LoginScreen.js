// File: LoginScreen.js
// Author: Cayden Wagner
// Date: 09/7/23
// Purpose: Provide the login page for the application
import React, {useState, useRef} from 'react';
import * as Keychain from 'react-native-keychain';
import { Text, ScrollView, StyleSheet, useColorScheme, View, Keyboard, TouchableOpacity, SafeAreaView } from "react-native";
import { SmartTextInput } from '../components/textInputs';
import { light, dark } from "../globalStyles/colors";
import { moderateVerticalScale, moderateScale } from '../functions/helpers';
import { EXTRA_LARGE_TEXT } from '../globalStyles/sizes';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function LoginScreen(props) {
  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const isDarkMode = useColorScheme() === "dark"
  const password_input = useRef();

  async function onSubmitPassword() 
  {
    // Store the email and password securely in the native keychain
    props.setCredentials(await Keychain.setGenericPassword(userEmail, userPassword))
    props.setAppScreen("LoggedIn")
  }

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
        <SmartTextInput
          placeholder="Enter your email"
          numberOfLines={1}
          value={userEmail}
          onChangeText={(val) => setUserEmail(val)}
          returnKeyType="next"
          onSubmitEditing={() => password_input.current.focus()}
          blurOnSubmit={false}
        />
        <SmartTextInput
          forwardRef={password_input}
          secureTextEntry={true}
          placeholder="Password"
          numberOfLines={1}
          value={userPassword}
          returnKeyType="go"
          onChangeText={(val) => setUserPassword(val)}
          onSubmitEditing={() => {onSubmitPassword(); Keyboard.dismiss()}}
          blurOnSubmit={false}
        />

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => {onSubmitPassword(); Keyboard.dismiss()}}>
          <Text>Login</Text>
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