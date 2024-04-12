export function extractDetails (response) {
  const securityDesctiption = response.overall_security_analysis;
  const securityLabel = response.overall_security_rating;

  // Count the number of variables that equal 'Caution' or 'Unsafe'
  const cautionCount = Object.values(response).filter(value => value === 'Caution').length;
  const unsafeCount = Object.values(response).filter(value => value === 'Unsafe').length;

  const prediction = 100 - (5 * cautionCount) - (10 * unsafeCount);

  const resultsArray = createResultsArray(response);

  return { prediction: prediction, securityDesctiption, securityLabel, resultsArray };
}

function createResultsArray(jsonObject) {
  const resultArray = [
    {
      title: 'Sender Legitimacy',
      description: jsonObject.sender_domain_analysis,
      securityLabel: jsonObject.sender_domain_rating
    },
    {
      title: 'Subject Matter Safety',
      description: jsonObject.subject_matter_analysis,
      securityLabel: jsonObject.subject_matter_rating
    },
    {
      title: 'Pressure to Take Action',
      description: jsonObject.immediate_action_analysis,
      securityLabel: jsonObject.immediate_action_rating
    },
    {
      title: 'Personal Information Request Level',
      description: jsonObject.sensitive_information_request_analysis,
      securityLabel: jsonObject.sensitive_information_request_rating
    },
    {
      title: 'Language Tone Safety',
      description: jsonObject.language_tone_analysis,
      securityLabel: jsonObject.language_tone_rating
    },
    {
      title: 'Inconsistency Level',
      description: jsonObject.inconsistency_analysis,
      securityLabel: jsonObject.inconsistency_rating
    },
  ];

  return resultArray;
}