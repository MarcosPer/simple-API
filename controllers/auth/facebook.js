const express = require('express');
const app = express.Router();

const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const oAuthService = require('services/auth/oauth');

const clientID =  process.env.FACEBOOK_OAUTHID;
const clientSecret =  process.env.FACEBOOK_OAUTHSECRET;
const callback =  process.env.apiURL+'auth/facebook/callback';

const errorHandler = require('system/handlers/response').errorHandler;

passport.use(new FacebookStrategy({
        clientID: clientID,
        clientSecret: clientSecret,
        callbackURL: callback,
        profileFields: ['id', 'emails', 'name']
    },
    function(accessToken, refreshToken, profile, cb) {

        oAuthService.oAuthLogin('facebook',profile).then((session) => {
            /* Pasamos la nueva sesión creada a callback */
            cb(null,session);
        }).catch((error) => {
            /* Si ha habido un error de autenticacion lo pasamos a callback */
            cb(null,error);
        })

    }
));

app.get('/', (req,res) => {
    res.json({provider : "facebook" , login_url : this.getURL() });
});


app.get('/login', passport.authenticate('facebook'));

app.get('/callback',
    passport.authenticate('facebook', {scope : ['email','public_profile'], session: false }),
    (req, res) => {
        if(errorHandler.isError(req.user)){
            errorHandler.handleResponse(req.user,res);
        }else{
            res.send(req.user);
        }
    }
);

exports.getURL = () => {
    return "https://www.facebook.com/dialog/oauth?" +
        "client_id=" + clientID +
        "&response_type=code"+
        "&redirect_uri=" + encodeURI(callback);
    };

exports.router = app;