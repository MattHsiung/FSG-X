'use strict';
module.exports = function (app) {

    require('./app-variables')(app);
    require('./static-middleware')(app);
    require('./parsing-middleware')(app);

    app.use(app.get('log'));

    require('./auth/authentication-middleware')(app);
};