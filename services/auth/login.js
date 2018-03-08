

exports.doLogin = (options) => {
    /**
     *
     * @provider provedor de autenticación
     * @id => identificador de provedor
     * @email => opcional para autenticador local
     */

    return new Promise((resolve,reject) => {
        const user_model = require("models/user");


        if(options.provider){
            switch (options.provider){
                case 'google':
                case 'facebook':

                    user_model.findOne({ ['login.'+options.provider] : options.id}, ['user_id','language'])
                    .then((user) => {
                        if (!user) throw "e4041";
                        resolve(getToken(user.user_id,user.language));
                    }).catch((error) => {reject(error)});

                    break;
                case 'password':

                    user_model.findOne({email : options.email },['user_id','login','language'])
                    .then((user) => {
                        if(!user) throw "e4041";
                        if(!user.login.password) throw "e4042";

                        user_id = user.user_id;
                        language = user.language;
                        const bcrypt = require('bcrypt');
                        return bcrypt.compare(options.id, user.login.password);
                    }).then((result) => {
                        if(result){
                            resolve(getToken(user_id,language));
                        }else{
                            throw "e4011";
                        }
                    }).catch((error) => { console.log(error); reject(error)});
                    break;
                default:
                    reject("e4001");
                    break;
            }
        }
    });
};

getToken= (userID) => {
    const web_token = require("services/auth/webtoken");
    const token = web_token.createToken(userID);
    return {
        logged: true,
        expire: token.expire,
        token: token.token
    };
};