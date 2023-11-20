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
      const value = await AsyncStorage.getItem('User');
      if (value !== null) {
        const user = JSON.parse(value)
        return user[0].lastLogin
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

export const updateLastLogin = () => {
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('User');
      const user = JSON.parse(value);

      if (value !== null) {
        user[0].lastLogin = new Date();

        AsyncStorage.setItem('User', JSON.stringify(user))
      }
    } catch (e) {
      console.log(e)
    }
  };

  getData()
}

export const removeLastLogin = () => {
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('User');
      const user = JSON.parse(value);

      if (value !== null) {
        user[0].lastLogin = null;

        AsyncStorage.setItem('User', JSON.stringify(user))
      }
    } catch (e) {
      console.log(e)
    }
  };

  getData()
}