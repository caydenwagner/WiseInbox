import React, { useState, useEffect, useRef } from 'react';
import { AppState, SafeAreaView, Text } from "react-native";
import * as Keychain from 'react-native-keychain';
import LoginScreen from './LoginScreen';
import LoadingScreen from './LoadingScreen';
import ViewEmailScreen from './ViewEmailScreen';

export default function AppLaunch({ navigation }) {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [appScreen, setAppScreen] = useState("Loading");
  const [credentials, setCredentials] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;

      if (appState.current === "active") {
        setAppStateVisible(appState.current); 
      } else {
        setTimeout(() => {
          setAppStateVisible(appState.current);
        }, 1000);
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await Keychain.getGenericPassword();
        if (user) {
          console.log('Credentials successfully loaded for user ' + user.username)
          setCredentials(user);
          setAppScreen("LoggedIn");
        } else {
          console.log('No credentials stored');
          setAppScreen("LoggedOut");
        }
      } catch (error) {
        console.log("Keychain couldn't be accessed!", error);
      } finally {
        setLoading(false); // Set loading to false when done fetching
      }
    }
    fetchUser();
  }, [])

  if (appState.current === "active") {
    if (loading) {
      return <LoadingScreen />;
    }

    switch (appScreen) {
      case "LoggedIn":
        return (
          <ViewEmailScreen
            username={credentials.username}
            setAppScreen={setAppScreen}
            setCredentials={setCredentials}
          />
        );
      case "LoggedOut":
        return (
          <LoginScreen
            setAppScreen={setAppScreen}
            setCredentials={setCredentials}
          />
        );
      default:
        return (
          <SafeAreaView>
            <Text>DEFAULT</Text>
          </SafeAreaView>
        );
    }
  } else {
    return <LoadingScreen />;
  }
}