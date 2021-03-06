const BusModel = {
  busStatustype() {
    const busStatusTypeQuery = `CREATE TYPE bus_status AS ENUM
    (
      'available',
      'unavailable'
    )`;
    return busStatusTypeQuery;
  },

  dropbusStatustype() {
    const dropbusStatusTypeQuery = 'DROP TYPE IF EXISTS bus_status';
    return dropbusStatusTypeQuery;
  },
  createBusesTable() {
    const busesTableQuery = `CREATE TABLE IF NOT EXISTS
        buses(
          id SERIAL PRIMARY KEY,
          number_plate VARCHAR(500) UNIQUE NOT NULL,
          maunfacturer VARCHAR(500) NOT NULL,
          model VARCHAR(500) NOT NULL,
          status bus_status NOT NULL DEFAULT 'available',
          year VARCHAR(500) NOT NULL,
          capacity INT NOT NULL,
          created_on TIMESTAMP,
          modified_on TIMESTAMP
        )`;
    return busesTableQuery;
  },

  dropBusesTable() {
    const dropBusesQuery = 'DROP TABLE IF EXISTS buses';
    return dropBusesQuery;
  },
};

export default BusModel;
