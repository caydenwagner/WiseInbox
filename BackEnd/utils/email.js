export const findContent = (emailPayload) => {

  // Extract the plain text body
  const plainTextBody = getPlainTextBody(emailPayload);

  // Extract the HTML body
  const htmlBody = getHtmlBody(emailPayload);

  return { body: plainTextBody, html: htmlBody};
};

const getPlainTextBody = (payload) => {
  let body = '';

  if (payload.body && payload.body.data) {
    body = Buffer.from(payload.body.data, 'base64').toString('utf8');
  } else if (payload.parts) {
    payload.parts.forEach((part) => {
      if (part.body && part.body.data && part.mimeType === 'text/plain') {
        body = Buffer.from(part.body.data, 'base64').toString('utf8');
      } else if (part.parts) {
        body = getPlainTextBody(part);
      }
    });
  }

  return body;
};

const getHtmlBody = (payload) => {
  let body = '';

  if (payload.body && payload.body.data) {
    body = Buffer.from(payload.body.data, 'base64').toString('utf8');
  } else if (payload.parts) {
    payload.parts.forEach((part) => {
      if (part.body && part.body.data && part.mimeType === 'text/html') {
        body = Buffer.from(part.body.data, 'base64').toString('utf8');
      } else if (part.parts) {
        body = getHtmlBody(part);
      }
    });
  }

  return body;
};