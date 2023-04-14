'use strict';

const Person = require('../models/person');

//GET (all)
const getAll = async (personId) => {
	const gifts = await Person.find({ personId }).gifts;
	return gifts;
};

// GET
const getOne = async (personId, giftId) => {
	const foundGift = await Person.findById(personId).gifts.findById(giftId);
	if (!foundGift) throw new NotFoundError(`Gift with id ${id} not found`);
	return foundGift;
};

// POST
const create = async (personId, giftData) => {
	const updatedPerson = await Person.findByIdAndUpdate(
		personId,
		{
			$addToSet: {
				abilities: giftData,
			},
		},
		{
			returnOriginal: false,
		}
	);

	return updatedPerson.abilities[updatedPerson.abilities.length - 1];
};

// PATCH
const update = async (personId, giftId, giftData) => {
	const updateObj = {};

	Object.keys(giftData).forEach((key) => {
		updateObj[`gifts.$.${key}`] = giftData[key];
	});

	const updatedPerson = await Gift.findOneAndUpdate(
		{ _id: personId, 'gifts._id': giftId },
		{
			$set: updateObj,
		},
		{
			returnOriginal: false,
			runValidators: true,
		}
	);

	return updatedPerson.gifts.find((gift) => gift._id.toString() === giftId);
};

// PUT
const replace = async (personId, giftId, giftData) => {
	if (!giftData.txt || !giftData.store || !giftData.url)
		throw new BadRequestError('Gift idea, Store and URL are required');

	const replacedPerson = await Person.findOneAndUpdate(
		{ _id: personId, 'gifts._id': giftId },
		{
			...giftData,
		},
		{
			returnOriginal: false,
		}
	);

	if (!replacedPerson)
		throw new NotFoundError(`Gift with id ${id} not found`);

	return replacedPokemon;
};

// DELETE (one)

const deleteOne = async (personId, giftId) => {
	const deletedGift = await Person.find(personId).findByIdAndDelete(giftId);

	if (!deletedGift) throw new NotFoundError(`Gift with id ${id} not found`);

	return deletedGift;
};

module.exports = {
	getAll,
	getOne,
	create,
	update,
	replace,
	deleteOne,
};
