// File: LoginScreen.js
// Author: Cayden Wagner
// Date: 09/8/23
// Purpose: Redirect the user to the correct page when the app launches
import React, {useState, useEffect} from 'react';
import { SafeAreaView, Text } from "react-native";
import * as Keychain from 'react-native-keychain';

export default function AppLaunch({navigation}) {
  const [credentials, setCredentials] = useState(null)
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await Keychain.getGenericPassword();
        if (user) {
          console.log('Credentials successfully loaded for user ' + user.username)
          setCredentials(user)
        } else {
          console.log('No credentials stored');
          navigation.navigate('LoginScreen')
        }
      } catch (error) {
        console.log("Keychain couldn't be accessed!", error);
      }
    }
    fetchUser()
  }, [])

  return (
    <SafeAreaView>
      {
        credentials ? 
          <Text>{credentials.username} logged in</Text> 
          : 
          <Text>Loading</Text>
      }
    </SafeAreaView>
  )
}