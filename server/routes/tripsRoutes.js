import express from 'express';
import Auth from '../middlewares/Auth';
import UserValidator from '../middlewares/UserValidator';
import TripsController from '../controllers/TripsController';

const Router = express.Router();

Router.post(
  '/trips',
  Auth.checkToken,
  Auth.verifyToken,
  UserValidator.adminCheck,
  TripsController.createTrip,
);

/* Router.get(
  '/trips',
  Auth.checkToken,
  Auth.verifyToken,
  TripsController.createTrip,
); */


export default Router;
