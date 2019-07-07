import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;

chai.use(chaiHttp);

describe('Get index route', () => {
  it('Should return welcome message and 200 status code', (done) => {
    chai.request(app)
      .get('/')
      .end((error, res) => {
        if (error) done(error);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.haveOwnProperty('message');
        done();
      });
  });
});
