// File: App.js
// Author: Cayden Wagner
// Date: 09/7/23
// Purpose: Launches a MainNavigator component
import * as React from 'react';
import MainNavigator from './navigation/StackNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <MainNavigator/>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}

export default App;