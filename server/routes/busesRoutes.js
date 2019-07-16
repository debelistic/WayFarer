import express from 'express';
import validate from 'express-validation';
import Joi from 'joi';
import Auth from '../middlewares/Auth';
import UserValidator from '../middlewares/UserValidator';
import BusesController from '../controllers/BusesController';

const Router = express.Router();

Router.post(
  '/buses',
  Auth.checkToken,
  Auth.verifyToken,
  UserValidator.adminCheck,
  validate({
    body: {
      number_plate: Joi.string().required(),
      maunfacturer: Joi.string().required(),
      model: Joi.string().required(),
      year: Joi.number().required(),
      capacity: Joi.number().required(),
    },
  }),
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
