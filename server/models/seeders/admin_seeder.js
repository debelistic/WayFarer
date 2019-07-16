import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { config } from 'dotenv';
import Helper from '../../utils/Helper';
import db from '../../db';

config();

const createAdminUserQuery = `INSERT INTO
      users(email, first_name, last_name, password, is_admin, created_on, modified_on)
      VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`;

const createAdmin = async () => {
  try {
    const hashPassword = Helper.hashPassword('wayfarere2019');
    const values = ['victorawotidebe@gmail.com', 'victor',
      'awotidebe', hashPassword, true, new Date(), new Date()];
    const { rows } = await db.query(createAdminUserQuery, values);
    const token = Helper.generateToken(rows[0].email);

    console.log(`Admin Created`);

    return `Admin Created`;
  } catch (error) {
    console.log(`Admin not created because ${error}`);
    return `Admin not created because ${error}`;
  }
}

createAdmin();
