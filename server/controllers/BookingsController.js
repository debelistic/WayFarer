import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { config } from 'dotenv';
import db from '../db';

config();

const createBookingQuery = `INSERT INTO
        bookings(trip_id, user_id, bus_id, trip_date, seat_number, createdOn, modifiedOn)
        VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`;


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
          user_id: userDetails.id,
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
};

export default BookingsController;
