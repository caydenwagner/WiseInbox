import React, { useState } from 'react';
import { Text, StyleSheet} from 'react-native';

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
    <>
      <Text>
        Recommended Actions
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
    </>

  )
}