import 'core-js/stable';
import 'regenerator-runtime/runtime';
import db from '../db';


const booking1 = [7, 20, 7, '3/15/2019', 14, '22:18', '2:41'];
const booking2 = [6, 19, 21, '9/15/2018', 41, '19:16', '1:01'];
const booking3 = [27, 9, 19, '3/9/2019', 34, '20:35', '8:24'];
const booking4 = [15, 5, 1, '11/23/2018', 31, '13:13', '18:29'];
const booking5 = [38, 19, 3, '11/12/2018', 12, '10:04', '4:32'];
const booking6 = [29, 12, 40, '9/22/2018', 20, '22:57', '13:28'];
const booking7 = [33, 1, 32, '2/9/2019', 35, '21:25', '19:38'];
const booking8 = [23, 14, 33, '8/21/2018', 23, '21:22', '18:53'];
const booking9 = [27, 5, 25, '12/14/2018', 32, '7:03', '20:52'];
const booking10 = [35, 8, 36, '6/21/2019', 21, '4:59', '1:04'];
const booking11 = [13, 6, 39, '8/22/2018', 34, '13:43', '9:53'];
const booking12 = [9, 17, 8, '1/9/2019', 41, '0:31', '7:55'];
const booking13 = [10, 14, 21, '8/23/2018', 40, '0:07', '8:37'];
const booking14 = [35, 6, 17, '10/12/2018', 28, '17:52', '3:22'];
const booking15 = [1, 13, 5, '3/5/2019', 33, '6:08', '19:47'];
const booking16 = [27, 1, 16, '5/4/2019', 15, '13:23', '5:32'];
const booking17 = [27, 20, 22, '8/5/2018', 25, '11:06', '1:59'];
const booking18 = [7, 17, 36, '7/18/2018', 2, '23:29', '3:37'];
const booking19 = [30, 4, 28, '8/18/2018', 43, '15:39', '18:48'];
const booking20 = [11, 15, 12, '5/16/2019', 9, '1:44', '9:18'];
const booking21 = [11, 1, 20, '2/6/2019', 26, '17:34', '10:29'];
const booking22 = [12, 16, 18, '7/10/2019', 10, '0:28', '19:07'];
const booking23 = [12, 5, 17, '6/20/2019', 3, '9:51', '16:25'];
const booking24 = [36, 17, 32, '4/17/2019', 8, '7:19', '3:58'];
const booking25 = [28, 1, 39, '5/18/2019', 8, '23:51', '1:15'];
const booking26 = [20, 12, 18, '3/12/2019', 27, '19:29', '3:55'];
const booking27 = [12, 9, 25, '7/27/2018', 2, '9:02', '15:08'];
const booking28 = [1, 3, 30, '5/15/2019', 35, '16:08', '17:09'];
const booking29 = [26, 15, 15, '1/19/2019', 16, '17:01', '8:56'];
const booking30 = [20, 15, 27, '4/5/2019', 18, '14:43', '4:07'];
const booking31 = [15, 2, 12, '5/21/2019', 1, '20:36', '2:39'];
const booking32 = [39, 9, 21, '3/9/2019', 1, '18:49', '23:23'];
const booking33 = [25, 6, 35, '7/14/2018', 28, '5:50', '14:06'];
const booking34 = [7, 13, 13, '5/25/2019', 21, '1:03', '9:56'];
const booking35 = [25, 4, 9, '5/12/2019', 19, '20:37', '15:43'];
const booking36 = [28, 6, 12, '8/25/2018', 35, '0:35', '8:22'];
const booking37 = [30, 19, 36, '6/16/2019', 8, '15:01', '8:34'];
const booking38 = [3, 8, 12, '11/15/2018', 23, '10:55', '19:25'];
const booking39 = [38, 8, 23, '2/4/2019', 40, '1:54', '10:11'];
const booking40 = [6, 11, 3, '8/9/2018', 12, '13:03', '10:03'];


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
