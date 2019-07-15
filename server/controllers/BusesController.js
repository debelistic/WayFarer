import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { config } from 'dotenv';
import db from '../db';

config();

const createBusQuery = `INSERT INTO
        buses(number_plate, maunfacturer, model, year, capacity, created_on, modified_on)
        VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
const getBusesQuery = 'SELECT * FROM buses';

const BusesController = {
  async createBuses(req, res) {
    try {
      const values = [req.body.number_plate, req.body.maunfacturer.toLowerCase(),
        req.body.model, req.body.year, req.body.capacity,
        new Date(), new Date()];
      const { rows } = await db.query(createBusQuery, values);

      return res.status(201).send({
        status: 'success',
        data: {
          number_plate: rows[0].number_plate,
          maunfacturer: rows[0].maunfacturer,
          model: rows[0].maunfacturer,
          status: rows[0].status,
          year: rows[0].year,
          capacity: rows[0].capacity,
          created_on: rows[0].created_on,
        },
      });
    } catch (error) {
      return res.status(500).send({
        status: 'error',
        error,
      });
    }
  },

  async getBuses(req, res) {
    try {
      const { rows } = await db.query(getBusesQuery);
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
};

export default BusesController;
