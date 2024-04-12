// File: apiHelpers.js
// Author: Cayden Wagner
// Date: 10/2/23
// Purpose: Provide some helper function to interact with the back end through its API
import AsyncStorage from '@react-native-async-storage/async-storage';
import { removeLastLogin } from './helpers';
import RNFetchBlob from 'rn-fetch-blob'

export const getMail = async () => {
  try {
    const value = await AsyncStorage.getItem("User")
    const user = JSON.parse(value)

    const response = await RNFetchBlob.config({
      trusty : true
    }).fetch('POST', 'https://localhost:3000/gmail/messages', {
      'Content-Type': 'application/json',
      'authorization': `${user[0].accessToken}`
      }
    );

    if (!response.status === 200) {
      return null
    }
    
    const json = await response.json();

    return json;
  } catch (error) {
    console.error(error);
  }
};

export const reportEmail = async (emailID) => {
  try {
    const value = await AsyncStorage.getItem("User")
    const user = JSON.parse(value)

    const response = await RNFetchBlob.config({
      trusty : true
    }).fetch('POST', 'https://localhost:3000/gmail/report', {
      'Content-Type': 'application/json',
      'authorization': `${user[0].accessToken}`,
      'emailid': emailID
      }
    );

    if (!response.status === 200) {
      console.log("Report Mail Error")
    }
    else {
      console.log("Report Mail Success")
    } 
  } catch (error) {
    console.error(error);
  }
};

export const deleteMail = async (emailID) => {
  try {
    const value = await AsyncStorage.getItem("User")
    const user = JSON.parse(value)

    const response = await RNFetchBlob.config({
      trusty : true
    }).fetch('POST', 'https://localhost:3000/gmail/delete', {
      'Content-Type': 'application/json',
      'authorization': `${user[0].accessToken}`,
      'emailid': emailID
      }
    );

    if (!response.status === 200) {
      console.log("Delete Mail Error")
    } 
    else {
      console.log("Delete Mail Success")
    } 
  } catch (error) {
    console.error(error);
  }
};

export const blockSender = async (sender) => {
  try {
    const value = await AsyncStorage.getItem("User")
    const user = JSON.parse(value)

    const response = await RNFetchBlob.config({
      trusty : true
    }).fetch('POST', 'https://localhost:3000/gmail/block', {
      'Content-Type': 'application/json',
      'authorization': `${user[0].accessToken}`,
      'sender': sender
      }
    );

    if (!response.status === 200) {
      console.log("Block Sender Error")
    } 
    else {
      console.log("Block Sender Success")
    } 
  } catch (error) {
    console.error(error);
  }
};

export const logOut = async () => {
  try {
    removeLastLogin();

    const response = await RNFetchBlob.config({
      trusty : true
    }).fetch('GET', 'https://localhost:3000/user/logout');

    if (!response.status === 200) {
      console.log("Log Out Error")
    } 

    const json = await response.json();

    return json
  } catch (error) {
    console.error(error);
  }
};

export const getPredictionOnMail = async (emailID) => {
  try {
    const value = await AsyncStorage.getItem("User")
    const user = JSON.parse(value)

    const response = await RNFetchBlob.config({
      trusty : true
    }).fetch('POST', 'https://localhost:3000/ML/prediction', {
      'Content-Type': 'application/json',
      'authorization': `${user[0].accessToken}`,
      'emailid': emailID
      }
    );

    if (!response.status === 200) {
      throw new Error(`Prediction API request failed with status ${response.message}`); 
    }

    const json = await response.json();

    return {securityScore: json.securityScore, securityLabel: json.securityLabel}

  } catch (error) {
    throw new Error('Error fetching prediction:', error); 
  }
};

export const getGenAIPredictionOnMail = async (emailID) => {
  try {
    const value = await AsyncStorage.getItem("User")
    const user = JSON.parse(value)

    const response = await RNFetchBlob.config({
      trusty : true
    }).fetch('POST', 'https://localhost:3000/ML/genAIPrediction', {
      'Content-Type': 'application/json',
      'authorization': `${user[0].accessToken}`,
      'emailid': emailID
      }
    );

    if (!response.status === 200) {
      throw new Error(`Prediction API request failed with status ${response.message}`); 
    }

    const json = await response.json();

    return {securityScore: json.securityScore, securityLabel: json.securityLabel, resultsArray: json.resultsArray, securityDesctiption: json.securityDesctiption}

  } catch (error) {
    throw new Error('Error fetching prediction:', error); 
  }
};

