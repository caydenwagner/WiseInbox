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
    Email: fullEmail.body.length > 0 ? fullEmail.body : fullEmail.snippet,
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

export async function makeEmailPredictionGenAI(authToken, emailID) {
  const cacheKey = `predictionGenAI:${emailID}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    return cachedData;
  }
  
  const gmail = await getGmailClient(authToken);
  const fullEmail = await getMessageDetails(gmail, emailID);
  const url = 'https://api.anthropic.com/v1/messages';

  const messages = [
    {
      role: 'user',
      content: makePrompt(fullEmail),
    },
  ];

  const requestBody = {
    'model': 'claude-3-sonnet-20240229',
    'messages': messages,
    'max_tokens': 2048,
  };

  const headers = {
    'Content-Type': 'application/json',
    'x-api-key': process.env.CLAUDE_SECRET,
    'anthropic-version': `2023-06-01`,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`API request failed with status code ${errorData}`);
    }

    const data = await response.json();
    const responseText = data.content[0].text;
    const jsonObject = extractJSONFromString(responseText);

    if (jsonObject) {
      cache.set(cacheKey, jsonObject);
    }

    return jsonObject;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

function makePrompt(fullEmail) {
  const { senderEmail, subject, body } = fullEmail;

  const prompt = `Human: Respond with only JSON format. Act as an advisor to a non-technical user such as an elderly person. Perform a security scan on this email for potential scams or threats. Note that this email is randomly selected and is expected to be legitimate. Provide clear and concise feedback on any suspicious elements found in the email, but avoid being overly skeptical.

Subject: ${subject}
Sender: ${senderEmail}
Body: ${body}

The JSON response should follow this structure:

{
  "sender_domain_rating": choose one from "Safe", "Caution", "Unsafe",
  "sender_domain_analysis": "BRIEF ANALYSIS OF SENDER DOMAIN LEGITIMACY",
  "subject_matter_rating": choose one from "Safe", "Caution", "Unsafe",
  "subject_matter_analysis": "BRIEF ANALYSIS OF SUBJECT MATTER CONCERNS",
  "sensitive_information_request_rating": choose one from "Safe", "Caution", "Unsafe",
  "sensitive_information_request_analysis": "BRIEF ANALYSIS OF SENSITIVE INFORMATION REQUESTS",
  "language_tone_rating": choose one from "Safe", "Caution", "Unsafe",
  "language_tone_analysis": "BRIEF ANALYSIS OF LANGUAGE AND TONE CONCERNS",
  "inconsistency_rating": choose one from "Safe", "Caution", "Unsafe",
  "inconsistency_analysis": "BRIEF ANALYSIS OF INCONSISTENCIES IN EMAIL",
  "immediate_action_rating": choose one from "Safe", "Caution", "Unsafe",
  "immediate_action_analysis": "BRIEF ANALYSIS OF IMMEDIATE ACTION DEMANDS",
}Assistant: `;

  return prompt;
}

function extractJSONFromString(inputString) {
  // Find the index of the first '{' character in the string
  const openingBraceIndex = inputString.indexOf('{');
  
  // Find the index of the last '}' character in the string
  const closingBraceIndex = inputString.lastIndexOf('}');
  
  // Check if both opening and closing braces exist in the string
  if (openingBraceIndex !== -1 && closingBraceIndex !== -1) {
    // Extract the substring containing the JSON object
    const jsonString = inputString.substring(openingBraceIndex, closingBraceIndex + 1).trim();
    
    // Try parsing the extracted substring as JSON
    try {
      const jsonObject = JSON.parse(jsonString);
      return jsonObject;
    } catch (error) {
      // JSON parsing failed
      console.error("Error parsing JSON:", error);
      return null;
    }
  } else {
    // Opening or closing braces not found in the string
    console.error("Opening or closing braces not found in the input string.");
    return null;
  }
}