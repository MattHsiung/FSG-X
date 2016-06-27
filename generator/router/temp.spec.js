import mongoose from 'mongoose';
import sinon    from 'sinon';
import request  from 'supertest';
import {expect} from 'chai';
import app      from '../../server';
import <%= upCaseName %>      from './<%= name %>.model';

const dbURI   = 'mongodb://localhost:27017/testingDB';
const clearDB = require('mocha-mongoose')(dbURI);

const test<%= upCaseName %> = { 
  name: 'joe'
}

const create<%= upCaseName %> = () => <%= upCaseName %>.create(test<%= upCaseName %>);

describe('<%= upCaseName %> model', () => {

  beforeEach('Establish DB connection', (done) => {
    if (mongoose.connection.db) return done();
    mongoose.connect(dbURI, done);
  });

  afterEach('Clear test database', (done) => clearDB(done));  

  it('should exist', () => {
    expect(<%= upCaseName %>).to.be.a('function');
  });

  describe('Creation', (done) => {

    afterEach('Clear test database', done => clearDB(done));

    it('should exist', (done) => {
      create<%= upCaseName %>()
        .then( <%= name %> => {
          expect(<%= name %>.name).to.equal('joe');
          done();
        })
    });
  });
});

describe('<%= upCaseName %> Router', () => {

  beforeEach('Establish DB connection', (done) => {
    if (mongoose.connection.db) return done();
    mongoose.connect(dbURI, done);
  });

  afterEach('Clear test database', done => clearDB(done));

  describe('Should be REST-ful', () => {

    let agent;
    let new<%= upCaseName %>Id;

    beforeEach('Create guest agent', (done) => {
      agent = request.agent(app);
      create<%= upCaseName %>().then((<%= name %>) => {
        new<%= upCaseName %>Id = <%= name %>._id
        done()
      });
    });

    afterEach('Clear test database', done => clearDB(done));

    it('Should get all', (done) => {
      agent
        .get('/api/<%= name %>')
        .expect(200)
        .expect(res => {
          if(res.body[0].name !== 'joe') throw new Error('not found')
        })
        .end(done);
    });

    it('Should create', (done) => {
      agent
        .post(`/api/<%= name %>/`)
        .send({name: 'david'})
        .expect(200)
        .expect(res => {
          if(res.body.name !== 'david') throw new Error('not found')
        })
        .end(done);
    });

    it('Should get one', (done) => {
      agent
        .get('/api/<%= name %>/' + new<%= upCaseName %>Id)
        .expect(200)
        .expect(res => {
          if(res.body.name !== 'joe') throw new Error('not found')
        })
        .end(done);
    });

    it('Should update', (done) => {
      agent
        .put('/api/<%= name %>/' + new<%= upCaseName %>Id)
        .send({name: 'david'})
        .expect(200)
        .expect(res => {
          if(res.body.name !== 'david') throw new Error('not found')
        })
        .end(done);
    });

    it('Should delete', (done) => {
      agent
        .delete('/api/<%= name %>/' + new<%= upCaseName %>Id)
        .expect(200)
        .expect(res => {
          console.log()
          if(res.body.name !== 'joe') throw new Error('not found')
        })
        .expect(()=>{
          return <%= upCaseName %>.find({})
            .then(<%= name %> => {
              if(<%= name %>.length) throw new Error('did not delete')
            });
        })
        .end(done);
    });

  });
});