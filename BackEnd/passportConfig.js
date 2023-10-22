import "dotenv/config";

export const google = {
  clientID: process.env.GOOGLE_APP_ID,
  clientSecret: process.env.GMAIL_APP_SECRET,
  //todo: based on env, change url to localhost, dev or prod
  callbackURL: "http://localhost:3000/oauth2callback"
};