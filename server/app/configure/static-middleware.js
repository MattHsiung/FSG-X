"use strict";
const express = require('express');

module.exports = (app) => {
	app.use(express.static('dist')); //serve dist folder during production  
};