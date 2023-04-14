'use strict';

const { Router } = require('express');
const PeopleController = require('../controllers/people');
const GiftsController = require('../controllers/gifts');
const isAuthenticated = require('../middleware/isAuthenticated');

const GiftrRouter = Router();

/*** It checks that the user is logged-in, ***/
/*** People routes ***/
GiftrRouter.use(isAuthenticated);
GiftrRouter.get('/', PeopleController.getAll);
GiftrRouter.get('/:id', PeopleController.getOne);
GiftrRouter.post('/', PeopleController.create);
GiftrRouter.put('/:id', PeopleController.replace);
GiftrRouter.patch('/:id', PeopleController.update);
GiftrRouter.delete('/:id', PeopleController.deleteOne);

/* Gift routes */
GiftrRouter.get('/:id/gifts', GiftsController.getAll);
GiftrRouter.get('/:id/gifts/:giftId', GiftsController.getOne);
GiftrRouter.post('/:id/gifts', GiftsController.create);
// GiftrRouter.put("/:id", GiftsController.replace);
// GiftrRouter.patch("/:id", GiftsController.update);
// GiftrRouter.delete("/:id", GiftsController.deleteOne);

module.exports = GiftrRouter;
