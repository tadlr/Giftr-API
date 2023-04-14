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
GiftrRouter.patch('/:id/gifts/:giftId', GiftsController.update);
GiftrRouter.delete('/:id/gifts/:giftId', GiftsController.deleteOne);

module.exports = GiftrRouter;
