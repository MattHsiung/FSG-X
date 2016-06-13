'use strict';
import chalk   from 'chalk';
import startDb from './db';
import app     from './app';

const server = require('http').createServer();

const createApplication = () => {
  server.on('request', app);
};

const startServer = () => {
  const PORT = process.env.PORT || 9000;
  server.listen(PORT, () => {
    console.log(chalk.blue('Server is over 900000000000', chalk.magenta(PORT)));
  });
};

startDb
	.then(createApplication)
	.then(startServer)
	.catch( err => {
	  console.error(chalk.red(err.stack));
    process.kill(1);
	});