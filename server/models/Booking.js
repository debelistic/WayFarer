const BookingsModel = {
  createBookingsTable() {
    const bookingsTableQuery = `CREATE TABLE IF NOT EXISTS
        bookings(
          id SERIAL,
          trip_id INT,
          user_id INT,
          bus_id INT,
          trip_date TIMESTAMP,
          seat_number INT,
          createdOn TIMESTAMP,
          modifiedOn TIMESTAMP,
          PRIMARY KEY (trip_id, user_id)
        )`;
    return bookingsTableQuery;
  },

  dropBookingsTable() {
    const dropBookingsQuery = 'DROP TABLE IF EXISTS bookings';
    return dropBookingsQuery;
  },
};

export default BookingsModel;
