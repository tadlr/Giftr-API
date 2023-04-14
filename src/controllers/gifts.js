'use strict';

const GiftService = require('../services/gifts');

// GET (all)
const getAll = async (req, res, next) => {
	try {
		// people/:id
		const { id: personId } = req.params;
		const gifts = await GiftService.getAll(personId);
		res.json({ data: gifts });
	} catch (error) {
		next(error);
	}
};
// GET
const getOne = async (req, res, next) => {
	// people/:id/gifts/:giftId
	try {
		//TODO: we need to make sure that the gifts belong to the person who owns them
		// look at create service and controller
		const { id: personId, giftId: giftId } = req.params;
		const gifts = await GiftService.getOne(personId, giftId);
		// const gifts = await GiftService.getOne(req.params.giftId);
		res.json({ data: gifts });
	} catch (error) {
		next(error);
	}
};

// POST
const create = async (req, res, next) => {
	const { id: personId } = req.params;

	try {
		const createdGift = await GiftService.create(personId, req.sanitizedBody);

		res.json({ data: createdGift });
	} catch (error) {
		next(error);
	}
};

// PATCH
const update = async (req, res, next) => {
	const { id: personId, giftId: giftId } = req.params;

	try {
		const updatedGift = await GiftService.update(
			personId,
			giftId,
			req.sanitizedBody
		);

		res.json({ data: updatedGift });
	} catch (error) {
		next(error);
	}
};

// PUT
const replace = async (req, res, next) => {
	const { id: personId, giftId: giftId } = req.params;
	try {
		const replacedGift = await GiftService.replace(
			personId,
			giftId,
			req.sanitizedBody
		);
		res.json({ data: replacedGift });
	} catch (error) {
		next(error);
	}
};

// DELETE (one)
const deleteOne = async (req, res, next) => {
	const { id: personId, giftId: giftId } = req.params;
	try {
		const deletedgift = await GiftService.deleteOne(personId, giftId);
		res.json({ data: deletedgift });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getAll,
	getOne,
	create,
	replace,
	update,
	deleteOne,
};
