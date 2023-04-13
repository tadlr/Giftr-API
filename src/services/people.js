"use strict";

const People = require("../models/person");
const { BadRequestError, NotFoundError } = require("../utils/errors");

const getAll = async () => {
  const people = await People.find();
  return people;
};

const getOne = async (id) => {
  const foundPeople = await People.findById(id);
  if (!foundPeople) throw new NotFoundError(`People with id ${id} not found`);
  return foundPeople;
};

const create = async (name, dob, ownerId, gifts = []) => {
  const newPeople = new People({
    name,
    dob,
    ownerId,
    gifts,
  });
  await newPeople.save();
  return newPeople;
};

const replace = async (id, peopleData) => {
  if (!peopleData.name || !peopleData.type || !peopleData.abilities)
    throw new BadRequestError("Name, Type and Abilities are required");

  const replacedPeople = await People.findByIdAndUpdate(
    id,
    {
      ...peopleData,
    },
    {
      returnOriginal: false,
    }
  );

  if (!replacedPeople)
    throw new NotFoundError(`People with id ${id} not found`);

  return replacedPeople;
};

const update = async (id, updatedFields) => {
  if (!Object.keys(updatedFields).length)
    throw new BadRequestError("Nothing to update");
  const updatedPeople = await People.findByIdAndUpdate(
    id,
    {
      ...updatedFields,
    },
    {
      returnOriginal: false,
    }
  );

  if (!updatedPeople) throw new NotFoundError(`People with id ${id} not found`);

  return updatedPeople;
};

const deleteOne = async (id) => {
  const deletedPeople = await People.findByIdAndDelete(id);

  if (!deletedPeople) throw new NotFoundError(`People with id ${id} not found`);

  return deletedPeople;
};

module.exports = {
  getAll,
  getOne,
  create,
  replace,
  update,
  deleteOne,
};
