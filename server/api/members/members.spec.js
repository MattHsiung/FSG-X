import mongoose from 'mongoose';
import {expect} from 'chai';
import request 	from 'supertest';
import app      from '../../server';
import User    	from '../users/user.model';

const dbURI   = 'mongodb://localhost:27017/testingDB';
const clearDB = require('mocha-mongoose')(dbURI);

const obama = { 
  displayName: 'Barack Obama',
  email: 'obama@gmail.com', 
  password: 'potus' 
}

describe('Members Route', () => {

	beforeEach('Establish DB connection', (done) => {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', (done) => {
		clearDB(done);
	});

	describe('Unauthenticated request', () => {

		var agent;

		beforeEach('Create guest agent', () => {
			agent = request.agent(app);
		});

		it('should get a 401 response', (done) => {
			agent
				.get('/api/members/secret-stash')
				.expect(401)
				.end(done);
		});

	});

	describe('Authenticated request', () => {

		const agent = request.agent(app);

		const AUTH_HEADER = { "Authorization":"token" };

		beforeEach('Create a user', (done) => {
			User.create(obama, done);
		});

		beforeEach('Create loggedIn user agent and authenticate', (done) => {
			agent
				.post('/auth/login')
				.send(obama)
				.expect(200)
				.expect(({body})=>{
					AUTH_HEADER['Authorization'] = `Bearer ${body.token}`;
				})
	      .end(done);
		});

		it('should get with 200 response and with a gif link', (done) => {
			agent
				.get('/api/members/secret-stash')
				.set(AUTH_HEADER)
				.expect(200)
				.expect('https://media.giphy.com/media/FHRZIvoGB8WME/giphy.gif')
				.end(done);
		});
	});
});