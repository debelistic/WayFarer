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

// get all trips
describe('Get Trips', () => {
  it('Get all Trips', (done) => {
    chai.request(app)
      .get('/api/v1/trips')
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

// create trips
describe('Admin Create Trips', () => {
  it('POST Trip ', (done) => {
    const newTrip = {
      token: 'smaueljaden@wemail.com',
      user_id: 'Samuel',
      is_admin: true,
      bus_id: 41,
      origin: 'osun',
      destination: 'edo',
      trip_date: Date(),
      fare: 28.00,
    };
    chai.request(app)
      .post('/api/v1/trips')
      .set('x-access-token', token)
      .send(newTrip)
      .end((error, res) => {
        if (error) done(error);
        expect(res.status).to.equal(201);
        expect(res.body).to.have.keys('status', 'data');
        expect(res.body.data).to.have.keys('trip_id', 'bus_id', 'origin', 'destination', 'trip_date', 'fare');
        expect(res.body.data.trip_id).to.be.an('number');
        expect(res.body.data.bus_id).to.be.a('number');
        expect(res.body.data.destination).to.be.a('string');
        expect(res.body.data.trip_date).to.be.a('string');
        expect(res.body.data.fare).to.be.a('number');
        done();
      });
  });
});


// get trips by origin
describe('Get Trips by Origin', () => {
  it('Get all Trips by specified Origin', (done) => {
    const tripOrigin = 'Sans';
    chai.request(app)
      .get(`/api/v1/trips/:${tripOrigin}`)
      .end((error, res) => {
        if (error) done(error);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.keys('status', 'data');
        expect(res.body.data).to.be.an('array');
        done();
      });
  });
});
// get trips by destiabtion
describe('Get Trips by Destination', () => {
  it('Get all Trips by specified Destination', (done) => {
    const tripDestination = 'Lema';
    chai.request(app)
      .get(`/api/v1/trips/:${tripDestination}`)
      .end((error, res) => {
        if (error) done(error);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.keys('status', 'data');
        expect(res.body.data).to.be.an('array');
        done();
      });
  });
});
// admin cancel a trip {patch}
describe('Admin Cancel Trip', () => {
  it('PATCH a Trip', (done) => {
    const tripId = 13;
    chai.request(app)
      .patch(`/api/v1/trips/:${tripId}`)
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
