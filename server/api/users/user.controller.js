import User from './user.model';
import _    from 'lodash';

export const params = (req, res, next, id) => {
  User.findById(id)
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(400).send({ message: 'User not found' });
      } else {
        req.user = user;
        next();
      }
    }, next);
};

export const get = (req, res, next) => {
  User.find({})
    .exec()
    .then((users) => {
      res.send(users);
    }, next);
};

export const getOne = (req, res) => {
  res.send(req.user);
};

export const put = (req, res, next) => {
  var {user, body} = req;

  _.merge(user, body);

  user.save()
    .then((updated) => {
      res.send(updated);
    }, next);
};

export const del = (req, res, next) => {
  req.user.remove()
    .then((removed) => {
      res.send(removed);
    }, next);
};