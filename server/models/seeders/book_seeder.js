import 'core-js/stable';
import 'regenerator-runtime/runtime';
import db from '../../db';


const booking1 = [7, 20, 7, '3/15/2019', 14, new Date(), new Date()];
const booking2 = [6, 19, 21, '9/15/2018', 41, new Date(), new Date()];
const booking3 = [27, 9, 19, '3/9/2019', 34, new Date(), new Date()];
const booking4 = [15, 5, 1, '11/23/2018', 31, new Date(), new Date()];
const booking5 = [38, 19, 3, '11/12/2018', 12, new Date(), new Date()];
const booking6 = [29, 12, 40, '9/22/2018', 20, new Date(), new Date()];
const booking7 = [33, 1, 32, '2/9/2019', 35, new Date(), new Date()];
const booking8 = [23, 14, 33, '8/21/2018', 23, new Date(), new Date()];
const booking9 = [27, 5, 25, '12/14/2018', 32, new Date(), new Date()];
const booking10 = [35, 8, 36, '6/21/2019', 21, new Date(), new Date()];
const booking11 = [13, 6, 39, '8/22/2018', 34, new Date(), new Date()];
const booking12 = [9, 17, 8, '1/9/2019', 41, new Date(), new Date()];
const booking13 = [10, 14, 21, '8/23/2018', 40, new Date(), new Date()];
const booking14 = [35, 6, 17, '10/12/2018', 28, new Date(), new Date()];
const booking15 = [1, 13, 5, '3/5/2019', 33, new Date(), new Date()];
const booking16 = [27, 1, 16, '5/4/2019', 15, new Date(), new Date()];
const booking17 = [27, 20, 22, '8/5/2018', 25, new Date(), new Date()];
const booking18 = [7, 17, 36, '7/18/2018', 2, new Date(), new Date()];
const booking19 = [30, 4, 28, '8/18/2018', 43, new Date(), new Date()];
const booking20 = [11, 15, 12, '5/16/2019', 9, new Date(), new Date()];
const booking21 = [11, 1, 20, '2/6/2019', 26, new Date(), new Date()];
const booking22 = [12, 16, 18, '7/10/2019', 10, new Date(), new Date()];
const booking23 = [12, 5, 17, '6/20/2019', 3, new Date(), new Date()];
const booking24 = [36, 17, 32, '4/17/2019', 8, new Date(), new Date()];
const booking25 = [28, 1, 39, '5/18/2019', 8, new Date(), new Date()];
const booking26 = [20, 12, 18, '3/12/2019', 27, new Date(), new Date()];
const booking27 = [12, 9, 25, '7/27/2018', 2, new Date(), new Date()];
const booking28 = [1, 3, 30, '5/15/2019', 35, new Date(), new Date()];
const booking29 = [26, 15, 15, '1/19/2019', 16, new Date(), new Date()];
const booking30 = [20, 15, 27, '4/5/2019', 18, new Date(), new Date()];
const booking31 = [15, 2, 12, '5/21/2019', 1, new Date(), new Date()];
const booking32 = [39, 9, 21, '3/9/2019', 1, new Date(), new Date()];
const booking33 = [25, 6, 35, '7/14/2018', 28, new Date(), new Date()];
const booking34 = [7, 13, 13, '5/25/2019', 21, new Date(), new Date()];
const booking35 = [25, 4, 9, '5/12/2019', 19, new Date(), new Date()];
const booking36 = [28, 6, 12, '8/25/2018', 35, new Date(), new Date()];
const booking37 = [30, 19, 36, '6/16/2019', 8, new Date(), new Date()];
const booking38 = [3, 8, 12, '11/15/2018', 23, new Date(), new Date()];
const booking39 = [38, 8, 23, '2/4/2019', 40, new Date(), new Date()];
const booking40 = [6, 11, 3, '8/9/2018', 12, new Date(), new Date()];


const seedBookings = async () => {
  const createBookingQuery = `INSERT INTO
        bookings(trip_id,  user_id, bus_id, trip_date, seat_number, created_on, modified_on)
        VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`;

  await db.query(createBookingQuery, booking1);
  await db.query(createBookingQuery, booking2);
  await db.query(createBookingQuery, booking3);
  await db.query(createBookingQuery, booking4);
  await db.query(createBookingQuery, booking5);
  await db.query(createBookingQuery, booking6);
  await db.query(createBookingQuery, booking7);
  await db.query(createBookingQuery, booking8);
  await db.query(createBookingQuery, booking9);
  await db.query(createBookingQuery, booking10);
  await db.query(createBookingQuery, booking11);
  await db.query(createBookingQuery, booking12);
  await db.query(createBookingQuery, booking13);
  await db.query(createBookingQuery, booking14);
  await db.query(createBookingQuery, booking15);
  await db.query(createBookingQuery, booking16);
  await db.query(createBookingQuery, booking17);
  await db.query(createBookingQuery, booking18);
  await db.query(createBookingQuery, booking19);
  await db.query(createBookingQuery, booking20);
  await db.query(createBookingQuery, booking21);
  await db.query(createBookingQuery, booking22);
  await db.query(createBookingQuery, booking23);
  await db.query(createBookingQuery, booking24);
  await db.query(createBookingQuery, booking25);
  await db.query(createBookingQuery, booking26);
  await db.query(createBookingQuery, booking27);
  await db.query(createBookingQuery, booking28);
  await db.query(createBookingQuery, booking29);
  await db.query(createBookingQuery, booking30);
  await db.query(createBookingQuery, booking31);
  await db.query(createBookingQuery, booking32);
  await db.query(createBookingQuery, booking33);
  await db.query(createBookingQuery, booking34);
  await db.query(createBookingQuery, booking35);
  await db.query(createBookingQuery, booking36);
  await db.query(createBookingQuery, booking37);
  await db.query(createBookingQuery, booking38);
  await db.query(createBookingQuery, booking39);
  await db.query(createBookingQuery, booking40);
};

seedBookings();
