"use strict";

const { Router } = require("express");
const passport = require("passport");

require("../utils/passport");

const authRouter = Router();

//TODO: refactor this so it dynamically redirects to google with a redirect url in the request.query
// see line 11 to 21 in week14 /router/auth.js for the code
// this redirects to google
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile"] })
);

// google sends response to this
//TODO: refactor this so that it uses the JWT and redirects with the token in the query string of our url in our React app
// see line 24 to 42 in week14 /router/auth.js for the code
authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (_req, res) => res.redirect("/api/pokemon")
);

authRouter.get("/logout", (req, res) => {
  req.logout({}, () => {
    res.redirect("/");
  });
});

module.exports = authRouter;
