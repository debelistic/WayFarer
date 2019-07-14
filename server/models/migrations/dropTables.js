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
 * Drop Models Here
 */
const dropUsersTable = () => {
  const dropQuery = User.dropUsersTable();
  return dropQuery;
};

const dropBookingsTable = () => {
  const dropQuery = Booking.dropBookingsTable();
  return dropQuery;
};

const dropTripsTable = () => {
  const dropQuery = Trip.dropTripsTable();
  return dropQuery;
};

const dropBusesTable = () => {
  const dropQuery = Bus.dropBusesTable();
  return dropQuery;
};

// Drop Models End

/**
 * Drop Enum Types
 */
const dropTripStatusEnum = () => {
  const dropEnumQuery = Trip.droptripStatustype();
  return dropEnumQuery;
};

const dropBusStatusEnum = () => {
  const dropEnumQuery = Bus.dropbusStatustype();
  return dropEnumQuery;
};

const dropEnumTypes = () => (
  `${dropTripStatusEnum()};
    ${dropBusStatusEnum()};`
);
// End Drop Enum Types

const allDropQueries = () => (
  `
    ${dropUsersTable()};
    ${dropBookingsTable()};
    ${dropTripsTable()};
    ${dropBusesTable()};
    ${dropEnumTypes()}`
);

// Rollback migrations
const rollback = async () => {
  pool.query(allDropQueries());
};

pool.on('remove', () => {
  console.log('client removed from ', dbURI);
  process.exit(0);
});

rollback();
