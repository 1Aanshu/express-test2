const BlogModel = require("./blog.model");

const create = (payload) => {
  return BlogModel.create(payload);
};

const getAll = () => {
  return BlogModel.find();
};

const getById = (_id) => {
  return BlogModel.findOne({ _id });
};

const updateById = (_id, payload) => {
  return BlogModel.updateOne({ _id }, payload);
};

const deleteById = (_id) => {
  return BlogModel.deleteOne({ _id });
};

const getAuthorBlogs = (name) => {
  return BlogModel.aggregate();
};

const updateStatus = async (_id) => {
  const blog = await BlogModel.findOne({ _id });
  if (!blog) throw new Error("Blog not found");
  const payload = { status: blog?.status === "draft" ? "published" : "draft" };
  return BlogModel.updateOne({ _id }, payload);
};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
  getAuthorBlogs,
  updateStatus,
};
