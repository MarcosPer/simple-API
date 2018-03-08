const web_token = require('services/auth/webtoken');

const errorHandler = require('system/handlers/response').errorHandler;

module.exports = (req, res, next) => {

    /* Capturar el token del header */
    if (!req.headers.authorization) {
        return errorHandler.handleResponse("e4012",res);
    }

    const token = req.headers.authorization.split(' ')[1];

    web_token.decodeToken(token)
        .then((userID) => {
            req.user_id = userID;
            next()
        })
        .catch((error) => {
            return errorHandler.handleResponse(error,res);
        })
};

