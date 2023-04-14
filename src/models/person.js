const { Schema, model, Types } = require('mongoose');

const GiftsSchema = new Schema(
	{
		txt: {
			type: String,
			required: true,
		},
		store: {
			type: String,
			required: true,
		},
		url: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const personSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		dob: {
			type: Date,
			required: true,
		},
		ownerId: {
			type: Types.ObjectId,
			ref: 'User',
			required: true,
		},
		gifts: [GiftsSchema],
	},
	{
		timestamps: true,
	}
);

module.exports = model('person', personSchema);
