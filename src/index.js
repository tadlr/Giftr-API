"use strict";

require("dotenv/config");
const express = require("express");
const MongoStore = require("connect-mongo");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
const xss = require("xss");
const jsonwebtoken = require("jsonwebtoken");
const sanitizeBody = require("./middleware/sanitizeBody");

// TODO: install the following modules
// TODO: import helmet
// TODO: import cors

const pokemonRouter = require('./router/pokemon'); // TODO: change to /people router
const { errorHandler } = require('./utils/errors');
const authRouter = require('./router/auth');

require('./utils/db');

const app = express();

app.use(express.json());
app.use(morgan('tiny'));


app.use(passport.initialize());
app.use(passport.session());

app.get("/", (_req, res) => res.send("Server running"));
app.use("/auth", authRouter);
app.use("/api/pokemon", sanitizeBody, pokemonRouter); //TODO: change/reformat to people router // TODO: import sanitizeBody middleware from week14 albatrooss

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});
