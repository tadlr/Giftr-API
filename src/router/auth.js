"use strict";

const { Router } = require("express");
const passport = require("passport");

require("../utils/passport");

const authRouter = Router();

// this redirects to google
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile"] })
);

// google sends response to this
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
