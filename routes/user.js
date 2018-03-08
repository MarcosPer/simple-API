const express = require('express');
const app = express.Router();

const UserController = require('controllers/user');


app.get('/me', UserController.Info.View.me);

app.get('/id/:user_id', UserController.Info.View.userID);

app.post('/edit', UserController.Info.Edit );

app.use('/changePassword',UserController.Info.ChangePassword);

module.exports = app;