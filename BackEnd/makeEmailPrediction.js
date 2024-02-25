import fetch from 'node-fetch';

// Sends an api request to the ML model at the apiURL
// Returns an integer prediciton 1-100
// Returns defualt vaules null if the request is unsucessful
export async function makeEmailPrediction (body, sender, subject) {
  const apiUrl = 'https://d58a-35-221-41-212.ngrok-free.app/email_prediction';

  const inputData = {
    Email: body,
    Sender: sender,
    Subject: subject,
  };

  const DEFAULT_SECURITY_SCORE_ON_ERROR = null
  const DEFAULT_SECURITY_LABEL_ON_ERROR = "ERROR"

  var prediction = DEFAULT_SECURITY_SCORE_ON_ERROR
  var securityLabel = DEFAULT_SECURITY_LABEL_ON_ERROR

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
      const prediction = data.prediction;
      console.log("Made Prediction: " + prediction)
      let securityLabel = ""

      if (prediction >= 80) {
        securityLabel = "Safe"
      }
      else if (prediction >= 60) {
        securityLabel = "Caution"
      }
      else {
        securityLabel = "Unsafe"
      }
    }
    return { prediction, securityLabel }; 
  } catch (error) {
    console.error('Error fetching prediction:', error);
    return { prediction, securityLabel };
  }
}