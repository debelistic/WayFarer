import express from 'express';
import validate from 'express-validation';
import Joi from 'joi';
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
  validate({
    body: {
      trip_id: Joi.number().required(),
    },
  }),
  BookingValidator.createBookingValidator,
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
  validate({
    body: {
      seat_number: Joi.number().required(),
    },
  }),
  BookingValidator.changeSeatNumberValidator,
  BookingsController.changeSeatNumber,
);

export default Router;
