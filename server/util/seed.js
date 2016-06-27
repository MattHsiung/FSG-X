import mongoose    from 'mongoose';
import Promise     from 'bluebird';
import chalk       from 'chalk';
import connectToDb from './db';

const User = mongoose.model('User');

const wipeCollections = () => {
  let removeUsers = User.remove({});
  return Promise.all([
    removeUsers
  ]);
};

const seedUsers = () => {        
  return User.create({
    displayName: 'Barack Obama',
    email: 'obama@gmail.com',
    password: 'potus'
  });
};

connectToDb
  .then(wipeCollections)
  .then(seedUsers)
  .then(() => {
    console.log(chalk.green('Seed successful!'));
    process.kill(0);
  })
  .catch( err => {
    console.error(err);
    process.kill(1);
  });