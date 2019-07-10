import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../app';

const { expect } = chai;

chai.use(chaiHttp);

const token = jwt.sign({
  userEmail: 'tipgrave0@123-reg.co.uk',
},
process.env.SECRET, { expiresIn: '3d' });

// user book trip {post}
describe('User book a seat on a trip', () => {
  it('POST booking', (done) => {
    const newBooking = {
      user_id: 9,
      is_admin: false,
      trip_id: 18,
    };
    chai.request(app)
      .post('/api/v1/bookings')
      .set('x-access-token', token)
      .send(newBooking)
      .end((error, res) => {
        if (error) done(error);
        expect(res.status).to.equal(201);
        expect(res.body).to.have.keys('status', 'data');
        expect(res.body.data).to.have.keys('booking_id', 'user_id', 'trip_id', 'bus_id', 'trip_date', 'seat_number', 'first_name', 'last_name', 'email');
        expect(res.body.data.user_id).to.be.an('number');
        expect(res.body.data.trip_id).to.be.a('number');
        expect(res.body.data.seat_number).to.be.a('number');
        done();
      });
  });
});
// user see their own booking {get}
describe('User view their booking', () => {
  it('GET booking of a user', (done) => {
    chai.request(app)
      .get('/api/v1/bookings')
      .set('x-access-token', token)
      .end((error, res) => {
        if (error) done(error);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.keys('status', 'data');
        expect(res.body.data).to.be.an('array');
        done();
      });
  });
});
// admin view all bookinkgs {get}
describe('Admin view all booking', () => {
  it('GET all booking', (done) => {
    chai.request(app)
      .get('/api/v1/bookings')
      .set('x-access-token', token)
      .end((error, res) => {
        if (error) done(error);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.keys('status', 'data');
        expect(res.body.data).to.be.an('array');
        done();
      });
  });
});
// user delete their own booking {delete}
describe('User delete trip', () => {
  it('DELETE a user booking', (done) => {
    const bookingId = 12;
    chai.request(app)
      .delete(`/api/v1/bookings/:${bookingId}`)
      .set('x-access-token', token)
      .end((error, res) => {
        if (error) done(error);
        expect(res.status).to.equal(204);
        expect(res.body).to.have.keys('status', 'data');
        expect(res.body.data).to.be.an('array');
        expect(res.body.data).to.have.key('message');
        done();
      });
  });
});

// user change seats after booking {patch}
describe('Change seat number on a booking', () => {
  it('PATCH a user booking', (done) => {
    const bookingId = 13;
    chai.request(app)
      .patch(`/api/v1/bookings/:${bookingId}`)
      .set('x-access-token', token)
      .end((error, res) => {
        if (error) done(error);
        expect(res.status).to.equal(204);
        expect(res.body).to.have.keys('status', 'data');
        expect(res.body.data).to.be.an('array');
        expect(res.body.data).to.have.key('message');
        done();
      });
  });
});
