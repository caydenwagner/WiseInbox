// File: ViewEmailScreen.js
// Author: Cayden Wagner
// Date: 10/9/23
// Purpose: Provide the page for the user to view emails
import React, {useEffect, useState, useRef} from 'react';
import { StyleSheet, SafeAreaView, View, useColorScheme } from "react-native";
import { logOut, getMail } from '../functions/apiHelpers';
import { useNavigation } from '@react-navigation/native';
import { EmailDisplayer } from '../components/EmailDisplayer';
import { EmailScreenHeader } from '../components/EmailScreenHeader';
import { darkPalette, lightPalette } from '../globalStyles/colors';
import { FullScreenEmailModal } from '../components/FullScreenEmailModal';
import { getTrustedDomains } from '../functions/helpers';

export default function ViewEmailScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState(null)
  const [currentDisplayedEmail, setCurrentDisplayEmail] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  const [trustedDomains, setTrustedDomains] = useState([])

  const bottomSheetRef = useRef();

  const fetchMail = async () => {
    console.log("fetching mail")
    await getMail()
      .then((res) => {if (res) setData(res)})
    setRefreshing(false)
  }

  const handleRefresh = () => {
    setRefreshing(true)
    fetchMail()
  }

  const logOutUser = () => {
    logOut()

    navigation.navigate("LoginScreen")
  }

  useEffect(() => {
    fetchMail()
    const fetchTrustedDomains = async () => {
      const trustedDomains = await getTrustedDomains()
      setTrustedDomains(trustedDomains)
    }

    fetchTrustedDomains()
  }, []) 

  const addToTrustedDomains = (domain) => {
    setTrustedDomains([...trustedDomains, domain])
  }

  function openFullScreenMail(mail) {
    if (mail) {
      setCurrentDisplayEmail(mail)
      bottomSheetRef.current?.snapToIndex(0)
    }
  }

  function closeFullScreenMail() {
    bottomSheetRef.current?.close()
  }

  const deleteMailById = (idToRemove) => {
    setData(prevData => prevData.filter(item => item.id !== idToRemove));
  };

  const isDarkMode = useColorScheme() === "dark"
  
  return (
    <View style={{backgroundColor: isDarkMode ? darkPalette.primary : lightPalette.primary, height: "100%"}}>
      <SafeAreaView style={styles.container}>

        <EmailScreenHeader 
          handleRefresh={fetchMail}
          handleLogOut={logOutUser}
        />
    
        <EmailDisplayer
          refreshing={refreshing}
          handleRefresh={handleRefresh}
          data={data}
          setCurrentDisplayEmail={openFullScreenMail}
        />

        <FullScreenEmailModal 
          forwardRef={bottomSheetRef}
          email={currentDisplayedEmail}
          trustedDomains={trustedDomains}
          setTrustedDomains={addToTrustedDomains}
          deleteMailById={deleteMailById}
          closeFullScreenMail={closeFullScreenMail}
        />

      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: '100%'
  },
})