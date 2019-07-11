import express from 'express';
import Auth from '../middlewares/Auth';
import UserValidator from '../middlewares/UserValidator';
import BusesController from '../controllers/BusesController';

const Router = express.Router();

Router.post(
  '/buses',
  Auth.checkToken,
  Auth.verifyToken,
  UserValidator.adminCheck,
  BusesController.createBuses,
);

Router.get(
  '/buses',
  Auth.checkToken,
  Auth.verifyToken,
  UserValidator.adminCheck,
  BusesController.getBuses,
);

export default Router;
