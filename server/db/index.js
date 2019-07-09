/* eslint-disable no-console */
import { Pool } from 'pg';
import { config } from 'dotenv';

config();

let dbURI;

if (process.env.NODE_ENV.trim() === 'test') {
  dbURI = process.env.TEST_DATABASE_URL;
} else {
  dbURI = process.env.DATABASE_URL;
}

const pool = new Pool({
  connectionString: dbURI,
});

pool.on('connect', () => {
  console.log('connected to database', dbURI);
});

export default {
  query(text, params) {
    return new Promise((resolve, reject) => {
      pool.query(text, params)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
