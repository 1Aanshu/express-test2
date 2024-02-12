const UserModel = require("./user.model");
const { hashPassword, comparePassword } = require("../../utils/bcrypt");
const { mailer } = require("../../services/mailer");
const { signJWT } = require("../../utils/token");

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
  const mail = await mailer(
    user.email,
    "Blog Mgmt",
    "User registration Completed"
  );
  if (mail) return "User Registration Completed";
};

const login = async (payload) => {
  const { email, password } = payload;
  if (!email || !password) throw new Error("Email or Password is missing");
  const user = await UserModel.findOne({ email }).select("+password");
  if (!user) throw new Error("User doesn't exist");
  const { password: hashPw } = user;
  const result = comparePassword(password, hashPw);
  if (!result) throw new Error("Email or Password mismatch");
  const userPayload = { name: user.name, email: user.email, roles: user.roles };
  const token = signJWT(userPayload);
  return token;
};

const generateFPToken = async (payload) => {
  const { email } = payload;
  if (!email) throw new Error("Email not found");
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("User doesn't exist");
  const token = generateFPToken();
  await UserModel.updateOne({ email }, { token });
  await mailer(email, "Forget Password Token", `Your reset token is ${token}`);
  return "Token sent to email";
};

const verifyFPToken = async (payload) => {
  const { token, email, password } = payload;
  if (!token || !email || !password) throw new Error("Something is Missing");
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("User Doesn't exist");
  if (token !== user.token) throw new Error("Invalid Token");
  const updatedUser = await UserModel.updateOne(
    { email },
    { password: hashPassword(password), token: "" }
  );
  if (!updatedUser) throw new Error("Password update Failed");
  return "Password changed Successfully";
};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  removeById,
  register,
  login,
  generateFPToken,
  verifyFPToken,
};
