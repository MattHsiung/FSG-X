'use strict';
const path = require('path');
const chalk = require('chalk');
const util = require('util');

const indexPath = path.join(__dirname, '../../../', './dist/index.html');
const config = require('./auth/config.js');

const logMiddleware = (req, res, next) => {
	util.log(('---NEW REQUEST---'));
	console.log(util.format(chalk.red('%s: %s %s'), 'REQUEST ', req.method, req.path));
	console.log(util.format(chalk.yellow('%s: %s'), 'QUERY   ', util.inspect(req.query)));
	console.log(util.format(chalk.cyan('%s: %s'), 'BODY    ', util.inspect(req.body)));
	next();
};

module.exports = function (app) {
  app.set('config', config);
  app.set('indexHTMLPath', indexPath);
  app.set('log', logMiddleware);
};