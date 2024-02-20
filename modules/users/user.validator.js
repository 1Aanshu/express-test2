const Joi = require("joi");

const Schema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  name: Joi.string().required(),
  phone: Joi.number(),
  token: Joi.string(),
  roles: Joi.array().items(Joi.string().valid("user", "admin")),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

const resetSchema = Joi.object({
  userId: Joi.string().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

const userSchema = Joi.object({
  userId: Joi.string(),
  name: Joi.string(),
  phone: Joi.number(),
});

const validate = (req, res, next) => {
  const { error } = Schema.validate(req, body);
  if (error) {
    res.status(400).json({ msg: error.details[0].message });
  } else {
    next();
  }
};

const loginvalidate = (req, res, next) => {
  const { error } = loginSchema.validate(req, body);
  if (error) {
    res.status(400).json({ msg: error.details[0].message });
  } else {
    next();
  }
};

const resetvalidate = (req, res, next) => {
  const { error } = resetSchema.validate(req, body);
  if (error) {
    res.status(400).json({ msg: error.details[0].message });
  } else {
    next();
  }
};

const uservalidate = (req, res, next) => {
  const { error } = userSchema.validate(req, body);
  if (error) {
    res.status(400).json({ msg: error.details[0].message });
  } else {
    next();
  }
};

module.exports = {
  validate,
  resetvalidate,
  loginvalidate,
  uservalidate,
};
