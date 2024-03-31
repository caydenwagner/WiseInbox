import 'dotenv/config';
import fetch from 'node-fetch';
import { getGmailClient, getMessageDetails } from './gmail.js';
import cache from '../cache.js';

// Sends an api request to the ML model at the apiURL
// Returns an integer prediciton 1-100
// Returns defualt vaules null if the request is unsucessful
export async function makeEmailPrediction (authToken, emailID) {
  const cacheKey = `prediction:${emailID}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    return cachedData;
  }
  const apiUrl = process.env.ML_API;
  const gmail = await getGmailClient(authToken);
  const fullEmail = await getMessageDetails(gmail, emailID);

  const inputData = {
    Email: fullEmail.body,
    Sender: fullEmail.sender,
    Subject: fullEmail.subject,
  };

  const ERROR_SECURITY_SCORE = null
  const ERROR_SECURITY_LABEL = "ERROR"

  var prediction = ERROR_SECURITY_SCORE
  var securityLabel = ERROR_SECURITY_LABEL

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputData),
    });

    if (!response.ok) {
      console.log("Network error: " + response.status);
    }
    else {
      const data = await response.json();
      prediction = data.prediction;
      console.log("Made Prediction: " + prediction)

      if (prediction >= 80) {
        securityLabel = "Safe"
      }
      else if (prediction >= 60) {
        securityLabel = "Caution"
      }
      else {
        securityLabel = "Unsafe"
      }

      const cacheData = { prediction, securityLabel };
      cache.set(cacheKey, cacheData);
    }

    return { prediction, securityLabel }; 
  } catch (error) {
    console.error('Error fetching prediction:', error);
    return { prediction, securityLabel };
  }
}