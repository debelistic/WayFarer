import db from '../db';
import Helper from '../utils/Helper';

const ValidateUserInput = {

  /**
   * Check if request object is empty
   * @param {object} req
   * @param {object} res
   * @param {object} next
   */
  async bodyCheck(req, res, next) {
    if (req.body === null) {
      return res.status(400).send({
        message: 'Enter details',
      });
    }
    return next();
  },


  /**
   * Validate Name fields
   * @param {object} req
   * @param {object} res
   * @param {object} next
   */
  async names(req, res, next) {
    if (!req.body.first_name || !req.body.last_name) {
      return res.status(400).send({
        message: 'Enter your first name and last name ',
      });
    }
    return next();
  },


  async password(req, res, next) {
    if (!/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).{6,}$/.test(req.body.password) || !req.body.password) {
      return res.status(400).send({
        message: 'Password should contain at least a lower and upper case, a digit',
      });
    }
    return next();
  },
 
  async validateMail(req, res, next) {
    if (!req.body.email || !/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(req.body.email)) {
      return res.status(400).send({
        message: 'Enter a valid email',
      });
    }
    return next();
  },

  async loginField(req, res, next) {
    if (!req.body.email || !req.body.password) {
      return res.status(401).send({
        message: 'Enter email and password',
      });
    }
    return next();
  },

  async loginEmail(req, res, next) {
    try {
      const loginQuery = 'SELECT * FROM users WHERE email = $1';
      const userEmail = await `${req.body.email.toLowerCase()}`;
      const { rows } = await db.query(loginQuery, [userEmail]);
      if (rows[0] === undefined) {
        return res.status(403).send({
          mesage: 'You are not a registered',
        });
      }
      return next();
    } catch (error) {
      return res.status(400).send({
        message: 'Invaild email',
        error,
      });
    }
  },

  async loginPassword(req, res, next) {
    const loginQuery = 'SELECT * FROM users WHERE email = $1';
    const userEmail = await req.body.email.toLowerCase();
    const { rows } = await db.query(loginQuery, [userEmail]);
    if (!Helper.comparePassword(req.body.password, rows[0].password)) {
      return res.status(401).send({
        message: 'Invalid Password',
      });
    }
    return next();
  },

  async checkUser(req, res, next) {
    if (!req.user) {
      return res.status(400).send({
        message: 'Login to your account',
      });
    }
    return next();
  },

  async checkEmail(req, res, next) {
    const checkQuery = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await db.query(checkQuery, [req.body.email]);
    const message = 'The email you entered is associated to an account';
    if (rows[0]) {
      return res.status(400).send({
        message,
      });
    }
    return next();
  },
};

export default ValidateUserInput;
