import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import Sheet, { SheetRef } from 'react-modal-sheet';
import { dark, light } from '../globalStyles/colors';
import { moderateScale, moderateVerticalScale } from '../functions/helpers';
import { LARGE_TEXT, MEDIUM_TEXT, SMALL_TEXT } from '../globalStyles/sizes';

export const FullScreenEmailModal = (props) => {
  const isDarkMode = useColorScheme() === "dark"

  if (isDarkMode) {
    return (
      <DarkFullScreenEmailModal 
        message={props.message} 
      />
    )
  }
  return (
    <LightFullScreenEmailModal 
      message={props.message} 
    />
  )
}

const LightFullScreenEmailModal = (props) => {
  return (
    <Sheet
      isOpen={true}
      onClose={() => null}
      snapPoints={[600, 400, 100, 0]}
      initialSnap={1}
    >
      <Sheet.Container>
        {/**
         * Since `Sheet.Content` is a `motion.div` it can receive motion values
         * in it's style prop which allows us to utilise the exposed `y` value.
         *
         * By syncing the padding bottom with the `y` motion value we introduce
         * an offset that ensures that the sheet content can be scrolled all the
         * way to the bottom in every snap point.
         */}
        <Sheet.Content>
          <Sheet.Scroller draggableAt="both">
            {/* Some content here that makes the sheet content scrollable */}
          </Sheet.Scroller>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  )
}

const DarkFullScreenEmailModal = (props) => {
  return (
    <Sheet
      isOpen={true}
      onClose={() => null}
      snapPoints={[600, 400, 100, 0]}
      initialSnap={1}
    >
      <Sheet.Container>
        {/**
         * Since `Sheet.Content` is a `motion.div` it can receive motion values
         * in it's style prop which allows us to utilise the exposed `y` value.
         *
         * By syncing the padding bottom with the `y` motion value we introduce
         * an offset that ensures that the sheet content can be scrolled all the
         * way to the bottom in every snap point.
         */}
        <Sheet.Content>
          <Sheet.Scroller draggableAt="both">
            {/* Some content here that makes the sheet content scrollable */}
          </Sheet.Scroller>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  )
}

const styles = StyleSheet.create({
  darkBackground: {
    backgroundColor: dark.primary.color,
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateVerticalScale(15),
    borderTopWidth: .2,
    borderBlockColor: dark.accent.color
  },
  lightBackground: {
    backgroundColor: light.primary.color,
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateVerticalScale(15),
    borderTopWidth: .2,
    borderBlockColor: light.accent.color
  },
  headerContainer: {
    flexDirection: 'row-reverse', 
    marginBottom: 3,
  },
  darkSender: {
    fontSize: LARGE_TEXT,
    color: dark.white.color,
    fontWeight: "600",
    flex: 1
  },
  lightSender: {
    fontSize: LARGE_TEXT,
    color: light.black.color,
    fontWeight: "600",
    flex: 1
  },
  darkDate: {
    fontSize: SMALL_TEXT,
    color: dark.white.color,
    alignSelf: "flex-end",
  },
  lightDate: {
    fontSize: SMALL_TEXT,
    color: light.black.color,
    alignSelf: "flex-end",
  },
  darkSubject: {
    fontSize: MEDIUM_TEXT,
    color: dark.white.color,
    fontWeight: "600",
  },
  lightSubject: {
    fontSize: MEDIUM_TEXT,
    color: light.black.color,
    fontWeight: "600",
  },
  darkSnippet: {
    fontSize: SMALL_TEXT,
    color: dark.white.color,
  },
  lightSnippet: {
    fontSize: SMALL_TEXT,
    color: light.black.color,
  }
})