import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { config } from 'dotenv';
import db from '../db';

config();

const createBookingQuery = `INSERT INTO
        bookings(trip_id, user_id, bus_id, trip_date, seat_number, created_on, modified_on)
        VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
const userGetBookingquery = 'SELECT bookings.id AS booking_id,bookings.user_id,bookings.trip_id, trips.bus_id, trips.trip_date,bookings.seat_number,users.first_name,users.last_name,users.email FROM bookings INNER JOIN users ON bookings.user_id = users.id INNER JOIN trips on bookings.trip_id = trips.id WHERE user_id = $1';
const admingetBookingsquery = 'SELECT bookings.id AS booking_id,bookings.user_id,bookings.trip_id, trips.bus_id, trips.trip_date,bookings.seat_number,users.first_name,users.last_name,users.email FROM bookings INNER JOIN users ON bookings.user_id = users.id INNER JOIN trips on bookings.trip_id = trips.id';
const deleteQuery = 'DELETE FROM bookings WHERE id = $1 AND user_id = $2';
const changeSeatNumberQuery = 'UPDATE bookings SET seat_number=$1, modified_on=$2 WHERE id = $3 AND user_id=$4 RETURNING *';


const BookingsController = {
  async createBooking(req, res) {
    try {
      const seatNumber = Math.floor(Math.random() * 45) + 1;
      const busId = Math.floor(Math.random() * 40) + 1;
      const userDetails = req.user;
      const values = [req.body.trip_id, userDetails.id, busId, new Date(),
        seatNumber, new Date(), new Date()];
      const { rows } = await db.query(createBookingQuery, values);

      return res.status(201).send({
        status: 'success',
        data: {
          id: rows[0].id,
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
        error,
      });
    }
  },

  async getBooking(req, res) {
    try {
      const userDetails = req.user;
      let result;
      if (userDetails.is_admin === true) {
        result = await db.query(admingetBookingsquery);
      } else {
        result = await db.query(userGetBookingquery, [userDetails.id]);
      }


      const { rows } = result;
      return res.status(200).send({
        status: 'success',
        data: rows,
      });
    } catch (error) {
      return res.status(500).send({
        status: 'error',
        error,
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
      return res.status(500).send({
        status: 'error',
        error,
      });
    }
  },

  async changeSeatNumber(req, res) {
    try {
      const userDetails = req.user;
      const { rows } = await db.query(changeSeatNumberQuery,
        [req.body.seat_number, new Date(), req.params.bookingId, userDetails.id]);
      return res.status(200).send({
        status: 200,
        data: {
          message: 'You have successfully changed your seat number',
          booking: rows[0],
        },
      });
    } catch (error) {
      return res.status(500).send({
        status: 'error',
        error,
      });
    }
  },
};

export default BookingsController;
