import { chai, expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);

// user book trip {post}
describe('Admin add bus', () => {
  it('POST bus', (done) => {
    const newBus = {
      token: 'user_token',
      number_plate: 9,
      maunfacturer: 'benz',
      model: 18,
      year: 2016,
      capacity: 70,
    };
    chai.request(app)
      .post('/buses')
      .send(newBus)
      .end((error, res) => {
        if (error) done(error);
        expect(res.status).to.equal(201);
        expect(res.body).to.have.keys('status', 'data');
        expect(res.data).to.have.keys('number_plate', 'maunfacturer', 'model', 'year', 'capacity');
      });
  });
});
// user see their own booking {get}
describe('Admin view all available bues', () => {
  it('GET available buses', (done) => {
    chai.request(app)
      .get('/buses')
      .end((error, res) => {
        if (error) done(error);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.keys('status', 'data');
        expect(res.data).to.be.an('array');
      });
  });
});
