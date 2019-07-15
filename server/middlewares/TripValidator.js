import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { config } from 'dotenv';
import db from '../db';

config();

const getTripsQuery = 'SELECT * FROM trips';
const cancelTripQuery = 'UPDATE trips SET status=$1, modified_on=$2 WHERE id = $3 RETURNING *';
const getTripsByDestinationQuery = 'SELECT * FROM trips WHERE destination = $1';
const getTripsByOriginQuery = 'SELECT * FROM trips WHERE origin = $1';

const TripsValidator = {
  async destinationAndOriginCheck(req, res, next) {
    if (!req.body.destination || !req.body.origin) {
      return res.status(400).send({
        status: 'error',
        error: 'Enter Bus and Origin Details',
      });
    }
    return next();
  },

  async tripBusCheck(req, res, next) {
    if (!req.body.bus_id || !req.body.trip_date) {
      return res.status(400).send({
        status: 'error',
        error: 'Enter trip date and bus details',
      });
    }
    return next();
  },

  async fareCheck(req, res, next) {
    if (!req.body.fare) {
      return res.status(400).send({
        status: 'error',
        error: 'Enter fare',
      });
    }
    return next();
  },

  async getTripsCheck(req, res, next) {
    const { rows } = await db.query(getTripsQuery);
    if (rows.length < 1) {
      return res.status(400).send({
        status: 'error',
        error: 'No trips at the moment',
      });
    }
    return next();
  },

  async getTripsByDestinationCheck(req, res, next) {
    const { rows } = await db.query(getTripsByDestinationQuery, [req.params.destination]);
    if (rows.length < 1) {
      return res.status(400).send({
        status: 'error',
        error: 'No trips for the selected origin',
      });
    }
    return next();
  },

  async getTripsByOriginCheck(req, res, next) {
    const { rows } = await db.query(getTripsByOriginQuery, [req.params.origin]);
    if (rows.length < 1) {
      return res.status(400).send({
        status: 'error',
        error: 'No trips for the selected destination',
      });
    }
    return next();
  },


  async cancelTrip(req, res, next) {
    const { rows } = await db.query(cancelTripQuery, ['cancelled', new Date(), req.params.tripId]);

    if (rows[0] === undefined) {
      return res.status(400).send({
        status: 'error',
        error: 'Trip not found',
      });
    }
    return next();
  },
};

export default TripsValidator;
