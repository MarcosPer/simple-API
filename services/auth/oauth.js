const LoginService = require('services/auth/login');
const RegisterService = require('services/auth/register');

exports.oAuthLogin = (provider,profile) => {

    return new Promise((resolve,reject) => {
        const loginConfig = { provider: provider , id : profile.id};
        /* Intentar logear */
        LoginService.doLogin(loginConfig).then((res) => {
            /* Usuario logeado */
            resolve(res);
        }).catch((err) => {
            if(err = "e4041"){
                /* En caso de que no exista el usuario, lo creamos */

                const userdata = {
                    firstName : profile.name.givenName,
                    lastName: profile.name.familyName,
                    email: profile.emails[0].value,
                    login: {
                        provider : provider,
                        id: profile.id
                    }
                };
                /* Google nos dice cual es el lenguaje del usuario ¡Que suerte!*/
                if (provider = "google"){
                     userdata.language = profile._json.language;
                }

                RegisterService.doRegister(userdata).then((userID) => {
                    /* Añadir otra promise para avatar */
                    return LoginService.doLogin(loginConfig);
                }).then((res) => {
                    /* Indicar que el usuario es de nueva creación y responder al usuario */
                    res.created = true;
                    resolve(res);
                }).catch((error) =>{
                    /* Otros errores */
                    reject(error);
                });
            }else{
                /* Otros errores */
                reject(err);
            }
        });
    });
};