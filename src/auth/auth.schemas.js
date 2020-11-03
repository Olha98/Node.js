
const Joi = require('joi');

exports.signUpSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});


exports.signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

exports.logoutSchema = Joi.object({
  _id: Joi.string().required(),
});