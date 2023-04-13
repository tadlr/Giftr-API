"use strict";

const mongoose = require("mongoose");
const createDebug = require("debug");
const debug = createDebug("app:errorHandler");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => debug("Could not connect to MongoDB", err));
