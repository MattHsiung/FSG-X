//EXCERPTED FROM:
/**
 * Satellizer Node.js Example
 * (c) 2015 Sahat Yalkabov
 * License: MIT
 */
import jwt                     from 'jwt-simple';
import User                    from '../api/users/user.model';
import providers               from './oauth.controller'
import {createJWT, verifyUser} from './auth-util'

/*
 |--------------------------------------------------------------------------
 | Log in with Email
 |--------------------------------------------------------------------------
 */
  export const login = (req, res) => {
    User.findOne({ email: req.body.email }, '+password', function(err, user) {
      if (!user) {
        return res.status(401).send({ message: 'Invalid email and/or password' });
      }
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (!isMatch) {
          return res.status(401).send({ message: 'Invalid email and/or password' });
        }
        res.send({ token: createJWT(user) });
      });
    });
  };

/*
 |--------------------------------------------------------------------------
 | Create Email and Password Account
 |--------------------------------------------------------------------------
 */
  export const signup = (req, res) => {
    User.findOne({ email: req.body.email }, function(err, existingUser) {
      if (existingUser) {
        return res.status(409).send({ message: 'Email is already taken' });
      }
      var user = new User({
        displayName: req.body.displayName,
        email: req.body.email,
        password: req.body.password
      });
      user.save(function(err, result) {
        if (err) {
          res.status(500).send({ message: err.message });
        }
        res.send({ token: createJWT(result) });
      });
    });
  };

/*
 |--------------------------------------------------------------------------
 | Unlink Provider
 |--------------------------------------------------------------------------
 */
  export const unlink = (req, res) => {
    var provider = req.body.provider;

    if (providers.indexOf(provider) === -1) {
      return res.status(400).send({ message: 'Unknown OAuth Provider' });
    }

    User.findById(req.user, function(err, user) {
      if (!user) {
        return res.status(400).send({ message: 'User Not Found' });
      }
      user[provider] = undefined;
      user.save(function() {
        res.status(200).end();
      });
    });
  };