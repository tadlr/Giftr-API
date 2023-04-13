"use strict";

const { Router } = require("express");
const GiftsController = require("../controllers/gifts");

const GiftsRouter = Router();

GiftsRouter.get("/:id/gifts", GiftsController.getAll);
GiftsRouter.get("/:id/gifts/:giftId", GiftsController.getOne);

// TODO: Ask if we need the isAuthenticated;
// GiftsRouter.post("/person/:id/gifts", GiftsController.create);
// GiftsRouter.put("/:id", GiftsController.replace);
// GiftsRouter.patch("/:id", GiftsController.update);
// GiftsRouter.delete("/:id", GiftsController.deleteOne);

module.exports = GiftsRouter;
