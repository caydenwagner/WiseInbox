// File: index.js
// Author: Cayden Wagner
// Date: 10/2/23
// Purpose: Launch point for the back end server
import express from "express";
import { initPassport } from "./initPassport.js";
import passport from "passport";
import { google } from "googleapis"
import { formatDate } from "./formatDate.js";
import { decode } from 'html-entities';
import "dotenv/config";

const app = express();
initPassport(app);
const port = 3000

// will go access 3rd party to get permission to access the data
app.get("/user/login/google", passport.authenticate(
  "google", { 
    scope: [
      "profile", 
      "email", 
      "https://www.googleapis.com/auth/gmail.settings.basic", // Modify settings
      "https://www.googleapis.com/auth/gmail.modify", // Modify mail
      "https://mail.google.com/", // Modify and delete mail
      "https://www.googleapis.com/auth/gmail.readonly"
    ], 
  })
); //define this scope to have access to the email

// will go access 3rd party to get permission to access the data
app.get("/user/login/google/newuser", passport.authenticate(
  "google", { 
    scope: [
      "profile", 
      "email", 
      "https://www.googleapis.com/auth/gmail.settings.basic", // Modify settings
      "https://www.googleapis.com/auth/gmail.modify", // Modify mail
      "https://mail.google.com/", // Modify and delete mail
      "https://www.googleapis.com/auth/gmail.readonly"
    ], 
    prompt: 'select_account'
  })
); //define this scope to have access to the email

app.get("/oauth2callback", passport.authenticate("google", { 
    successRedirect: '/auth/google/success',
    failureRedirect: '/auth/google/failure'
  })
);

app.get('/auth/google/success', (req, res) => {
  console.log("SUCCESS")
  res.redirect(
    `WiseInbox://app/LoginScreen?status=${"Success"}/firstName=${req.user.firstName}/email=${req.user.email}/accessToken=${req.user.accessToken}/refreshToken=${req.user.refreshToken}`
  );
})

app.get('/auth/google/failure', (req, res) => {
  // TODO: Implement error handling function
  res.redirect(
    `WiseInbox://app/LoginScreen?status=${"Failure"}`
  );})

app.get("/user/logout", function (req, res) {
  console.log("here");
  req.logout(function(err) {
    if (err) { 
      res.json({status: "Failure"}); 
    }
    res.json({status: "Success"});
  })
});

app.get("/", (req, res) => {
  console.log("Entered Get");

  res.json({"response": "Hello World"});
});

function findContent(parts) {
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
  
app.post('/gmail/messages', async (req, res) => {
  const authToken = req.headers['authorization'];

  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_APP_ID,
    process.env.GOOGLE_APP_SECRET,
    process.env.REDIRECT_URI
  )

  oAuth2Client.setCredentials({
    access_token: authToken
  })

  const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

  try {
    const response = await gmail.users.messages.list({
      userId: 'me',
      labelIds: ['INBOX'],
      maxResults: 20,
    });

    const messages = response.data.messages;

     // Fetch the details of a maximum of 5 messages
     const fullMessages = await Promise.all(messages.map(async (message) => {
      const messageDetails = await gmail.users.messages.get({
        userId: 'me',
        id: message.id,
        format: 'full', // Requesting full message details
      });

      const { payload } = messageDetails.data;
      const headers = payload.headers;
      const fromHeader = headers.find(header => header.name === 'From');
      const sender = fromHeader ? fromHeader.value : 'Sender information not available';
      const match = sender.match(/([^<]+)<([^>]+)>/);
      var senderEmail
        if (match) {
          senderEmail = match[2].trim();
        } else {
          senderEmail = sender;
        }
      const dateHeader = headers.find(header => header.name === 'Date');
      const emailDate = dateHeader ? new Date(dateHeader.value) : null;
      const subjectHeader = headers.find(header => header.name === 'Subject');
      const subject = subjectHeader ? subjectHeader.value : 'No Subject';
      const snippet = decode(messageDetails.data.snippet);
      const isInbox = messageDetails.data.labelIds.includes('INBOX');
      const isRead = !messageDetails.data.labelIds.includes('UNREAD');
      const formattedDate = formatDate(emailDate)
      const securityScore = Math.floor(Math.random() * 61) + 40
      var securityLabel = ""
      if (securityScore >= 80) {
        securityLabel = "Safe"
      }
      else if (securityScore >= 60) {
        securityLabel = "Caution"
      }
      else {
        securityLabel = "Unsafe"
      }
      let body = '';
      let html = '';

      if (payload.parts) {
        const { body: extractedBody, html: extractedHtml } = findContent(payload.parts);
        body = extractedBody;
        html = extractedHtml;
      }

      const email = {
        id: message.id,
        sender: sender,
        senderEmail: senderEmail,
        body: body, 
        html: html,
        date: formattedDate,
        subject: subject,
        snippet: snippet,
        isInbox: isInbox,
        isRead: isRead,
        securityScore: securityScore,
        securityLabel: securityLabel
      }

      return email;
    }))

    res.json(fullMessages);

  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Error fetching messages' });
  }
});

app.post('/gmail/block', async (req, res) => {
  const authToken = req.headers['authorization'];
  const sender = req.headers['sender'];

  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_APP_ID,
    process.env.GOOGLE_APP_SECRET,
    process.env.REDIRECT_URI
  )

  oAuth2Client.setCredentials({
    access_token: authToken
  })

  const gmailAPIObject = google.gmail({ version: 'v1', auth: oAuth2Client });

  gmailAPIObject.users.settings.filters.create({
    userId: 'me',
    resource: {
      criteria: {
        from: sender,
      },
      action: {
        removeLabelIds: ['INBOX'],
      },
    },
  }, (err) => {
    if (err) {
      console.log(err)
      res.status(500).json({ message: err });
    }
    else {
      res.status(200).json({ message: 'Success' });
    }
  });
});

app.post('/gmail/delete', async (req, res) => {
  const authToken = req.headers['authorization'];
  const emailID = req.headers['emailid'];

  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_APP_ID,
    process.env.GOOGLE_APP_SECRET,
    process.env.REDIRECT_URI
  )

  oAuth2Client.setCredentials({
    access_token: authToken
  })

  const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

  gmail.users.messages.delete({
    userId: 'me',
    id: emailID,
  }, (err) => {
    if (err) {
      console.log(err)
      res.status(500).json({ message: err });
    }
    else {
      res.status(200).json({ message: 'Success' });
    }
  });
});

app.post('/gmail/report', async (req, res) => {
  const authToken = req.headers['authorization'];
  const emailID = req.headers['emailid'];

  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_APP_ID,
    process.env.GOOGLE_APP_SECRET,
    process.env.REDIRECT_URI
  )

  oAuth2Client.setCredentials({
    access_token: authToken
  })

  const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

  gmail.users.messages.modify({
    userId: 'me',
    id: emailID,
    resource: {
      addLabelIds: ['SPAM'],
    },
  }, (err) => {
    if (err) {
      console.log(err)
      res.status(500).json({ message: err });
    }
    else {
      res.status(200).json({ message: 'Success' });
    }
  });
});

app.listen(port,() => console.log("Server listening at port" + port));