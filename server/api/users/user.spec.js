import mongoose from 'mongoose';
import sinon    from 'sinon';
import {expect} from 'chai';
import User     from './user.model';

const dbURI   = 'mongodb://localhost:27017/testingDB';
const clearDB = require('mocha-mongoose')(dbURI);

const obama = { 
  displayName: 'Barack Obama',
  email: 'obama@gmail.com', 
  password: 'potus' 
}

const createUser = () => User.create(obama);

describe('User model', () => {

  beforeEach('Establish DB connection', (done) => {
    if (mongoose.connection.db) return done();
    mongoose.connect(dbURI, done);
  });

  afterEach('Clear test database', (done) => clearDB(done));  

  it('should exist', () => {
    expect(User).to.be.a('function');
  });

  describe('password encryption', (done) => {

    afterEach('Clear test database', done => clearDB(done));

    describe('comparePassword', (done) => {

      it('should exist', (done) => {
        createUser()
          .then( user => {
            expect(user.comparePassword).to.be.a('function');
            done();
          })
      });
    });

    describe('on creation', function () {

      it('should set user.password to the encrypted password', (done) => {
        createUser()
          .then( returnedUser => {
            User.findOne({ email: returnedUser.email }, '+password')
              .then( user => {
                expect(user.password).to.not.equal(obama.password)
                done();
              });
          });
      });
    });

    describe('sanitize', () => {

      it('password should be excluded from a user query', (done) => {
        createUser()
          .then( createdUser => {
            expect(createdUser.password).to.not.be.undefined;
            User.findOne({ email: createdUser.email }, (err, user) => {
              expect(user.password).to.be.undefined;
              done();
            });
          });
      });
    });
  });
});