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
  await pool.query(User.createUsersTable);
};

const createBookingsTable = async () => {
  await pool.query(Booking.createBookingsTable);
};

const createTripsTable = async () => {
  await pool.query(Trip.createTripsTable);
};

const createBusesTable = async () => {
  await pool.query(Bus.createBusesTable);
};

// create Models End

/**
 * Drop Models Here
 */
const dropUsersTable = async () => {
  await pool.query(User.dropUsersTable);
};

const dropBookingsTable = async () => {
  await pool.query(Booking.dropBookingsTable);
};

const dropTripsTable = async () => {
  await pool.query(Trip.dropTripsTable);
};

const dropBusesTable = async () => {
  await pool.query(Bus.dropBusesTable);
};

// Drop Models End


/**
 * Create Enum Types
 */
const createTripStatusEnum = async () => {
  await pool.query(Trip.tripStatustype);
};

const createBusStatusEnum = async () => {
  await pool.query(Bus.busStatustype);
};

const createEnumTypes = async () => {
  createTripStatusEnum();
  createBusStatusEnum();
};
// Create Enum Tpes End

/**
 * Drop Enum Types
 */
const dropTripStatusEnum = async () => {
  await pool.query(Trip.dropTripsTable);
};

const dropBusStatusEnum = async () => {
  await pool.query(Bus.dropbusStatustype);
};

const dropEnumTypes = async () => {
  dropTripStatusEnum();
  dropBusStatusEnum();
};
// End Drop Enum Types

// Create migrations
const migrate = async () => {
  createTripStatusEnum();
  createBusStatusEnum();
  createUsersTable();
  createBookingsTable();
  createTripsTable();
  createBusesTable();
};

// Rollback migrations
const rollback = async () => {
  dropUsersTable();
  dropBookingsTable();
  dropTripsTable();
  dropBusesTable();
  dropTripStatusEnum();
  dropBusStatusEnum();
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
