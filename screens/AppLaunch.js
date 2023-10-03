// File: LoginScreen.js
// Author: Cayden Wagner
// Date: 09/8/23
// Purpose: Redirect the user to the correct page when the app launches
import React, {useState, useEffect, useRef} from 'react';
import { AppState, SafeAreaView, Text, TouchableOpacity } from "react-native";
import * as Keychain from 'react-native-keychain';
import LoginScreen from './LoginScreen';
import LoadingScreen from './LoadingScreen';
import { getContent } from '../functions/apiHelpers';

export default function AppLaunch({navigation}) {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [appScreen, setAppScreen] = useState("Loading")
  const [credentials, setCredentials] = useState(null)

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;

      // Sets app state to the current appstate with a slight delay to make it look more smooth
      if (appState.current === "active")
      {
        setAppStateVisible(appState.current);
      }
      else
      {
        setTimeout(() => {
          setAppStateVisible(appState.current);
        }, 500);
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
          setCredentials(user)
          setAppScreen("LoggedIn")
        } else {
          console.log('No credentials stored');
          setAppScreen("LoggedOut")
        }
      } catch (error) {
        console.log("Keychain couldn't be accessed!", error);
      }
    }
    fetchUser()
  }, [])


  if (appState.current === "active")
  {
    switch (appScreen) {
      case "Loading":
        return (
          <LoadingScreen/>
        )
      case "LoggedIn":
        return (
          <SafeAreaView>
            <Text>logged in</Text>
            <TouchableOpacity onPress={() => {
              Keychain.resetGenericPassword(); 
              setCredentials(null); 
              setAppScreen("LoggedOut")
              }
            }>
              <Text>Log Out</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={async() => {
              const data = await getContent()
              console.log(data)
            }
            }>
              <Text>Get Content From Server</Text>
            </TouchableOpacity>
          </SafeAreaView>
        )
      case "LoggedOut":
        return (
          <LoginScreen
            setAppScreen={setAppScreen}
            setCredentials={setCredentials}
          />
        )
      default:
        return (
          <SafeAreaView>
            <Text>DEFAULT</Text>
          </SafeAreaView>
        )
    }
  }
  else
  {
    return (
      <LoadingScreen/>
    )
  }
}