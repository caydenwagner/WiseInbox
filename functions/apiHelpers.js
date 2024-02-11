// File: apiHelpers.js
// Author: Cayden Wagner
// Date: 10/2/23
// Purpose: Provide some helper function to interact with the back end through its API
import AsyncStorage from '@react-native-async-storage/async-storage';
import { removeLastLogin } from './helpers';


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
    const value = await AsyncStorage.getItem("User")
    const user = JSON.parse(value)

    const response = await fetch(
      'http://localhost:3000/gmail/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `${user[0].accessToken}`
        },
      }
    );
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

export const reportMail = async (emailID) => {
  try {
    const value = await AsyncStorage.getItem("User")
    const user = JSON.parse(value)

    fetch(
      'http://localhost:3000/gmail/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `${user[0].accessToken}`,
          'emailid': emailID
        },
      }
    ).then(response => {
      if (!response.ok) {
        console.log("Report Mail Error")
      } 
      else {
        console.log("Report Mail Success")
      } 
    })
  } catch (error) {
    console.error(error);
  }
};

export const deleteMail = async (emailID) => {
  try {
    const value = await AsyncStorage.getItem("User")
    const user = JSON.parse(value)

    fetch(
      'http://localhost:3000/gmail/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `${user[0].accessToken}`,
          'emailid': emailID
        },
      }
    ).then(response => {
      if (!response.ok) {
        console.log("Delete Mail Error")
      } 
      else {
        console.log("Delete Mail Success")
      } 
    })
  } catch (error) {
    console.error(error);
  }
};

export const blockSender = async (sender) => {
  try {
    const value = await AsyncStorage.getItem("User")
    const user = JSON.parse(value)

    fetch(
      'http://localhost:3000/gmail/block', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `${user[0].accessToken}`,
          'sender': sender
        },
      }
    ).then(response => {
      if (!response.ok) {
        console.log("Delete Mail Error")
      } 
      else {
        console.log("Delete Mail Success")
      } 
    })
  } catch (error) {
    console.error(error);
  }
};

export const logOut = async () => {
  try {
    removeLastLogin();

    const response = await fetch(
      'http://localhost:3000/user/logout'
    );
    const json = await response.json();
    return json
  } catch (error) {
    console.error(error);
  }
};