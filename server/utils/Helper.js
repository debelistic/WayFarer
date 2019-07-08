import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Helper = {

  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5));
  },


  comparePassword(password, hashPassword) {
    return bcrypt.compareSync(password, hashPassword);
  },


  generateToken(email) {
    const token = jwt.sign({
      userEmail: email,
    },
    process.env.SECRET, { expiresIn: '3d' });
    return token;
  },
};
export default Helper;
