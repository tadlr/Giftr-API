const { Schema, model, Types } = require("mongoose");
const GiftsSchema = require("./gifts");

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
      ref: "User",
      required: true,
    },
    gifts: [],
  },
  {
    timestamps: true,
  }
);

module.exports = model("person", personSchema);
