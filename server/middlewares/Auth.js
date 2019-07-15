/* eslint-disable no-console */
/* eslint-disable prefer-destructuring */

import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import db from '../db';

config();

const Auth = {

  async checkToken(req, res, next) {
    console.log(req.headers);
    console.log(req.headers.authorization);
    let token;
    if (req.headers.authorization) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.headers['x-access-token']) {
      token = req.headers['x-access-token'];
    } else if (req.headers.token) {
      token = req.headers.token;
    }
    if (!token) {
      return res.status(401).send({
        status: 'error',
        error: 'No token provided',
      });
    }
    return next();
  },

  async verifyToken(req, res, next) {
    try {
      let token = req.headers['x-access-token'];
      if (req.headers.authorization) {
        token = req.headers.authorization.split(' ')[1];
      } else if (req.headers['x-access-token']) {
        token = req.headers['x-access-token'];
      } else if (req.headers.token) {
        token = req.headers.token;
      }
      const userObject = jwt.verify(token, process.env.SECRET);
      const getUser = 'SELECT * FROM users WHERE email = $1';
      await db.query(getUser, [userObject.userEmail]);
      req.user = { email: userObject.userEmail };
      return next();
    } catch (error) {
      return res.status(403).send({
        status: 'error',
        error,
      });
    }
  },

};

export default Auth;
