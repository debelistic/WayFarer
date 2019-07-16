import express from 'express';
import Auth from '../middlewares/Auth';
import UserValidator from '../middlewares/UserValidator';
import TripValidator from '../middlewares/TripValidator';
import TripsController from '../controllers/TripsController';

const Router = express.Router();

Router.post(
  '/trips',
  Auth.checkToken,
  Auth.verifyToken,
  UserValidator.adminCheck,
  TripValidator.destinationAndOriginCheck,
  TripValidator.tripBusCheck,
  TripValidator.fareCheck,
  TripValidator.emptyBusIdTripId,
  TripsController.createTrip,
);

Router.get(
  '/trips',
  Auth.checkToken,
  Auth.verifyToken,
  TripValidator.getTripsCheck,
  TripsController.getTrips,
);

Router.patch(
  '/trips/:tripId',
  Auth.checkToken,
  Auth.verifyToken,
  UserValidator.adminCheck,
  TripValidator.cancelTrip,
  TripsController.cancelTrip,
);

Router.get(
  '/trips/destination/:destination',
  Auth.checkToken,
  Auth.verifyToken,
  TripValidator.getTripsByDestinationCheck,
  TripsController.getTripsByDestination,
);

Router.get(
  '/trips/origin/:origin',
  Auth.checkToken,
  Auth.verifyToken,
  TripValidator.getTripsByOriginCheck,
  TripsController.getTripsByOrigin,
);

export default Router;
