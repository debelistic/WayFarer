import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;

chai.use(chaiHttp);

// get all trips
describe('Get Trips', () => {
  it('Get all Trips', (done) => {
    chai.request(app)
      .get('/trips')
      .end((error, res) => {
        if (error) done(error);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.keys('status', 'data');
        expect(res.body.data).to.be.an('array');
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
      bus_id: 4,
      origin: 'osun',
      destination: 'edo',
      trip_date: Date(),
      fare: 28,
      createdOn: Date(),
    };
    chai.request(app)
      .post('/trips')
      .send(newTrip)
      .end((error, res) => {
        if (error) done(error);
        expect(res.status).to.equal(201);
        expect(res.body).to.have.keys('status', 'data');
        expect(res.data).to.have.keys('trip_id', 'bus_id', 'origin', 'destination', 'trip_date', 'fare');
        expect(res.data.trip_id).to.be.an('integer');
        expect(res.data.bus_id).to.be.a('integer');
        expect(res.data.destination).to.be.a('string');
        expect(res.data.trip_date).to.be.a('string');
        expect(res.data.fare).to.be.a('float');
      });
  });
});


// get trips by origin
describe('Get Trips by Origin', () => {
  it('Get all Trips by specified Origin', (done) => {
    const tripOrigin = 'Sans';
    chai.request(app)
      .get(`/trips/:${tripOrigin}`)
      .end((error, res) => {
        if (error) done(error);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.keys('status', 'data');
        expect(res.body.data).to.be.an('array');
      });
  });
});
// get trips by destiabtion
describe('Get Trips by Destination', () => {
  it('Get all Trips by specified Destination', (done) => {
    const tripDestination = 'Lema';
    chai.request(app)
      .get(`/trips/:${tripDestination}`)
      .end((error, res) => {
        if (error) done(error);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.keys('status', 'data');
        expect(res.body.data).to.be.an('array');
      });
  });
});
// admin cancel a trip {patch}
describe('Admin Cancel Trip', () => {
  it('PATCH a Trip', (done) => {
    const tripId = 13;
    chai.request(app)
      .patch(`/trips/:${tripId}`)
      .end((error, res) => {
        if (error) done(error);
        expect(res.status).to.equal(204);
        expect(res.body).to.have.keys('status', 'data');
        expect(res.data).to.be.an('array');
        expect(res.data).to.have.key('message');
      });
  });
});
