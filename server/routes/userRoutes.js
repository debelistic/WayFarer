import express from 'express';
import UserController from '../controllers/UserController';

const Router = express.Router();

Router.post(
  '/auth/signup',
  UserController.signup,
);
