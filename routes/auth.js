const express = require('express');
const app = express.Router();

const GoogleController = require("controllers/auth/google");
const FacebookController = require("controllers/auth/facebook");
const EmailController = require("controllers/auth/email");


app.use('/google', GoogleController.router);
app.use('/facebook', FacebookController.router);
app.use('/', EmailController.router);


app.get('/methods', (req,res) => {
   const out = [
       {
           provider : 'google',
           url : GoogleController.getURL()
       },
       {
           provider: 'facebook',
           url: FacebookController.getURL()
       },
       {
           provider: 'email',
           url: EmailController.getURL()
       }
   ];
   res.json(out);
});

module.exports = app;