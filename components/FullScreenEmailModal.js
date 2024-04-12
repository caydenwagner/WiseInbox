import React, { useMemo, useCallback, useRef, useState } from 'react';
import { ScrollView, useColorScheme } from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FullScreenEmail } from './FullScreenEmail';
import { moderateVerticalScale, moderateScale } from '../functions/helpers';

export const FullScreenEmailModal = (props) => {
  const [quickActionsIgnored, setQuickActionsIgnored] = useState(false)

  const insets = useSafeAreaInsets();
  const snapPoints = useMemo(() => ['80%', '100%'], []);
  const isDarkMode = useColorScheme() === "dark"
  const scrollViewRef = useRef()

  function onClose () {
    scrollViewRef.current?.scrollTo({x: 0, y: 0, animated: false})
    setQuickActionsIgnored(false)
    props.setMoreDetailLoadingStatus("Empty")
    props.setMoreDetailOpen(false)
  }

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  return (
    <BottomSheet
      ref={props.forwardRef}
      backgroundStyle={isDarkMode ? {backgroundColor: "#1E1E1E"} : {backgroundColor: "#E7E7E7"}}
      handleIndicatorStyle={{backgroundColor: "#B5B5B5", height: moderateVerticalScale(4), width: moderateScale(40), borderRadius: moderateScale(20)}}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      topInset={insets.top}
      backdropComponent={renderBackdrop}
      onClose={onClose}
    >
      <ScrollView 
        ref={scrollViewRef}
        contentContainerStyle={{paddingBottom: moderateVerticalScale(200)}}>
        <FullScreenEmail 
          email={props.email}
          trustedDomains={props.trustedDomains}
          setTrustedDomains={props.setTrustedDomains}
          quickActionsIgnored={quickActionsIgnored}
          setQuickActionsIgnored={() => setQuickActionsIgnored(true)}
          deleteMailById={props.deleteMailById}
          closeFullScreenMail={props.closeFullScreenMail}
          onRefresh={props.onRefresh}
          predictionLoadingStatus={props.predictionLoadingStatus}
          getMoreDetailsOnMail={props.getMoreDetailsOnMail}
          moreDetailLoadingStatus={props.moreDetailLoadingStatus}
          moreDetailIsOpen={props.moreDetailIsOpen}
          setMoreDetailOpen={props.setMoreDetailOpen}
        />
      </ScrollView>

    </BottomSheet>
  )
}