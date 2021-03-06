/* eslint-disable no-console */
import { Pool } from 'pg';
import { config } from 'dotenv';
import User from '../User';
import Trip from '../Trip';
import Bus from '../Bus';
import Booking from '../Booking';

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
  console.log('connected to db', dbURI);
});


/**
 * Create Models Here
 */
const createUsersTable = () => {
  const createQuery = User.createUsersTable();
  return createQuery;
};

const createBookingsTable = () => {
  const createQuery = Booking.createBookingsTable();
  return createQuery;
};

const createTripsTable = () => {
  const createQuery = Trip.createTripsTable();
  return createQuery;
};

const createBusesTable = () => {
  const createQuery = Bus.createBusesTable();
  return createQuery;
};

// create Models End

/**
 * Create Enum Types
 */
const createTripStatusEnum = () => {
  const createEnumQuery = Trip.tripStatustype();
  return createEnumQuery;
};

const createBusStatusEnum = () => {
  const createEnumQuery = Bus.busStatustype();
  return createEnumQuery;
};

const createEnumTypes = () => (
  `${createTripStatusEnum()};
    ${createBusStatusEnum()}`
);
// Create Enum Tpes End

const allCreateQueries = () => (
  `
    ${createUsersTable()};
    ${createEnumTypes()};
    ${createTripsTable()};
    ${createBookingsTable()};
    ${createBusesTable()}
    `
);

// Create migrations
const migrate = async () => {
  await pool.query(allCreateQueries());
};

pool.on('remove', () => {
  console.log('client removed from', dbURI);
  process.exit(0);
});


migrate();
