// File: LoginScreen.js
// Author: Cayden Wagner
// Date: 09/7/23
// Purpose: Provide the login page for the application
// LoginScreen.js
import React from 'react';
import { ScrollView, View, SafeAreaView, Text, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { WebView } from "react-native-webview";
import { useAuth } from '../../hooks/useAuth';
import styles from "./LoginScreen.styles"

export default LoginScreen = () => {
  const { uri, isLoading, error, handleLogin, handleAuthenticationResponse } = useAuth();

  if (isLoading) {
    return <Text> Loading... </Text>;
  }

  if (error) {
    return <Text> {error} </Text>;
  }

  return (
    <>
      {uri ? (
        <SafeAreaView style={styles.webviewContainer}>
          <WebView
            source={{ uri }}
            onNavigationStateChange={handleAuthenticationResponse}
          />
        </SafeAreaView>
      ) : (
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps='handled'
          >
            <SafeAreaView style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="owl"
                color={styles.icon.color}
                size={styles.icon.size}
              />
            </SafeAreaView>

            <Text style={styles.headerText}>Wise Inbox</Text>
            <Text style={styles.subtitleText}>Stay safe from email scams</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={handleLogin}
            >
              <Text style={styles.buttonText}>Login With Google</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}
    </>
  );
};