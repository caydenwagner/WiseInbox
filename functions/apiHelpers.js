// File: apiHelpers.js
// Author: Cayden Wagner
// Date: 10/2/23
// Purpose: Provide some helper function to interact with the back end through its API
import { getLastLogin } from "./helpers";
import { useNavigation } from '@react-navigation/native';

export const getContent = async () => {
  try {
    const response = await fetch(
      'http://localhost:3000/',
    );
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

export const getMail = async () => {
  try {
    const response = await fetch(
      'http://localhost:3000/gmail/messages',
    );
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

export const logOut = async () => {
  try {
    const response = await fetch(
      'http://localhost:3000/user/logout'
    );
    const json = await response.json();
    return json
  } catch (error) {
    console.error(error);
  }
};