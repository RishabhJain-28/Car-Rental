const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const newUser = (body) => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(20).trim().required(),
    lastName: Joi.string().min(2).max(20).trim().required(),
    email: Joi.string().email().trim().required(),
    password: Joi.string().min(5).max(20).trim().required(),
    confirmPassword: Joi.string().min(5).max(20).trim().required(),
  });
  return schema.validate(body);
};

const forgetPassword = (body) => {
  const schema = Joi.object({
    email: Joi.string().email().trim().required(),
  });
  return schema.validate(body);
};

const forgetPasswordReset = (body) => {
  const schema = Joi.object({
    token: Joi.string().min(5).max(40).trim().required(),
    password: Joi.string().min(5).max(20).trim().required(),
    confirmPassword: Joi.string().min(5).max(20).trim().required(),
  });
  return schema.validate(body);
};

const changePassword = (body) => {
  const schema = Joi.object({
    oldPassword: Joi.string().min(5).max(20).trim().required(),
    newPassword: Joi.string().min(5).max(20).trim().required(),
    confirmNewPassword: Joi.string().min(5).max(20).trim().required(),
  });
  return schema.validate(body);
};
module.exports = {
  newUser,
  forgetPassword,
  forgetPasswordReset,
  changePassword,
};
