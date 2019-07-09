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

export default Router;
