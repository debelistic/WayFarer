import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { config } from 'dotenv';
import db from '../db';

config();

const createBookingQuery = `INSERT INTO
        bookings(trip_id, user_id, bus_id, trip_date, seat_number, createdOn, modifiedOn)
        VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
const adminGetQuery = 'SELECT * FROM bookings';
const userGetQuery = 'SELECT * FROM bookings WHERE user_id = $1';
const deleteQuery = 'DELETE FROM bookings WHERE id = $1 AND user_id = $2';


const BookingsController = {
  async createBooking(req, res) {
    try {
      const seatNumber = Math.floor(Math.random() * 45) + 1;
      const busId = Math.floor(Math.random() * 40) + 1;
      const values = [req.body.trip_id, req.body.user_id, busId, new Date(),
        seatNumber, new Date(), new Date()];
      const { rows } = await db.query(createBookingQuery, values);
      const userDetails = req.user;

      return res.status(201).send({
        status: 'success',
        data: {
          booking_id: rows[0].id,
          user_id: rows[0].user_id,
          trip_id: rows[0].trip_id,
          bus_id: rows[0].bus_id,
          trip_date: rows[0].trip_date,
          seat_number: rows[0].seat_number,
          first_name: userDetails.first_name,
          last_name: userDetails.last_name,
          email: userDetails.email,
        },
      });
    } catch (error) {
      return res.status(500).send({
        status: 'error',
        message: error,
      });
    }
  },

  async getBooking(req, res) {
    try {
      const userDetails = req.user;
      let result;
      if (userDetails.is_admin === true) {
        result = await db.query(adminGetQuery);
      } else {
        result = await db.query(userGetQuery, [userDetails.id]);
      }


      const { rows } = result;

      return res.status(200).send({
        status: 'success',
        data: rows,
      });
    } catch (error) {
      return res.status(500).send({
        status: 'error',
        message: error,
      });
    }
  },

  async deleteBooking(req, res) {
    try {
      const userDetails = req.user;

      await db.query(deleteQuery, [req.params.bookingId, userDetails.id]);

      return res.status(200).send({
        status: 'success',
        data: {
          message: 'Booking successfully deleted',
        },
      });
    } catch (error) {
      return res.status(404).send({
        status: 'error',
        message: 'Booking not found',
      });
    }
  },
};

export default BookingsController;
