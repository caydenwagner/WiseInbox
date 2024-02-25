// File: ViewEmailScreen.js
// Author: Cayden Wagner
// Date: 10/9/23
// Purpose: Provide the page for the user to view emails
import React, {useEffect, useState, useRef} from 'react';
import { StyleSheet, SafeAreaView, View, useColorScheme } from "react-native";
import { logOut, getMail, getPredictionOnMail } from '../functions/apiHelpers';
import { useNavigation } from '@react-navigation/native';
import { EmailDisplayer } from '../components/EmailDisplayer';
import { EmailScreenHeader } from '../components/EmailScreenHeader';
import { darkPalette, lightPalette } from '../globalStyles/colors';
import { FullScreenEmailModal } from '../components/FullScreenEmailModal';
import { getTrustedDomains } from '../functions/helpers';

export default function ViewEmailScreen() {
  const navigation = useNavigation();
  const [listOfEmails, setListOfEmails] = useState(null)
  const [currentDisplayedEmail, setCurrentDisplayEmail] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  const [trustedDomains, setTrustedDomains] = useState([])

  const bottomSheetRef = useRef();

  const fetchMail = async () => {
    console.log("fetching mail")
    await getMail()
      .then((res) => {if (res) setListOfEmails(res)})
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
    makePredictionOnMail(mail);
  }

  function closeFullScreenMail() {
    bottomSheetRef.current?.close()
  }

  const deleteMailById = (idToRemove) => {
    setListOfEmails(prevData => prevData.filter(item => item.id !== idToRemove));
  };

  const makePredictionOnMail = async (mail) => {
    if (!mail.securityScore) {
      try {
        const { securityScore, securityLabel } = await getPredictionOnMail(mail.id);
  
        // Update the mail object itself
        mail.securityScore = securityScore;
        mail.securityLabel = securityLabel;
  
        // Update the list of emails in state, preserving any other changes
        setListOfEmails(prevListOfEmails =>
          prevListOfEmails.map(item => item.id === mail.id ? mail : item)
        );
      } catch (error) {
        console.log('Error fetching prediction for mail:', mail.id, error);
        // Handle the error appropriately, retry button may be needed
      }
    }
  }

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
          data={listOfEmails}
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