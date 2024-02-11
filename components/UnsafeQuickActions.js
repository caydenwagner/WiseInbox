import React, { useState } from 'react';
import { Text, View, StyleSheet, useColorScheme } from 'react-native';
import { QuickAction } from './QuickAction';
import { moderateScale, moderateVerticalScale } from '../functions/helpers';
import { EXTRA_LARGE_TEXT, } from '../globalStyles/sizes';

function reportEmail(email) {

}

function deleteMail(email) {

}

function blockSender(email) {

}

export const UnsafeQuickActions = ({ email }) => {
  const [ reportMailToggle, setReportMailToggle ] = useState(false)
  const [ blockSenderToggle, setBlockSenderToggle ] = useState(false)
  const [ deleteMailToggle, setDeleteMailToggle ] = useState(false)

  const isDarkMode = useColorScheme() === "dark"

  function onContinue() {
    if (reportMailToggle) {
      reportEmail(email)
    }
    if (blockSenderToggle) {
      blockSender(email)
    }
    if (deleteMailToggle) {
      deleteMail(email)
    }
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
  }
})