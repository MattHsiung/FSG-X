'use strict';
var Promise = require('bluebird');
var path = require('path');
var chalk = require('chalk');
var DATABASE_URI = require('../app/configure/auth/config.js')['DATABASE_URI'];
var mongoose = require('mongoose');
var db = mongoose.connect(DATABASE_URI).connection;

mongoose.Promise = Promise;

require('./models');

// Modifying startDbPromise to return the db object to have an access to it when  .then on startDbPromise
var startDbPromise = new Promise(function (resolve, reject) {
    db.on('open', function () {
    	resolve(db);
    });
    db.on('error', reject);
});

console.log(chalk.yellow('Opening connection to MongoDB . . .'));
startDbPromise.then(() => {
    console.log(chalk.green('MongoDB connection opened!'));
});

module.exports = startDbPromise;