const TripModel = {
  tripStatustype() {
    const tripStatusTypeQuery = `CREATE TYPE trip_status AS ENUM
    (
      'active',
      'cancelled'
    )`;
    return tripStatusTypeQuery;
  },

  droptripStatustype() {
    const dropTripStatusTypeQuery = 'DROP TYPE IF EXISTS trip_status';
    return dropTripStatusTypeQuery;
  },

  createTripsTable() {
    const tripsTableQuery = `CREATE TABLE IF NOT EXISTS
        trips(
          id SERIAL PRIMARY KEY,
          bus_id VARCHAR(500) UNIQUE NOT NULL,
          origin VARCHAR(500) NOT NULL,
          destination VARCHAR(500) NOT NULL,
          trip_date VARCHAR(500) NOT NULL,
          fare FLOAT NOT NULL,
          status trip_status NOT NULL DEFAULT 'active',
          createdOn TIMESTAMP
        )`;
    return tripsTableQuery;
  },

  dropTripsTable() {
    const dropTripsQuery = 'DROP TABLE IF EXISTS trips';
    return dropTripsQuery;
  },
};

export default TripModel;
