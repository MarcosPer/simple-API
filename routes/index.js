
const express = require('express');
const api = express.Router();

const AuthenticateUser = require('middlewares/auth/user');


/* Autenticación */
api.use('/auth', require("routes/auth"));

/* Usuario, debes estar logeado */
api.use('/user', AuthenticateUser, require('routes/user'));

module.exports = api;