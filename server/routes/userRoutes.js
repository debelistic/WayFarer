import express from 'express';
import validate from 'express-validation';
import Joi from 'joi';
import ValidateUserInput from '../middlewares/UserValidator';
import UserController from '../controllers/UserController';

const Router = express.Router();

Router.post(
  '/auth/signup',
  ValidateUserInput.bodyCheck,
  ValidateUserInput.names,
  ValidateUserInput.password,
  ValidateUserInput.validateMail,
  ValidateUserInput.checkEmail,
  validate({
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
    },
  }),
  UserController.signup,
);

Router.post(
  '/auth/signin',
  ValidateUserInput.loginField,
  ValidateUserInput.loginEmail,
  ValidateUserInput.loginPassword,
  validate({
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  UserController.signin,
);

export default Router;
