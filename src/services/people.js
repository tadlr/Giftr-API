"use strict";

const Person = require('../models/person');
const {
	BadRequestError,
	NotFoundError,
	UnauthorizedError,
} = require('../utils/errors');

const getAll = async (ownerId) => {
	const people = await Person.find({ ownerId }).select('name dob gifts');
	return people;
};

const getOne = async (id, ownerId) => {
	const foundPerson = await Person.findById(id);
	if (foundPerson.ownerId.toString() != ownerId.toString()) {
		throw new UnauthorizedError(
			'You are not authorized to access this person.'
		);
	}

	if (!foundPerson) throw new NotFoundError(`Person with id ${id} not found`);
	return foundPerson;

};

const create = async (personData) => {
  const newPerson = new Person(personData);
  await newPerson.save();
  return newPerson;
};

const replace = async (id, ownerId, personData) => {
	if (!personData.name || !personData.dob)
		throw new BadRequestError('Name and Date Of Birth (dob) are required');

	const replacedPerson = await Person.findByIdAndUpdate(
		id,
		{
			...personData,
		},
		{
			returnOriginal: false,
		}
	);

	if (replacedPerson.ownerId.toString() != ownerId.toString()) {
		throw new UnauthorizedError(
			'You are not authorized to access this person.'
		);
	}

	if (!replacedPerson)
		throw new NotFoundError(`Person with id ${id} not found`);

	return replacedPerson;

};

const update = async (id, updatedFields) => {
  if (!Object.keys(updatedFields).length)
    throw new BadRequestError("Nothing to update");
  const updatedPerson = await Person.findByIdAndUpdate(
    id,
    {
      ...updatedFields,
    },
    {
      returnOriginal: false,
    }
  );

  if (!updatedPerson) throw new NotFoundError(`Person with id ${id} not found`);

  return updatedPerson;
};

const deleteOne = async (id) => {
  const deletedPerson = await Person.findByIdAndDelete(id);

  if (!deletedPerson) throw new NotFoundError(`Person with id ${id} not found`);

  return deletedPerson;
};

module.exports = {
  getAll,
  getOne,
  create,
  replace,
  update,
  deleteOne,
};
