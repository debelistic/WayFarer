import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../app';

const { expect } = chai;

chai.use(chaiHttp);

const token = jwt.sign({
  userEmail: 'yatto0@ucsd.edu',
},
process.env.SECRET, { expiresIn: '3d' });

// user book trip {post}
describe('Admin add bus', () => {
  it('POST bus', (done) => {
    const newBus = {
      token: 'user_token',
      number_plate: 'ght-345-tyh',
      maunfacturer: 'benz',
      model: '2016 xl',
      year: 2016,
      capacity: 70,
    };
    chai.request(app)
      .post('/api/v1/buses')
      .set('x-access-token', token)
      .send(newBus)
      .end((error, res) => {
        if (error) done(error);
        expect(res.status).to.equal(201);
        expect(res.body).to.have.keys('status', 'data');
        expect(res.body.data).to.have.keys('number_plate', 'maunfacturer', 'model', 'status', 'year', 'capacity', 'created_on');
        done();
      });
  });
});
// user see their own booking {get}
describe('Admin view all available bues', () => {
  it('GET available buses', (done) => {
    chai.request(app)
      .get('/api/v1/buses')
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
