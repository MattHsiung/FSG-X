import mongoose from 'mongoose';
import Promise  from 'bluebird';
import chalk    from 'chalk';
import User     from '../api/users/user.model';


const cleanDB = () => {
  console.log(chalk.yellow('Seeding...'));
  let removeUsers = User.remove({});
  return Promise.all([
    removeUsers
  ]);
};

const seedUser = () => {        
  return User.create({
    displayName: 'Barack Obama',
    email: 'obama@gmail.com',
    password: 'potus'
  });
};

const seedDB = () => {
  cleanDB()
    .then(seedUser)
    .then(() => {
      console.log(chalk.green('Seed successful!'));
    })
    .catch( err => {
      console.error(err);
      process.kill(1);
    });
}; 

export default seedDB;