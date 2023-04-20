'use strict';

const Person = require('../models/person');
const { BadRequestError, NotFoundError } = require('../utils/errors');

//GET (all)
const getAll = async (personId) => {
	const person = await Person.findById(personId);
	return person.gifts;
};

// GET
const getOne = async (personId, giftId) => {
	const person = await Person.findById(personId);
	if (!person) throw new NotFoundError(`Person with id ${personId} not found`);

	const foundGift = person.gifts.id(giftId);
	if (!foundGift) throw new NotFoundError(`Gift with id ${giftId} not found`);
	
	return foundGift;
};

// POST
const create = async (personId, giftData) => {
	const updatedPerson = await Person.findByIdAndUpdate(
		personId,
		{
			$addToSet: {
				gifts: giftData,
			},
		},
		{
			returnOriginal: false,
		}
	);
	if (!updatedPerson)
		throw new NotFoundError(
			`Person with id ${personId} not found and so could not create new gift.`
		);
	return updatedPerson.gifts[updatedPerson.gifts.length - 1];
};

// PATCH
const update = async (personId, giftId, giftData) => {
	const updateObj = {};

	if (!Object.keys(giftData).length)
		throw new BadRequestError('Nothing to update');

	Object.keys(giftData).forEach((key) => {
		updateObj[`gifts.$.${key}`] = giftData[key];
	});

	const updatedPerson = await Person.findOneAndUpdate(
		{ _id: personId, 'gifts._id': giftId },
		{
			$set: updateObj,
		},
		{
			returnOriginal: false,
			runValidators: true,
		}
	);
	if (!updatedPerson)
		throw new NotFoundError(
			`Person with id ${personId} and ${giftId} could not found and so could not update gift.`
		);

	const updatedGift = updatedPerson.gifts.find(
		(gift) => gift._id.toString() === giftId
	);

	return updatedGift;
};

// DELETE (one)

const deleteOne = async (personId, giftId) => {
	const deletedGift = await Person.findByIdAndUpdate(
		personId,
		{
			$pull: {
				gifts: { _id: giftId },
			},
		},
		{
			new: true,
		}
	);

	if (!deletedGift) throw new NotFoundError(`Gift with id ${giftId} not found`);

	return { message: `Gift with id ${giftId} has been deleted` };
};

module.exports = {
	getAll,
	getOne,
	create,
	update,
	deleteOne,
};
