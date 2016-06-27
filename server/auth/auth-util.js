import jwt      from 'jwt-simple';
import moment   from 'moment';
import config   from './config';
import User     from '../api/users/user.model';

export const decodeToken = (req, res, next) => {
  if (!req.header('Authorization')) {
    return res.status(401).send({ message: 'Authorization header not found.' });
  }
  
  var token = req.header('Authorization').split(' ')[1];

  var payload = null;
  try {
    payload = jwt.decode(token, config.TOKEN_SECRET);
  }
  catch (err) {
    return res.status(401).send({ message: err.message });
  }

  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ message: 'Token has expired' });
  }
  req.user = payload.sub;
  next();
}

export const retrieveUser = (req, res, next) => {
  User.findById(req.user)
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(400).send({ message: 'User not found' });
      } else {
        req.user = user;
        next();
      }
    }, next);
}

export const createJWT = (user) => {
  var payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
}


export const verifyUser = [decodeToken, retrieveUser];