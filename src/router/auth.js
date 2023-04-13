"use strict";

const { Router } = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");

require("../utils/passport");

const authRouter = Router();

//TODO: refactor this so it dynamically redirects to google with a redirect url in the request.query
// see line 11 to 21 in week14 /router/auth.js for the code
// this redirects to google
authRouter.get("/google", (req, res, next) => {
  //localhost:3001/auth/google?redirect_url=http://localhost:3000/login-success
  // TODO: Router on success /people
  // TODO: Router on success /login
  const { redirect_url } = req.query;

  const authenticator = passport.authenticate("google", {
    scope: ["profile"],
    state: redirect_url,
  });
  return authenticator(req, res, next);
});

// google sends response to this
//TODO: refactor this so that it uses the JWT and redirects with the token in the query string of our url in our React app
// see line 24 to 42 in week14 /router/auth.js for the code
authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }), // TODO: On success /people or fail / with error message.
  (req, res) => {
    // lookup the state from googl
    const { state } = req.query;
    // define redirectUrl from the state or default to '/api/pokemon'
    const redirectUrl = state ?? "/api/pokemon"; // TODO: change the endpoint to /people

    // get the user's id
    const id = req.user._id.toString();

    // create the token
    const token = jwt.sign({ id }, process.env.JWT_SECRET);

    //redirect with the token
    res.redirect(`${redirectUrl}?token=${token}`);
  }
);

authRouter.get("/logout", (req, res) => {
  req.logout({}, () => {
    res.redirect("/");
  });
});

module.exports = authRouter;
