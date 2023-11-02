import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');
const [shortDimension, longDimension] = width < height ? [width, height] : [height, width];

//Default guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

export const scale = size => shortDimension / guidelineBaseWidth * size;
export const verticalScale = size => longDimension / guidelineBaseHeight * size;
export const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;
export const moderateVerticalScale = (size, factor = 0.5) => size + (verticalScale(size) - size) * factor;

export const getLastLogin = () => {
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('LastLogin');
      if (value !== null) {
        return value
      }
      return null
    } catch (e) {
      // error reading value
      return null
    }
  };

  return getData()
}

export const openUrl = (url) => {
  // // Use SafariView on iOS
  if (Platform.OS === "ios") {
    SafariView.show({
      url,
      fromBottom: true,
    });
  } else {
    setURL(url);
  }
};