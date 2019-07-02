const TripModel = {
  async createTripsTable() {
    const tripsTableQuery = `CREATE TABLE IF NOT EXISTS
        trips(
          id SERIAL PRIMARY KEY,
          bus_id VARCHAR(500) UNIQUE NOT NULL,
          origin VARCHAR(500) NOT NULL,
          destination VARCHAR(500) NOT NULL,
          trip_date VARCHAR(500) NOT NULL,
          fare VARCHAR(500) NOT NULL,
          status VARCHAR(500) NOT NULL,
          createdOn TIMESTAMP
        )`;
    return tripsTableQuery;
  },

  async dropTripsTable() {
    const dropTripsQuery = 'DROP TABLE IF EXISTS trips';
    return dropTripsQuery;
  },
};

export default TripModel;
