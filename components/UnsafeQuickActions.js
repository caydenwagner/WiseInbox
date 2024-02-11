import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, useColorScheme, TouchableOpacity } from 'react-native';
import { QuickAction } from './QuickAction';
import { moderateScale, moderateVerticalScale } from '../functions/helpers';
import { reportEmail, deleteMail, blockSender } from '../functions/apiHelpers'

function localReportEmail(email) {
  reportEmail(email.id)
}

function localDeleteMail(email) {
  deleteMail(email.id)
}

function localBlockSender(email) {
  blockSender(email.senderEmail)
}

export const UnsafeQuickActions = ({ email, onIgnore, deleteMailById, closeFullScreenMail }) => {
  const [ reportMailToggle, setReportMailToggle ] = useState(false)
  const [ blockSenderToggle, setBlockSenderToggle ] = useState(false)
  const [ deleteMailToggle, setDeleteMailToggle ] = useState(false)
  const [ isButtonActive, setButtonActive ] = useState(false)

  const isDarkMode = useColorScheme() === "dark"

  useEffect(() => {
    if (reportMailToggle || deleteMailToggle || blockSenderToggle) {
      setButtonActive(true)
    }
    else {
      setButtonActive(false)
    }
  }, [reportMailToggle, blockSenderToggle, deleteMailToggle])

  function onContinue() {
    if (reportMailToggle) {
      localReportEmail(email)
      setReportMailToggle(false)
    }
    if (blockSenderToggle) {
      localBlockSender(email)
      setBlockSenderToggle(false)
    }
    if (deleteMailToggle) {
      localDeleteMail(email)
      deleteMailById(email.id)
      setDeleteMailToggle(false)
    }
    closeFullScreenMail()
  }

  return (
    <View style={styles.container}>
      <Text style={{...styles.titleText, color: isDarkMode ? "white" : "black"}}>
        Recommended Actions:
      </Text>

      <QuickAction
        label={"Report email as a scam"}
        isToggled={reportMailToggle}
        setToggled={setReportMailToggle}
      />

      <QuickAction
        label={"Block this sender"}
        isToggled={blockSenderToggle}
        setToggled={setBlockSenderToggle}
      />

      <QuickAction
        label={"Delete this mail"}
        isToggled={deleteMailToggle}
        setToggled={setDeleteMailToggle}
      />
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          onPress={onIgnore}
          style={{...styles.inactiveButton, borderColor: isDarkMode ? "white" : "#272727"}}>
          <Text style={{...styles.buttonText, color: isDarkMode ? "white" : "black"}}>
            Ignore
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            ...isButtonActive ? styles.activeButton : styles.inactiveButton, 
            // im so sorry for writing it this way
            borderColor: isButtonActive ? "#0A55C5" : isDarkMode ? "lightgrey" : "grey"
          }}
          disabled={!isButtonActive}
          onPress={() => onContinue()}
        >
          <Text 
            style={{
              ...styles.buttonText, 
              color: isButtonActive ? "white" : isDarkMode ? "lightgrey" : "grey"
            }}
          >
            Take Action
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateVerticalScale(20)
  },
  titleText: {
    fontSize: moderateScale(20),
    fontWeight: "600",
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: "space-between",
    marginTop: moderateVerticalScale(30)
  },
  activeButton: {
    backgroundColor: "#0A55C5",
    paddingVertical: moderateVerticalScale(8),
    paddingHorizontal: moderateVerticalScale(30),
    borderRadius: 8,
    borderWidth: 1, 
    borderColor: "#0A55C5",
  },
  inactiveButton: {
    paddingVertical: moderateVerticalScale(8),
    paddingHorizontal: moderateVerticalScale(30),
    borderRadius: 8,
    borderColor: "#272727",
    borderWidth: 1, 
  },
  buttonText: {
    fontSize: moderateScale(16), 
    fontWeight: "600"
  }
})