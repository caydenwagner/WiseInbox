// File: StackNavigator.js
// Author: Cayden Wagner
// Date: 09/7/23
// Purpose: Provide the stack navigation for the application
import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import AppLaunch from '../screens/AppLaunch';

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AppLaunch"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="AppLaunch"
          component={AppLaunch}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}