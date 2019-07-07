import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;

chai.use(chaiHttp);

// user book trip {post}
describe('User book a seat on a trip', () => {
  it('POST booking', (done) => {
    const newBooking = {
      token: 'user_token',
      user_id: 9,
      is_admin: false,
      trip_id: 18,
    };
    chai.request(app)
      .post('/bookings')
      .send(newBooking)
      .end((error, res) => {
        if (error) done(error);
        expect(res.status).to.equal(201);
        expect(res.body).to.have.keys('status', 'data');
        expect(res.data).to.have.keys('booking_id', 'user_id', 'trip_id', 'bus_id', 'trip_date', 'seat_number', 'first_name', 'last_name', 'email');
        expect(res.data.user_id).to.be.an('integer');
        expect(res.data.trip_id).to.be.a('integer');
        expect(res.data.seat_number).to.be.a('integer');
      });
  });
});
// user see their own booking {get}
describe('User view their booking', () => {
  it('GET booking of a user', (done) => {
    chai.request(app)
      .get('/bookings')
      .end((error, res) => {
        if (error) done(error);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.keys('status', 'data');
        expect(res.data).to.be.an('array');
      });
  });
});
// admin view all bookinkgs {get}
describe('Admin view all booking', () => {
  it('GET all booking', (done) => {
    chai.request(app)
      .get('/bookings')
      .end((error, res) => {
        if (error) done(error);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.keys('status', 'data');
        expect(res.data).to.be.an('array');
      });
  });
});
// user delete their own booking {delete}
describe('User delete trip', () => {
  it('DELETE a user booking', (done) => {
    const bookingId = 12;
    chai.request(app)
      .delete(`/bookings/:${bookingId}`)
      .end((error, res) => {
        if (error) done(error);
        expect(res.status).to.equal(204);
        expect(res.body).to.have.keys('status', 'data');
        expect(res.data).to.be.an('array');
        expect(res.data).to.have.key('message');
      });
  });
});

// user change seats after booking {patch}
describe('Change seat number on a booking', () => {
  it('PATCH a user booking', (done) => {
    const bookingId = 13;
    chai.request(app)
      .patch(`/bookings/:${bookingId}`)
      .end((error, res) => {
        if (error) done(error);
        expect(res.status).to.equal(204);
        expect(res.body).to.have.keys('status', 'data');
        expect(res.data).to.be.an('array');
        expect(res.data).to.have.key('message');
      });
  });
});
