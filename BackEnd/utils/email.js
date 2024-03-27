export function findContent(parts) {
  let body = '';
  let html = '';

  parts.forEach(part => {
    if (part.body && part.body.size > 0) {
      if (part.mimeType === 'text/plain' && !body) {
        body = Buffer.from(part.body.data, 'base64').toString();
      } else if (part.mimeType === 'text/html' && !html) {
        html = Buffer.from(part.body.data, 'base64').toString();
      }
    } else if (part.parts) {
      const { body: nestedBody, html: nestedHtml } = findContent(part.parts);
      if (!body && nestedBody) {
        body = nestedBody;
      }
      if (!html && nestedHtml) {
        html = nestedHtml;
      }
    }
  });

  return { body, html };
}