import { chai, expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);

// user book trip {post}
describe('User can book a seat on a trip', () => {
  it('POST bookng', (done) => {
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
// admin view all bookinkgs {get}
// user delete their own booking {delete}
// admin cancel a trip {patch}
// user change seats after booking {patch}
