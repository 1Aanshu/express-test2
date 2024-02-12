const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: Number,
  roles: {
    type: [String],
    enum: ["admin", "user"],
    default: "user",
    required: true,
  },
  token: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = new model("User", userSchema);
