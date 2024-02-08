const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: String,
  email: { type: String, requires: true, unique: true },
  phone: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = new model("User", userSchema);
