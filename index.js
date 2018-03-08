'use strict';
require('app-module-path').addPath(__dirname);//Para tener que evitar poner ../../../ etc https://gist.github.com/branneman/8048520
process.env.apiURL = 'http://localhost:3001/';
process.env.debug = true;
//NodeJS trabajará con fechas UTC
process.env.TZ = 'UTC';

const api = require('system/api');
const config = require('system/config');
const db = require('system/db');

require('system/validations');


api.listen(config.port, () => {
    console.log(`API REST corriendo en http://localhost:${config.port}`)
});


db.connect(config);

