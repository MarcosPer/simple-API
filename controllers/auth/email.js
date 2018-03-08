const express = require('express');
const app = express.Router();

const validate = require('middlewares/validation');
const check = validate.check;

const LoginService = require('services/auth/login');
const RegisterService = require('services/auth/register');

const errorHandler = require('system/handlers/response').errorHandler;

app.post("/login",[
    check('user').isEmail().withMessage('must be an email').trim(),
    check('password').exists()
   ],validate, (req,res) => {

    const options = {};
    options.provider = 'password';
    options.id = req.body.password;
    options.email = req.body.user;

    LoginService.doLogin(options).then((token) => {
        res.send(token);
    }).catch((error) => {
        errorHandler.handleResponse(error,res);
    });
});

app.post("/register",[
    check('name').isLength({ min: 3 , max : 20}).withMessage('invalid name (length must be between 3 and 20 characters)'),
    check('lastname').isLength({ min: 3 , max : 20}).withMessage('invalid name (length must be between 3 and 20 characters)'),
    check('email').isEmail().withMessage('invalid email'),
    check('password').exists().isLength({ min: 5 }).withMessage('password must be more than 5 characters')
    ],validate, (req,res) => {

    lang = req.acceptsLanguages(require("locales"));

    if(!lang){
        lang = "en";
    }

    const profile = {
        firstName: req.body.name,
        lastName: req.body.lastname,
        email: req.body.email,
        language: lang,
        login: {
            provider: 'password',
            id: req.body.password
        }
    };
    RegisterService.doRegister(profile).then((result) => {
        res.send(result);
    }).catch((error) => {
        errorHandler.handleResponse(error,res);
    });

});

exports.getURL = () => {
    return process.env.apiURL+'auth/login';
};
exports.router = app;