const { Schema, model } = require("mongoose");

const giftsSchema = new Schema({
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
  // gifts: [giftsSchema], // TODO: Ask why this is required.
});

module.exports = model("gifts", giftsSchema);
