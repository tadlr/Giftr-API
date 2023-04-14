"use strict";

require("dotenv/config");
const express = require("express");
const MongoStore = require("connect-mongo");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
const peopleRouter = require("./router/people");
const { errorHandler } = require("./utils/errors");
const authRouter = require("./router/auth");
const sanitizeBody = require("./middleware/sanitizeBody");
require("./utils/db");

const port = process.env.PORT || 3000;

// TODO: install the following modules
// TODO: import helmet
// TODO: import cors

const app = express();

app.use(helmet());
app.use(compression());
app.use(expressSanitize());
app.use(
  cors({
    origin: process.env.CORS_WHITELIST.split(","),
  })
);
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
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (_req, res) => res.send("Server running"));
app.use("/auth", authRouter);
app.use("/api/people", sanitizeBody, peopleRouter);

app.use(errorHandler);

app.listen(port, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server's up using port ${port}. http://localhost:${port}/`);
});
