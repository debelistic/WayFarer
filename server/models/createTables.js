/* eslint-disable no-console */
import { Pool } from 'pg';
import { config } from 'dotenv';
import User from './User';
import Trip from './Trip';
import Bus from './Bus';
import Booking from './Booking';

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


/**
 * Create Models Here
 */
const createUsersTable = () => {
  const createQuery = User.createUsersTable();
  // console.log(createQuery);
  return createQuery;
};

const createBookingsTable = () => {
  const createQuery = Booking.createBookingsTable();
  // console.log(createQuery);

  return createQuery;
};

const createTripsTable = () => {
  const createQuery = Trip.createTripsTable();
  // console.log(createQuery);

  return createQuery;
};

const createBusesTable = () => {
  const createQuery = Bus.createBusesTable();
  // console.log(createQuery);

  return createQuery;
};

// create Models End

/**
 * Create Enum Types
 */
const createTripStatusEnum = () => {
  const createEnumQuery = Trip.tripStatustype();
  // console.log(createEnumQuery);
  return createEnumQuery;
};

const createBusStatusEnum = () => {
  const createEnumQuery = Bus.busStatustype();
  // console.log(createEnumQuery);
  return createEnumQuery;
};

const createEnumTypes = () => {
  return (
    `${createTripStatusEnum()};
    ${createBusStatusEnum()}`
  );
};
// Create Enum Tpes End

const allQueries = () => {  
  return (
    `
    ${createUsersTable()};
    ${createEnumTypes()};
    ${createTripsTable()};
    ${createBookingsTable()};
    ${createBusesTable()}
    `
  );
};

// Create migrations
const migrate = async () => {
  await pool.query(allQueries());
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});


migrate();
