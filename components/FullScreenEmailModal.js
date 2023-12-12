import React, { useMemo, useCallback } from 'react';
import { ScrollView } from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FullScreenEmail } from './FullScreenEmail';
import { moderateVerticalScale, moderateScale } from '../functions/helpers';

export const FullScreenEmailModal = (props) => {
  const insets = useSafeAreaInsets();
  const snapPoints = useMemo(() => ['80%', '100%'], []);

  const onChange = (index) => {
    if (index === -1) {
      props.setVisible(false)
    }
    else {
      props.setVisible(true)
    }
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
      backgroundStyle={{backgroundColor: "#E7E7E7"}}
      handleIndicatorStyle={{backgroundColor: "#B5B5B5", height: moderateVerticalScale(9), width: moderateScale(80), borderRadius: moderateScale(20)}}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      topInset={insets.top}
      backdropComponent={renderBackdrop}
      onChange={index => onChange(index)}
    >
      <ScrollView contentContainerStyle={{paddingBottom: moderateVerticalScale(250)}}>
        <FullScreenEmail email={props.email}/>
      </ScrollView>

    </BottomSheet>
  )
}