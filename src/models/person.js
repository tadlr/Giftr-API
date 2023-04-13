const { Schema, model } = require("mongoose");
const Gift = require("./gifts");

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
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      default: "", //TODO: Ask about default user.
    },
    gifts: [Gift],
  },
  {
    timestamps: true,
  }
);

module.exports = model("person", personSchema);
