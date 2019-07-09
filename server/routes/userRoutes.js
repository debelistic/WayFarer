import express from 'express';
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
  UserController.signup,
);

Router.post(
  '/auth/signin',
  ValidateUserInput.loginField,
  ValidateUserInput.loginEmail,
  ValidateUserInput.loginPassword,
  UserController.signin,
);

export default Router;
