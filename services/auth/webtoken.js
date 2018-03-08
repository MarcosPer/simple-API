const config = require('system/config');
const jwt = require('jwt-simple');
const moment = require('moment');

exports.createToken = (userID,lang) =>  {

    const tokenExpire = moment().add(20, 'days').unix();
    const payload = {
        sub: userID,
        lang: "es",
        iat: moment().unix(),
        exp: tokenExpire
    };

    return { token : jwt.encode(payload, config.token_salt) , expire : tokenExpire };
};

exports.decodeToken = (token) => {
    return new Promise((resolve, reject) => {
        try {
            const payload = jwt.decode(token, config.token_salt);

            if (payload.exp <= moment().unix()) {
                reject("e4014");
            }
            resolve({user_id: payload.sub, language: payload.lang});
        } catch (err) {
            reject("e4013")
        }
    });
};