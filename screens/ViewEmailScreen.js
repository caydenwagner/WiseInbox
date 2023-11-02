// File: ViewEmailScreen.js
// Author: Cayden Wagner
// Date: 10/9/23
// Purpose: Provide the page for the user to view emails
import React, {useState} from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableOpacity } from "react-native";
import { EXTRA_LARGE_TEXT, MEDIUM_TEXT } from '../globalStyles/sizes';
import { moderateScale, moderateVerticalScale } from '../functions/helpers';
import { getContent } from '../functions/apiHelpers';
import { dark, light } from '../globalStyles/colors';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logOut } from '../functions/apiHelpers';

export default function ViewEmailScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState(null)
  
  return (
    <SafeAreaView>
      <Text style={styles.headerText}>Hello!</Text>

      <TouchableOpacity 
        style={styles.button} 
        onPress={ async () => {
          res = await logOut()

          if (res.status === "Success") {  
            await AsyncStorage.removeItem('LastLogin');

            navigation.navigate("LoginScreen")
          }
          else {
            // Implement error check
          }
        }}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={async() => {
        await getContent()
          .then((res) => JSON.stringify(res))
          .then((resJson) => setData(resJson))
      }}>
        <Text style={styles.buttonText}>Get Content From Server</Text>
      </TouchableOpacity>
      { data ? <Text style={styles.buttonText}>{data}</Text> : null}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  background: {
    width: "100%", 
    height: "100%"
  },
  headerText: {
    fontSize: EXTRA_LARGE_TEXT,
    fontWeight: "700",
    alignSelf: 'center',
    marginTop: moderateVerticalScale(20),
    marginBottom: moderateVerticalScale(8)
  },
  buttonText: {
    fontSize: MEDIUM_TEXT,
    fontWeight: "500",
    alignSelf: 'center',
    marginTop: moderateVerticalScale(10),
    marginBottom: moderateVerticalScale(8)
  },
  button: {
    backgroundColor: light.accent.color,
    paddingVertical: moderateVerticalScale(6),
    marginVertical: moderateVerticalScale(6),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateVerticalScale(10),
    alignSelf: 'center',
  },
})