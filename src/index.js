"use strict";

require("dotenv/config");
const express = require("express");
const MongoStore = require("connect-mongo");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
// TODO: install the following modules
// TODO: import helmet
// TODO: import cors
// TODO: import xss
// TODO: import jsonwebtoken

const pokemonRouter = require("./router/pokemon"); // TODO: change to /people router
const { errorHandler } = require("./utils/errors");
const authRouter = require("./router/auth");

require("./utils/db");

const app = express();

app.use(express.json());
app.use(morgan("tiny"));

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
    }),
  })
); // TODO: see WEEK 14 repo for changes - SESSION_SECRET will be replaced by JWT
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (_req, res) => res.send("Server running"));
app.use("/auth", authRouter);
app.use("/api/pokemon", pokemonRouter); //TODO: change/reformat to people router // TODO: import sanitizeBody middleware from week14 albatrooss

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
