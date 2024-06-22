// File: apiHelpers.js
// Author: Cayden Wagner
// Date: 10/2/23
// Purpose: Provide some helper function to interact with the back end through its API
import AsyncStorage from '@react-native-async-storage/async-storage';
import { removeLastLogin } from './helpers';

export const getMail = async () => {
  try {
    const value = await AsyncStorage.getItem("User");
    const user = JSON.parse(value);
    const authToken = user[0].accessToken;

    const response = await fetch('https://hopelessly-summary-chow.ngrok-free.app/gmail/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ authorization: authToken })
    });

    if (!response.ok) {
      return null;
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

export const reportEmail = async (emailID) => {
  try {
    const value = await AsyncStorage.getItem("User");
    const user = JSON.parse(value);
    const authToken = user[0].accessToken;

    const response = await fetch('https://hopelessly-summary-chow.ngrok-free.app/gmail/report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ authorization: authToken, emailid: emailID })
    });

    if (!response.ok) {
      console.log("Report Mail Error");
    } else {
      console.log("Report Mail Success");
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteMail = async (emailID) => {
  try {
    const value = await AsyncStorage.getItem("User");
    const user = JSON.parse(value);
    const authToken = user[0].accessToken;

    const response = await fetch('https://hopelessly-summary-chow.ngrok-free.app/gmail/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ authorization: authToken, emailid: emailID })
    });

    if (!response.ok) {
      console.log("Delete Mail Error");
    } else {
      console.log("Delete Mail Success");
    }
  } catch (error) {
    console.error(error);
  }
};

export const blockSender = async (sender) => {
  try {
    const value = await AsyncStorage.getItem("User");
    const user = JSON.parse(value);
    const authToken = user[0].accessToken;

    const response = await fetch('https://hopelessly-summary-chow.ngrok-free.app/gmail/block', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ authorization: authToken, sender })
    });

    if (!response.ok) {
      console.log("Block Sender Error");
    } else {
      console.log("Block Sender Success");
    }
  } catch (error) {
    console.error(error);
  }
};

export const logOut = async () => {
  try {
    removeLastLogin();

    const response = await fetch('https://hopelessly-summary-chow.ngrok-free.app/user/logout', {
      method: 'GET'
    });

    if (!response.ok) {
      console.log("Log Out Error");
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

export const getPredictionOnMail = async (emailID) => {
  try {
    const value = await AsyncStorage.getItem("User");
    const user = JSON.parse(value);
    const authToken = user[0].accessToken;

    const response = await fetch('https://hopelessly-summary-chow.ngrok-free.app/ML/prediction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ authorization: authToken, emailid: emailID })
    });

    if (!response.ok) {
      throw new Error(`Prediction API request failed with status ${response.status}`);
    }

    const json = await response.json();
    return { securityScore: json.securityScore, securityLabel: json.securityLabel };
  } catch (error) {
    throw new Error('Error fetching prediction:', error);
  }
};

export const getGenAIPredictionOnMail = async (emailID) => {
  try {
    const value = await AsyncStorage.getItem("User");
    const user = JSON.parse(value);
    const authToken = user[0].accessToken;

    const response = await fetch('https://hopelessly-summary-chow.ngrok-free.app/ML/genAIPrediction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ authorization: authToken, emailid: emailID })
    });

    if (!response.ok) {
      throw new Error(`Prediction API request failed with status ${response.status}`);
    }

    const json = await response.json();
    return { securityScore: json.securityScore, securityLabel: json.securityLabel, resultsArray: json.resultsArray, securityDesctiption: json.securityDesctiption };
  } catch (error) {
    throw new Error('Error fetching prediction:', error);
  }
};