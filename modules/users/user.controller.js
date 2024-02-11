const UserModel = require("./user.model");
const { hashPassword, comparePassword } = require("../../utils/bcrypt");
const { mailer } = require("../../services/mailer");
const { use } = require("./user.route");

const create = (payload) => {
  return UserModel.create(payload);
};

const getAll = () => {
  return UserModel.find();
};

const getById = (_id) => {
  return UserModel.findOne({ _id });
};

const updateById = (_id, payload) => {
  return UserModel.updateOne({ _id }, payload);
};

const removeById = (_id) => {
  return UserModel.deleteOne({ _id });
};

const register = async (payload) => {
  const { password } = payload;
  if (!password) throw new Error("Password field is missing");
  payload.password = hashPassword(payload.password);
  const user = await UserModel.create(payload);
  if (!user) throw new Error("User Registration Failed");
  const mail = await mailer(user.email);
  if (mail) return "User Registration Completed";
};

const login = async (payload) => {
  const { email, password } = payload;
  if (!email || !password) throw new Error("Email or Password is missing");
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("User doesn't exist");
  const { password: hashPw } = user;
  const result = comparePassword(password, hashPw);
  if (!result) throw new Error("Email or Password mismatch");
  return "User logged in Successfully ";
};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  removeById,
  register,
  login,
};
