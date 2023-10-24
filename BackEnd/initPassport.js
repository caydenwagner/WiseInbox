import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import { google } from "./passportConfig.js";
import session from "express-session";
import "dotenv/config";

export const initPassport = (app) => {
  //init's the app session
  app.use(
    session({
      resave: false,
      saveUninitialized: true,
      secret: process.env.GOOGLE_APP_SECRET,
    })
  );
  //init passport
  app.use(passport.initialize());
  app.use(passport.session());
};

passport.use(
  new GoogleStrategy(
    google,
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);

      done(null, formatGoogle(profile._json));
    }
  )
);

////////// Serialize/Deserialize //////////

// Serialize user into the sessions
passport.serializeUser((user, done) => done(null, user));

// Deserialize user from the sessions
passport.deserializeUser((user, done) => done(null, user));

////////// Format data//////////

const formatGoogle = (profile) => {
  return {
    firstName: profile.given_name,
    email: profile.email
  };
};