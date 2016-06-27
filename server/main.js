import chalk   from 'chalk';
import mongoose from 'mongoose';
import app from './server';
import config from './config/config';

mongoose.connect(config.db.url);
console.log(chalk.green.bold('MONGO-DB CONNECTED'));

app.listen(config.port, () => {
  console.log(chalk.green.bold.underline('Listening on port ', chalk.magenta(config.port)));
});