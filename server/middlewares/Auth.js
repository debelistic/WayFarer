import jwt from 'jsonwebtoken';
import db from '../db';

const Auth = {

  async checkToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(401).send({
        status: 'error',
        message: 'No token provided',
      });
    }
    return next();
  },

  async verifyToken(req, res, next) {
    try {
      const token = req.headers['x-access-token'];
      const userObject = jwt.verify(token, process.env.SECRET);
      const getUser = 'SELECT * FROM WHERE eamil = $1';
      await db.query(getUser, [userObject.email]);
      req.user = { email: userObject.email };
      return next();
    } catch (error) {
      return res.status(403).send({
        status: 'error',
        message: error,
      });
    }
  },

};

export default Auth;
