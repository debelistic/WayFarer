import express from 'express';
import Auth from '../middlewares/Auth';
import UserValidator from '../middlewares/UserValidator';
import BookingsController from '../controllers/BookingsController';

const Router = express.Router();

Router.post(
  '/bookings',
  Auth.checkToken,
  Auth.verifyToken,
  UserValidator.userCheck,
  BookingsController.createBooking,
);

Router.get(
  '/bookings',
  Auth.checkToken,
  Auth.verifyToken,
  UserValidator.userCheck,
  BookingsController.getBooking,
);

Router.delete(
  '/bookings/:bookingId',
  Auth.checkToken,
  Auth.verifyToken,
  UserValidator.userCheck,
  BookingsController.deleteBooking,
);

export default Router;
