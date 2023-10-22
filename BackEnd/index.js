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
  "google", { scope: ["profile", "email"] }
)); //define this scope to have access to the email

app.get("/oauth2callback", passport.authenticate("google"),
  // Redirect user back to the mobile app using deep linking
  (req, res) => {
    res.redirect(
      `WiseInbox://app/ViewEmailScreen?firstName=${req.user.firstName}/lastName=${req.user.lastName}/email=${req.user.email}`
    );
  }
);

app.get("/logout", function (req, res) {
  console.log("here");
  req.session.destroy(function () {
    res.redirect("/login");
  });
});

app.get("/", (req, res) => {
  console.log("Entered Get");
  res.json({"response": "Hello World"});
});

app.listen(port,() => console.log("Server listening at port" + port));