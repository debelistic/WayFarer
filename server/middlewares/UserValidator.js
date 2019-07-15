import db from '../db';
import Helper from '../utils/Helper';

const getUser = 'SELECT * FROM users WHERE email = $1';


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
        status: 'error',
        error: 'Enter details',
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
    console.log(req.body);
    
    if (!req.body.first_name || !req.body.last_name) {
      return res.status(400).send({
        status: 'error',
        error: 'Enter your first name and last name ',
      });
    }
    return next();
  },


  async password(req, res, next) {
    if (!/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).{6,}$/.test(req.body.password) || !req.body.password) {
      return res.status(400).send({
        status: 'error',
        error: 'Password should contain at least a lower and upper case, a digit',
      });
    }
    return next();
  },

  async validateMail(req, res, next) {
    if (!req.body.email || !/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(req.body.email)) {
      return res.status(400).send({
        status: 'error',
        error: 'Enter a valid email',
      });
    }
    return next();
  },

  async loginField(req, res, next) {
    if (!req.body.email || !req.body.password) {
      return res.status(401).send({
        status: 'error',
        error: 'Enter email and password',
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
          status: 'error',
          error: 'You are not a registered',
        });
      }
      return next();
    } catch (error) {
      return res.status(400).send({
        status: 'error',
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
        status: 'error',
        error: 'Invalid Password',
      });
    }
    return next();
  },

  async checkUser(req, res, next) {
    if (!req.user) {
      return res.status(400).send({
        status: 'error',
        error: 'Login to your account',
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
        status: 'error',
        error: message,
      });
    }
    return next();
  },

  async adminCheck(req, res, next) {
    const { email } = req.user;
    const { rows } = await db.query(getUser, [email]);
    const user = rows[0];
    if (user.is_admin) return next();
    return res.status(403).send({
      status: 'error',
      error: 'only admins can create trips',
    });
  },

  async userCheck(req, res, next) {
    const { email } = req.user;
    const { rows } = await db.query(getUser, [email]);
    const user = rows[0];
    req.user = user;
    if (user) return next();
    return res.status(403).send({
      status: 'error',
      error: 'login into your account',
    });
  },
};

export default ValidateUserInput;
