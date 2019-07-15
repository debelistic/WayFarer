import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { config } from 'dotenv';
import db from '../db';

config();

const userGetABookingQuery = 'SELECT * FROM bookings WHERE user_id = $1 AND id=$2';
const changeSeatNumberQuery = 'UPDATE bookings SET seat_number=$1, modified_on=$2 WHERE id = $3 AND user_id=$4 RETURNING *';


const BookingsValidator = {
  async createBookingValidator(req, res, next) {
    if (!req.body.trip_id || req.body.trip_id === null) {
      return res.status(400).send({
        status: 'error',
        message: 'Enter Trip',
      });
    }
    return next();
  },

  async deleteBookingValidator(req, res, next) {
    const userDetails = req.user;
    const { rows } = await db.query(userGetABookingQuery, [userDetails.id, req.params.bookingId]);

    if (rows.length < 1) {
      return res.status(400).send({
        status: 'error',
        message: 'Booking not found',
      });
    }
    return next();
  },

  async changeSeatNumberValidator(req, res, next) {
    const userDetails = req.user;
    const { rows } = await db.query(changeSeatNumberQuery,
      [req.body.seat_number, new Date(), req.params.bookingId, userDetails.id]);
    if (rows.length < 1) {
      return res.status(400).send({
        status: 'error',
        message: 'No trip found',
      });
    }
    return next();
  },
};

export default BookingsValidator;
