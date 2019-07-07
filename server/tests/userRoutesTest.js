import chai from 'chai';
import chaiHttp from 'chai-http';
// import jwt from 'jsonwebtoken';
import app from '../app';

const { expect } = chai;

chai.use(chaiHttp);


describe('User Signup', () => {
  it('Get signup route', (done) => {
    chai.request(app)
      .get('/auth/signup')
      .end((error, res) => {
        if (error) done(error);
        expect(res.status).to.equal(200);
      });
  });
});


describe('User Signup', () => {
  it('Creates a new user and assign a token', (done) => {
    const newUser = {
      email: 'smaueljaden@wemail.com',
      first_name: 'Samuel',
      last_name: 'Jaden',
      password: 'ertyu67@KL',
    };
    chai.request(app)
      .post('/auth/signup')
      .send(newUser)
      .end((error, res) => {
        if (error) done(error);
        expect(res.status).to.equal(201);
        expect(res.body).to.have.keys('status', 'data');
        expect(res.data).to.have.keys('user_id', 'is_admin', 'token');
        expect(res.data.user_id).to.be.an('integer');
        expect(res.data.is_admin).to.be.a('boolean');
        expect(res.data.token).to.be.a('string');
      });
  });
});

describe('User Signin', () => {
  it('Signin a user', (done) => {
    chai.request(app)
      .get('/auth/signin')
      .end((error, res) => {
        if (error) done(error);
        expect(res.status).to.equal(200);
      });
  });
});

describe('Signin a User', () => {
  it('Signin a registerd user by assigning a token', (done) => {
    const user = {
      email: 'smaueljaden@wemail.com',
      password: 'ertyu67@KL',
    };
    chai.request(app)
      .post('/auth/signin')
      .send(user)
      .end((error, res) => {
        if (error) done(error);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.keys('status', 'data');
        expect(res.data).to.have.keys('user_id', 'is_admin', 'token');
        expect(res.data.user_id).to.be.an('integer');
        expect(res.data.is_admin).to.be.a('boolean');
        expect(res.data.token).to.be.a('string');
      });
  });
});
