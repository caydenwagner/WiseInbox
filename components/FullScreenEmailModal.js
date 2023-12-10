import React, { useMemo, useRef } from 'react';
import { useColorScheme } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { FullScreenEmail } from './FullScreenEmail';

export const FullScreenEmailModal = (props) => {
  const snapPoints = useMemo(() => ['80%'], []);

  return (
    <BottomSheet
      ref={props.forwardRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
    >
      <FullScreenEmail email={props.email}/>

    </BottomSheet>
  )
}