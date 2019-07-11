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

Router.get(
  '/trips',
  Auth.checkToken,
  Auth.verifyToken,
  TripsController.getTrips,
);

Router.patch(
  '/trips/:tripId',
  Auth.checkToken,
  Auth.verifyToken,
  UserValidator.adminCheck,
  TripsController.cancelTrip,
);

Router.get(
  '/trips/:destination',
  Auth.checkToken,
  Auth.verifyToken,
  TripsController.geTripsByDestination,
);

export default Router;
