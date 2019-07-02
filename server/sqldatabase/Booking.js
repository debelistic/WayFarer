const BookingsModel = {
  async createBookingsTable() {
    const bookingsTableQuery = `CREATE TABLE IF NOT EXISTS
        bookings(
          id SERIAL PRIMARY KEY,
          trip_id INT,
          user_id INT,
          createdOn TIMESTAMP,
        )`;
    return bookingsTableQuery;
  },

  async dropBookingsTable() {
    const dropBookingsQuery = 'DROP TABLE IF EXISTS bookings';
    return dropBookingsQuery;
  },
};

export default BookingsModel;
