import 'core-js/stable';
import 'regenerator-runtime/runtime';
import db from '../db';

const user1 = ['yatto0@ucsd.edu', 'Yalonda', 'Atto', '7vyAnN4RZXpA', true, '10:03', '5:20'];
const user2 = ['gkinworthy1@t-online.de', 'Gonzalo', 'Kinworthy', 'jGSwdAG', true, '16:09', '3:15'];
const user3 = ['efreezer2@wp.com', 'Elisabetta', 'Freezer', 'LNK3qq0', true, '3:48', '2:23'];
const user4 = ['slampbrecht3@i2i.jp', 'Stanislaus', 'Lampbrecht', 'cp90K4JS', true, '22:59', '21:41'];
const user5 = ['mpahler4@foxnews.com', 'Marjory', 'Pahler', 'tMaMUFtpyCJT', true, '3:25', '15:30'];
const user6 = ['fbaynton5@tinyurl.com', 'Fidelity', 'Baynton', 'fqLRrO', true, '10:51', '18:29'];
const user7 = ['regleton6@telegraph.co.uk', 'Rivy', 'Egleton', 'AVZZL7BfEsIc', false, '22:55', '21:03'];
const user8 = ['dsukbhans7@narod.ru', 'Dael', 'Sukbhans', 'hRsHJmEY1nR', true, '9:24', '5:20'];
const user9 = ['omostyn8@yale.edu', 'Oliver', 'Mostyn', 'rr3gDQN7qHC', true, '13:28', '12:46'];
const user10 = ['nriteley9@histats.com', 'Nadine', 'Riteley', 'Lq70Mj', true, '19:17', '13:47'];
const user11 = ['jpontina@topsy.com', 'Jeffy', 'Pontin', 'IlDilGhd', true, '8:26', '0:50'];
const user12 = ['hpeeverb@oracle.com', 'Hercule', 'Peever', 'SmIW2XG', true, '20:34', '13:21'];
const user13 = ['aconstablec@dell.com', 'Aurea', 'Constable', 'KCHK7C2B', true, '7:52', '10:05'];
const user14 = ['odebischofd@studiopress.com', 'Ollie', 'De Bischof', '295AY3Q6bncf', false, '14:53', '4:32'];
const user15 = ['wdudleye@dion.ne.jp', 'Wilmer', 'Dudley', '4sDDlhHQGb', true, '18:14', '8:33'];
const user16 = ['afilyukovf@reddit.com', 'Aila', 'Filyukov', 'Nn4AhgM', false, '13:33', '17:31'];
const user17 = ['domoylaneg@bbb.org', 'Dunstan', "O'Moylane", 'xsDlsCfT', false, '20:27', '13:29'];
const user18 = ['lswarbrickh@4shared.com', 'Lonnard', 'Swarbrick', '82FvP2jv0r', true, '4:14', '9:41'];
const user19 = ['ddownei@house.gov', 'Drake', 'Downe', 'QUsNRASfi', false, '7:34', '17:25'];
const user20 = ['boldroydej@psu.edu', 'Boy', 'Oldroyde', 'algtQbq8', true, '11:56', '14:53'];

const seedusers = async () => {
  const createuserQuery = `INSERT INTO
        users(email, first_name, last_name, password, created_on, modified_on)
        VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;

  await db.query(createuserQuery, user1);
  await db.query(createuserQuery, user2);
  await db.query(createuserQuery, user3);
  await db.query(createuserQuery, user4);
  await db.query(createuserQuery, user5);
  await db.query(createuserQuery, user6);
  await db.query(createuserQuery, user7);
  await db.query(createuserQuery, user8);
  await db.query(createuserQuery, user9);
  await db.query(createuserQuery, user10);
  await db.query(createuserQuery, user11);
  await db.query(createuserQuery, user12);
  await db.query(createuserQuery, user13);
  await db.query(createuserQuery, user14);
  await db.query(createuserQuery, user15);
  await db.query(createuserQuery, user16);
  await db.query(createuserQuery, user17);
  await db.query(createuserQuery, user18);
  await db.query(createuserQuery, user19);
  await db.query(createuserQuery, user20);
};

seedusers();
