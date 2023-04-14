"use strict";

const { Router } = require("express");
const PeopleController = require("../controllers/people");
const isAuthenticated = require("../middleware/isAuthenticated");

const PeopleRouter = Router();

// PeopleRouter.use(isAuthenticated);
PeopleRouter.get("/", PeopleController.getAll);
PeopleRouter.get("/:id", PeopleController.getOne);

/*** It checks that the user is logged-in, ***/
// PeopleRouter.post("/", PeopleController.create);
// PeopleRouter.put("/:id", PeopleController.replace);
// PeopleRouter.patch("/:id", PeopleController.update);
// PeopleRouter.delete("/:id", PeopleController.deleteOne);

module.exports = PeopleRouter;
