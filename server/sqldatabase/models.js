/* eslint-disable no-console */
import { Pool } from 'pg';
import { config } from 'dotenv';

require('@babel/polyfill');

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
  console.log('connected to db');
});
