exports.handleResponseError = (errorCode,response,errors) => {

    if(!this.isError(errorCode)) errorCode = "e8000";

    res = { status : 500 , err : {error: errorCode, msg : "undefined error"}};

    error = require('./errors')[errorCode];

    if(error.http) res.status = error.http;
    if(!error.hide_msg) res.err.msg = error.msg;

    if(process.env.debug){
        log = require('log-utils');
        console.log(log.info + ' [DEBUG] Error ' + errorCode + ' '+error.msg);
    }

    if(errors !== undefined) res.err.errors = errors;
    response.status(res.status).send(res.err);
};
exports.handleResponse = (errorCode,response) => {
    if(!this.isError(errorCode)) errorCode = "e8000";

    res = { status : 500 , err : {error: errorCode, msg : "undefined error"}};

    error = require('./errors')[errorCode];

    if(error.http) res.status = error.http;
    if(!error.hide_msg) res.err.msg = error.msg;

    if(process.env.debug){
        log = require('log-utils');
        console.log(log.info + ' [DEBUG] Error ' + errorCode + ' '+error.msg);
    }

    response.status(res.status).send(res.err);
};
exports.responseError = (response) =>{
  this.handleResponse('e8000',response);
};
exports.isError = (error) => {
    return typeof error === 'string' && error.match(/e[0-9]{4,6}$/);
};