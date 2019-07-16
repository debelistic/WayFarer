import express from 'express';
import Auth from '../middlewares/Auth';
import UserValidator from '../middlewares/UserValidator';
import BookingValidator from '../middlewares/BookingValidator';
import BookingsController from '../controllers/BookingsController';

const Router = express.Router();

Router.post(
  '/bookings',
  Auth.checkToken,
  Auth.verifyToken,
  UserValidator.userCheck,
  BookingValidator.createBookingValidator,
  BookingValidator.emptyBookingTripId,
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
  BookingValidator.deleteBookingValidator,
  BookingsController.deleteBooking,
);

Router.patch(
  '/bookings/:bookingId',
  Auth.checkToken,
  Auth.verifyToken,
  UserValidator.userCheck,
  BookingValidator.emptySeatNumber,
  BookingValidator.changeSeatNumberValidator,
  BookingsController.changeSeatNumber,
);

export default Router;
