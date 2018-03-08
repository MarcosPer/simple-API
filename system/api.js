'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const api = require('../routes');
//const languageDetector = require()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', api);

module.exports = app;