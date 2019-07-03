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
const createUsersTable = async () => {
  const createQuery = await User.createUsersTable();
  await pool.query(createQuery);
};

const createBookingsTable = async () => {
  const createQuery = await Booking.createBookingsTable();
  await pool.query(createQuery);
};

const createTripsTable = async () => {
  const createQuery = await Trip.createTripsTable();
  await pool.query(createQuery);
};

const createBusesTable = async () => {
  const createQuery = await Bus.createBusesTable();
  await pool.query(createQuery);
};

// create Models End

/**
 * Drop Models Here
 */
const dropUsersTable = async () => {
  const dropQuery = await User.dropUsersTable();
  await pool.query(dropQuery);
};

const dropBookingsTable = async () => {
  const dropQuery = await Booking.dropBookingsTable();
  await pool.query(dropQuery);
};

const dropTripsTable = async () => {
  const dropQuery = await Trip.dropTripsTable();
  await pool.query(dropQuery);
};

const dropBusesTable = async () => {
  const dropQuery = await Bus.dropBusesTable();
  await pool.query(dropQuery);
};

// Drop Models End


/**
 * Create Enum Types
 */
const createTripStatusEnum = async () => {
  const createEnumQuery = await Trip.tripStatustype();
  await pool.query(createEnumQuery);
};

const createBusStatusEnum = async () => {
  const createEnumQuery = await Bus.busStatustype();
  await pool.query(createEnumQuery);
};

const createEnumTypes = async () => {
  await createTripStatusEnum();
  await createBusStatusEnum();
};
// Create Enum Tpes End

/**
 * Drop Enum Types
 */
const dropTripStatusEnum = async () => {
  const dropEnumQuery = await Trip.droptripStatustype();
  await pool.query(dropEnumQuery);
};

const dropBusStatusEnum = async () => {
  const dropEnumQuery = await Bus.dropbusStatustype();
  await pool.query(dropEnumQuery);
};

const dropEnumTypes = async () => {
  await dropTripStatusEnum();
  await dropBusStatusEnum();
};
// End Drop Enum Types

// Create migrations
const migrate = async () => {
  pool.connect();
  await createTripStatusEnum();
  await createBusStatusEnum();
  await createUsersTable();
  await createBookingsTable();
  await createTripsTable();
  await createBusesTable();
  pool.end();
};

// Rollback migrations
const rollback = async () => {
  pool.connect();
  await dropUsersTable();
  await dropBookingsTable();
  await dropTripsTable();
  await dropBusesTable();
  await dropTripStatusEnum();
  await dropBusStatusEnum();
  pool.end();
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  migrate,
  createEnumTypes,
  createTripStatusEnum,
  createBusStatusEnum,
  createUsersTable,
  createBookingsTable,
  createTripsTable,
  createBusesTable,
  dropBookingsTable,
  dropTripsTable,
  dropUsersTable,
  dropBusesTable,
  dropEnumTypes,
  rollback,
};

require('make-runnable');
