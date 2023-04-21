const PeopleService = require('../services/people');

const getAll = async (req, res, next) => {
	try {
		const { _id: ownerId } = req.user;
		const people = await PeopleService.getAll(ownerId);
		const pplData = people.map((person) => {
			return {
				_id: person._id,
				name: person.name,
				dob: person.dob,
				giftCount: person.gifts.length,
			};
		});
		res.json({ data: pplData });
	} catch (error) {
		next(error);
	}
};

const getOne = async (req, res, next) => {
	try {
		const { _id: ownerId } = req.user;
		const people = await PeopleService.getOne(req.params.id, ownerId);
		res.json({ data: people });
	} catch (error) {
		next(error);
	}
};

const create = async (req, res, next) => {
	try {
		const { name, dob } = req.sanitizedBody;
		const { _id: ownerId } = req.user;

		const createdPeople = await PeopleService.create({ name, dob, ownerId });

		res.status(201).json({ data: createdPeople });
	} catch (error) {
		next(error);
	}
};

const replace = async (req, res, next) => {
	try {
		const { _id: ownerId } = req.user;
		const replacedPeople = await PeopleService.replace(
			req.params.id,
			ownerId,
			req.body
		);

		res.json({ data: replacedPeople });
	} catch (error) {
		next(error);
	}
};

const update = async (req, res, next) => {
	try {
		const { _id: ownerId } = req.user;
		const updatedPeople = await PeopleService.update(
			req.params.id,
			ownerId,
			req.body
		);
		res.json({ data: updatedPeople });
	} catch (error) {
		next(error);
	}
};

const deleteOne = async (req, res, next) => {
	try {
		const deletedperson = await PeopleService.deleteOne(req.params.id);
		res.json({ data: deletedperson });
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
