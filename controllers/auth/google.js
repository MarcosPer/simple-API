const express = require('express');
const app = express.Router();

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const oAuthService = require('services/auth/oauth');

const clientID =  process.env.GOOGLE_OAUTHID;
const clientSecret =  process.env.GOOGLE_OAUTHSECRET;
const callback =  process.env.apiURL+'auth/google/callback';

const errorHandler = require('system/handlers/response').errorHandler;

passport.use(new GoogleStrategy({
        clientID: clientID,
        clientSecret: clientSecret,
        callbackURL: callback
    },
    function(accessToken, refreshToken, profile, cb) {

        oAuthService.oAuthLogin('google',profile).then((session) => {
            /* Pasamos la nueva sesión creada a callback */
            cb(null,session);
        }).catch((error) => {
            /* Si ha habido un error de autenticacion lo pasamos a callback */
            cb(null,error);
        })

    }
));

app.get('/', (req,res) => {
    res.json({provider : "google" , login_url : this.getURL() });
});


app.get('/login', passport.authenticate('google' , {scope: ['email','profile'], session:false}));

app.get('/callback',
    passport.authenticate('google', {scope : ['email','profile'], session: false }),
    (req, res) => {
        if(errorHandler.isError(req.user)){
            errorHandler.handleResponse(req.user,res);
        }else{
            res.send(req.user);
        }
    }
);

exports.getURL = () => {
    return "https://accounts.google.com/o/oauth2/v2/auth?" +
        "scope=email+profile" +
        "&access_type=offline" +
        "&state=state_parameter_passthrough_value" +
        "&redirect_uri=" + encodeURI(callback) +
        "&response_type=code" +
        "&client_id=" + clientID
};

exports.router = app;
