import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { config } from 'dotenv';
import db from '../db';
import Helper from '../utils/Helper';

config();

const createUserQuery = `INSERT INTO
        users(email, first_name, last_name, password, createdOn, modifiedOn)
        VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;

const loginQuery = 'SELECT * FROM users WHERE email = $1';

const UserController = {

  async signup(req, res) {
    try {
      const hashPassword = Helper.hashPassword(req.body.password);
      const values = [req.body.email.toLowerCase(), req.body.first_name.toLowerCase(),
        req.body.last_name.toLowerCase(), hashPassword, new Date(), new Date()];
      const { rows } = await db.query(createUserQuery, values);
      const token = Helper.generateToken(rows[0].email);

      return res.status(201).send({
        status: 'success',
        data: {
          user_id: rows[0].id,
          is_admin: rows[0].is_admin,
          token,
        },
      });
    } catch (error) {
      return res.status(500).send({
        status: 'error',
        message: error,
      });
    }
  },

  async signin(req, res) {
    try {
      const userEmail = req.body.email.toLowerCase();
      const { rows } = await db.query(loginQuery, [userEmail]);
      const token = Helper.generateToken(rows[0].email);
      return res.status(200).send({
        status: 'success',
        data: {
          user_id: rows[0].id,
          is_admin: rows[0].is_admin,
          token,
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

export default UserController;
