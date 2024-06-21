// LoginScreen.styles.ts

import { StyleSheet } from 'react-native';
import { moderateScale, moderateVerticalScale } from '../../functions/helpers';
import { lightPalette } from '../../globalStyles/colors';
import { MEDIUM_TEXT, EXTRA_LARGE_TEXT } from '../../globalStyles/sizes'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d6f6ff',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
  },
  iconContainer: {
    marginBottom: moderateVerticalScale(20),
  },
  icon: {
    color: lightPalette.accent,
    size: moderateScale(120),
  },
  headerText: {
    fontSize: EXTRA_LARGE_TEXT + 20,
    fontWeight: '700',
    color: lightPalette.accent,
    marginBottom: moderateVerticalScale(8),
  },
  subtitleText: {
    fontSize: moderateScale(16) + 5,
    color: lightPalette.accent,
    marginBottom: moderateVerticalScale(20),
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#959ea1',
    paddingVertical: moderateVerticalScale(12),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateVerticalScale(8),
    elevation: 4,
  },
  buttonText: {
    color: lightPalette.accent,
    fontWeight: 'bold',
    fontSize: MEDIUM_TEXT
  },
  webviewContainer: {
    flex: 1,
  },
});