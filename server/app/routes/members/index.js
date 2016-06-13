'use strict';
import config   from '../../configure/auth/config';
import jwt      from 'jwt-simple';
import moment   from 'moment';
import {ensureAuthenticated} from '../../configure/auth/authentication-helpers'

const router = require('express').Router();

module.exports = router;

router.get('/secret-stash', ensureAuthenticated, (req, res) => {
    res.send('https://media.giphy.com/media/FHRZIvoGB8WME/giphy.gif');
});