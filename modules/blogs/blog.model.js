const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;

const blogSchema = new Schema({
  title: { type: String, required: [true, "Why no title"] },
  tags: [String],
  content: { type: String },
  author: { type: ObjectId, ref: "User", required: true },
  words: { type: Number, default: 0 },
  status: { type: String, enum: ["published", "draft"], default: "draft" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = new model("Blog", blogSchema);
