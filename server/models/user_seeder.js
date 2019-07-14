import 'core-js/stable';
import 'regenerator-runtime/runtime';
import db from '../db';

const user1 = ['yatto0@ucsd.edu', 'Yalonda', 'Atto', '7vyAnN4RZXpA', true, new Date(), new Date()];
const user2 = ['gkinworthy1@t-online.de', 'Gonzalo', 'Kinworthy', 'jGSwdAG', true, new Date(), new Date()];
const user3 = ['efreezer2@wp.com', 'Elisabetta', 'Freezer', 'LNK3qq0', true, new Date(), new Date()];
const user4 = ['slampbrecht3@i2i.jp', 'Stanislaus', 'Lampbrecht', 'cp90K4JS', true, new Date(), new Date()];
const user5 = ['mpahler4@foxnews.com', 'Marjory', 'Pahler', 'tMaMUFtpyCJT', true, new Date(), new Date()];
const user6 = ['fbaynton5@tinyurl.com', 'Fidelity', 'Baynton', 'fqLRrO', true, new Date(), new Date()];
const user7 = ['regleton6@telegraph.co.uk', 'Rivy', 'Egleton', 'AVZZL7BfEsIc', false, new Date(), new Date()];
const user8 = ['dsukbhans7@narod.ru', 'Dael', 'Sukbhans', 'hRsHJmEY1nR', true, new Date(), new Date()];
const user9 = ['omostyn8@yale.edu', 'Oliver', 'Mostyn', 'rr3gDQN7qHC', true, new Date(), new Date()];
const user10 = ['nriteley9@histats.com', 'Nadine', 'Riteley', 'Lq70Mj', true, new Date(), new Date()];
const user11 = ['jpontina@topsy.com', 'Jeffy', 'Pontin', 'IlDilGhd', true, new Date(), new Date()];
const user12 = ['hpeeverb@oracle.com', 'Hercule', 'Peever', 'SmIW2XG', true, new Date(), new Date()];
const user13 = ['aconstablec@dell.com', 'Aurea', 'Constable', 'KCHK7C2B', true, new Date(), new Date()];
const user14 = ['odebischofd@studiopress.com', 'Ollie', 'De Bischof', '295AY3Q6bncf', false, new Date(), new Date()];
const user15 = ['wdudleye@dion.ne.jp', 'Wilmer', 'Dudley', '4sDDlhHQGb', true, new Date(), new Date()];
const user16 = ['afilyukovf@reddit.com', 'Aila', 'Filyukov', 'Nn4AhgM', false, new Date(), new Date()];
const user17 = ['domoylaneg@bbb.org', 'Dunstan', "O'Moylane", 'xsDlsCfT', false, new Date(), new Date()];
const user18 = ['lswarbrickh@4shared.com', 'Lonnard', 'Swarbrick', '82FvP2jv0r', true, new Date(), new Date()];
const user19 = ['ddownei@house.gov', 'Drake', 'Downe', 'QUsNRASfi', false, new Date(), new Date()];
const user20 = ['boldroydej@psu.edu', 'Boy', 'Oldroyde', 'algtQbq8', true, new Date(), new Date()];

const seedusers = async () => {
  const createuserQuery = `INSERT INTO
        users(email, first_name, last_name, password, is_admin, created_on, modified_on)
        VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`;

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
