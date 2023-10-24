import React, { useEffect } from 'react';
import LoadingScreen from './LoadingScreen';
import { useNavigation } from '@react-navigation/native';

export default function AppLaunch() {
  const navigation = useNavigation()

  useEffect(() => {
    const fetchUser = async () => {
      //TODO: Figure out how to fetch the user
      // If there is a user -> navigate to ViewEmailScreen
      // If there is no user -> navigate to LoginScreen

      navigation.navigate("LoginScreen")
    }
    fetchUser();
  }, [])

  return <LoadingScreen />;
}