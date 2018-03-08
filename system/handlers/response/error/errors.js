module.exports = {

    //RegExp for validate e[0-9]{4,6}
    //errorCode.matches(/e[0-9]{4,6}$/)


    //External erros
    e5031 : { http: 503, msg: "database error"},

    //Not found errors
    e4041 : { http: 404, msg: "user not found"},
    e4042 : { http: 404, msg: "user has not login methods"},

    //Malformed errors
    e4001 : { http: 400, msg: "undefined login provider. contact with support"},
    e4002 : { http: 400, msg: "bad request params"},

    //Auth errors (unauthorized)
    e4011 : { http: 401, msg: "invalid password"},
    e4012 : { http: 401, msg: "user token needed"},
    e4013 : { http: 401, msg: "invalid user token"},
    e4014 : { http: 401, msg: "expired user token"},
    e4015 : { http: 401, msg: "expired user token"},


    //Conflicts errors
    e4091 : { http: 409, msg: "email already registered"},

    //Internal errrors
    e8000 : {http: 500, msg: "undefined internal server error"},

    e8001 : {http: 500, msg: "doRegister invalid profile" , hide_msg: true},
    e8002 : {http: 500, msg: "error hashing password" , hide_msg: true},
    e8003 : {http: 500, msg: "welcomemail invalid options" , hide_msg: true},
    e8004 : {http: 500, msg: "passwordchangemail invalid options" , hide_msg: true},


};