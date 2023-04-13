const { Schema, model, mongoose } = require("mongoose");
const giftsSchema = require("./gifts");

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
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      default: "", //TODO: Ask about default user.
    },
    gifts: [],
  },
  {
    timestamps: true,
  }
);

module.exports = model("person", personSchema);
