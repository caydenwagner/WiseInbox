// File: StackNavigator.js
// Author: Cayden Wagner
// Date: 09/7/23
// Purpose: Provide the stack navigation for the application
import * as React from 'react';
import linking from "../linking.js"
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import AppLaunch from '../screens/AppLaunch';
import ViewEmailScreen from '../screens/ViewEmailScreen';

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  return (
    <NavigationContainer linking={linking}>
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
        <Stack.Screen
          name="ViewEmailScreen"
          component={ViewEmailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}