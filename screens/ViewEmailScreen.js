// File: ViewEmailScreen.js
// Author: Cayden Wagner
// Date: 10/9/23
// Purpose: Provide the page for the user to view emails
import React, {useEffect, useState} from 'react';
import { StyleSheet, SafeAreaView, View, useColorScheme } from "react-native";
import { logOut, getMail } from '../functions/apiHelpers';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EmailDisplayer } from '../components/emailDisplayer';
import { EmailScreenHeader } from '../components/EmailScreenHeader';
import { dark, light } from '../globalStyles/colors';

export default function ViewEmailScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState(null)

  const fetchMail = async () => {
    console.log("fetching")
    await getMail()
      .then((res) => setData(res))
  }

  const logOut = async () => {
    await AsyncStorage.removeItem('LastLogin');

    navigation.navigate("LoginScreen")
  }

  useEffect(() => {
    fetchMail()
  }, []) 

  const isDarkMode = useColorScheme() === "dark"
  
  return (
    <View style={{backgroundColor: isDarkMode ? dark.primary.color : light.primary.color, height: "100%"}}>
      <SafeAreaView style={styles.container}>

        <EmailScreenHeader 
          handleRefresh={fetchMail}
        />
    
        <EmailDisplayer
          data={data}
        />

      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%"
  },
})