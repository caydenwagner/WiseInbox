// File: index.js
// Author: Cayden Wagner
// Date: 10/2/23
// Purpose: Launch point for the back end server
import express from "express";
import { initPassport } from "./initPassport.js";
import passport from "passport";

const app = express();
initPassport(app);
const port = 3000

// will go access 3rd party to get permission to access the data
app.get("/user/login/google", passport.authenticate(
  "google", { scope: ["profile", "email"]}
)); //define this scope to have access to the email

app.get("/oauth2callback", passport.authenticate("google", { 
    successRedirect: '/auth/google/success',
    failureRedirect: '/auth/google/failure'
  })
);

app.get('/auth/google/success', (req, res) => {
  console.log("SUCCESS")
  console.log(req.user.accessToken)
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
  console.log(req.user)
  console.log(req.user.accessToken)
  res.json({"response": "Hello World"});
});

app.listen(port,() => console.log("Server listening at port" + port));