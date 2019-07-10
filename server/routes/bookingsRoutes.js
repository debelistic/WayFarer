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


export default Router;
