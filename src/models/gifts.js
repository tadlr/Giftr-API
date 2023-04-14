const { Schema, model } = require("mongoose");

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

module.exports = model("gifts", GiftsSchema);
