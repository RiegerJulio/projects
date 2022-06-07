// import * as sinon from 'sinon';
import * as chai from 'chai';
import { mockUser } from './mockUser';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const goodRequest = {
  email: 'admin@admin.com',
  password: 'secret_admin'
};
const badRequest = {
  email: 'badRequest',
  password: 'any'
};

const requestWithoutEmail = {
  email: '',
  password: 'anyPassword'
};

const requestWithoutPassword = {
  email: 'goodrequest@test.com',
  password: ''
};

const userMock = mockUser;
let res: Response;

describe('Testing login routes', () => {

  it('good request return status 200', async () => {
    res = await chai.request(app)
      .post('/login')
      .send(goodRequest);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
    expect(res.body).to.have.property('user');
  });

  it('request without email return status 400', async () => {
    res = await chai.request(app)
      .post('/login')
      .send(requestWithoutEmail);
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('All fields must be filled');
  });

  it('request without password return status 400', async () => {
    res = await chai.request(app)
      .post('/login')
      .send(requestWithoutPassword);
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('All fields must be filled');
  });

  it('bad request return status 401', async () => {
    res = await chai.request(app)
      .post('/login')
      .send(badRequest);
    expect(res.status).to.equal(401);
    expect(res.body.message).to.equal('Incorrect email or password');
  });
});

describe('Testing login/validate routes', () => {
  it('validate token return status 200', async () => {
    res = await chai.request(app)
      .post('/login')
      .send(goodRequest)

    const { role , token } = res.body;

    return chai.request(app)
      .get('/login/validate')
      .set('authorization', token)
      .then((Response) => {
        expect(Response.status).equal(200);
        expect(Response.body).equal("admin");
      })
  });

  it('validate token return status 401', async () => {
    return chai.request(app)
      .get('/login/validate')
      .then((Response) => {
        expect(Response.status).equal(401);
        expect(Response.body.message).equal('No token provided');
      });
  });
})