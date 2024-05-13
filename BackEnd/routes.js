// routes.js
import express from 'express';
import passport from 'passport';
import { makeEmailPrediction, makeEmailPredictionGenAI } from './services/emailPrediction.js';
import { 
  getGmailClient, 
  fetchMessages, 
  blockSender, 
  deleteMessage, 
  reportMessage 
} from './services/gmail.js';
import { extractDetails } from './utils/extractDetails.js';

const router = express.Router();

// Google OAuth routes
router.get("/user/login/google", passport.authenticate(
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
); 

router.get("/user/login/google/newuser", passport.authenticate(
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
); 

router.get("/oauth2callback", passport.authenticate("google", { 
  successRedirect: '/auth/google/success',
  failureRedirect: '/auth/google/failure'
})
);

router.get('/auth/google/success', (req, res) => {
  res.redirect(`WiseInbox://app/LoginScreen?status=${"Success"}/firstName=${req.user.firstName}/email=${req.user.email}/accessToken=${req.user.accessToken}/refreshToken=${req.user.refreshToken}`);
});

router.get('/auth/google/failure', (req, res) => {
  res.redirect(`WiseInbox://app/LoginScreen?status=${"Failure"}`);
});

// Logout route
router.get('/user/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.json({ status: 'Success' });
  });
});

// Fetch emails route
router.post('/gmail/messages', async (req, res, next) => {
  try {
    const authToken = req.body.authorization;
    const gmail = await getGmailClient(authToken);
    const messages = await fetchMessages(gmail);

    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
});

// Block sender route
router.post('/gmail/block', async (req, res, next) => {
  try {
    const authToken = req.body.authorization;
    const sender = req.body.sender;
    const gmail = await getGmailClient(authToken);

    await blockSender(gmail, sender);

    res.status(200).json({ message: 'Success' });
  } catch (error) {
    next(error);
  }
});

// Delete email route
router.post('/gmail/delete', async (req, res, next) => {
  try {
    const authToken = req.body.authorization;
    const emailID = req.body.emailid;
    const gmail = await getGmailClient(authToken);

    await deleteMessage(gmail, emailID);

    res.status(200).json({ message: 'Success' });
  } catch (error) {
    next(error);
  }
});

// Report email route
router.post('/gmail/report', async (req, res, next) => {
  try {
    const authToken = req.body.authorization;
    const emailID = req.body.emailid;
    const gmail = await getGmailClient(authToken);

    await reportMessage(gmail, emailID);

    res.status(200).json({ message: 'Success' });
  } catch (error) {
    next(error);
  }
});

// Email prediction route
router.post('/ML/prediction', async (req, res, next) => {
  try {
    const authToken = req.body.authorization;
    const emailID = req.body.emailid;

    console.log(emailID);

    const { prediction, securityLabel } = await makeEmailPrediction(authToken, emailID);

    res.status(200).json({ securityScore: prediction, securityLabel });
  } catch (error) {
    next(error);
  }
});

router.post('/ML/genAIPrediction', async (req, res, next) => {
  try {
    const authToken = req.body.authorization;
    const emailID = req.body.emailid;

    const response = await makeEmailPredictionGenAI(authToken, emailID);

    const { prediction, securityDesctiption, securityLabel, resultsArray } = extractDetails(response);

    res.status(200).json({ securityScore: prediction, securityDesctiption, securityLabel, resultsArray});
  } catch (error) {
    next(error);
  }
});

export default router;