import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { config } from 'dotenv';
import db from '../db';

config();

const createTripQuery = `INSERT INTO
        trips(bus_id, origin, destination, trip_date, fare, created_on, modified_on)
        VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
const getTripsQuery = 'SELECT * FROM trips';
const cancelTripQuery = 'UPDATE trips SET status=$1, modified_on=$2 WHERE id = $3 RETURNING *';
const TripsController = {
  async createTrip(req, res) {
    try {
      const values = [req.body.bus_id, req.body.origin.toLowerCase(),
        req.body.destination.toLowerCase(), req.body.trip_date,
        req.body.fare, new Date(), new Date()];
      const { rows } = await db.query(createTripQuery, values);

      return res.status(201).send({
        status: 'success',
        data: {
          trip_id: rows[0].id,
          bus_id: rows[0].bus_id,
          origin: rows[0].origin,
          destination: rows[0].destination,
          trip_date: rows[0].trip_date,
          fare: rows[0].fare,
        },
      });
    } catch (error) {
      return res.status(500).send({
        status: 'error',
        message: error,
      });
    }
  },

  async getTrips(req, res) {
    try {
      const { rows } = await db.query(getTripsQuery);
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

  async cancelTrip(req, res) {
    try {
      const { rows } = await db.query(cancelTripQuery, ['cancelled', new Date(), req.params.tripId]);
      return res.status(200).send({
        status: 200,
        data: {
          message: 'Trip successfully cancelled',
          trip_id: rows[0].id,
          bus_id: rows[0].bus_id,
          origin: rows[0].origin,
          destination: rows[0].destination,
          trip_date: rows[0].trip_date,
          fare: rows[0].fare,
          status: rows[0].status,
          modified_on: rows[0].modified_on,
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

export default TripsController;
