import <%= upCaseName %> from './<%= name %>.model';
import _    from 'lodash';

export const params = (req, res, next, id) => {
  <%= upCaseName %>.findById(id)
    .exec()
    .then((<%= name %>) => {
      if (!<%= name %>) {
        return res.status(400).send({ message: '<%= upCaseName %> not found' });
      } else {
        req.<%= name %> = <%= name %>;
        next();
      }
    }, next);
};

export const get = (req, res, next) => {
  <%= upCaseName %>.find({})
    .exec()
    .then((<%= name %>s) => {
      res.send(<%= name %>s);
    }, next);
};

export const getOne = (req, res) => {
  res.send(req.<%= name %>);
};

export const post = (req, res, next) => {
  var new<%= upCaseName %> = req.body;

  <%= upCaseName %>.create(new<%= upCaseName %>)
    .then((created) => {
      res.send(created);
    }, next);
};

export const put = (req, res, next) => {
  var {<%= name %>, body} = req;

  _.merge(<%= name %>, body);

  <%= name %>.save()
    .then((updated) => {
      res.send(updated);
    }, next);
};

export const del = (req, res, next) => {
  req.<%= name %>.remove()
    .then((removed) => {
      res.send(removed);
    }, next);
};