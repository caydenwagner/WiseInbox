// File: index.js
// Author: Cayden Wagner
// Date: 10/2/23
// Purpose: Launch point for the back end server
import express from "express";
import { initPassport } from "./initPassport.js";
import passport from "passport";
import { google } from "googleapis"
import "dotenv/config";

const app = express();
initPassport(app);
const port = 3000

// will go access 3rd party to get permission to access the data
app.get("/user/login/google", passport.authenticate(
  "google", { scope: ["profile", "email", "https://www.googleapis.com/auth/gmail.readonly"]}
)); //define this scope to have access to the email

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
    });

    const messages = response.data.messages;
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Error fetching messages' });
  }
});

app.listen(port,() => console.log("Server listening at port" + port));