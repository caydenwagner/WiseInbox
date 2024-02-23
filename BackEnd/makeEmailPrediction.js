import fetch from 'node-fetch';

export async function makeEmailPrediction (body, sender, subject) {
  const apiUrl = 'https://d58a-35-221-41-212.ngrok-free.app/email_prediction';

  const inputData = {
    Email: body,
    Sender: sender,
    Subject: subject,
  };

  const DEFAULT_SECURITY_SCORE_ON_ERROR = 50
  const DEFAULT_SECURITY_LABEL_ON_ERROR = "UNSAFE"

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
      return { DEFAULT_SECURITY_SCORE_ON_ERROR, DEFAULT_SECURITY_LABEL_ON_ERROR };
    }

    const data = await response.json();
    const prediction = data.prediction;
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
    return { prediction, securityLabel }; // Return the prediction value
  } catch (error) {
    console.error('Error fetching prediction:', error);
    return { DEFAULT_SECURITY_SCORE_ON_ERROR, DEFAULT_SECURITY_LABEL_ON_ERROR };
  }
}