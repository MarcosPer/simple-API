exports.doRegister = (profile) => {
    /**
     * profileSchema
     *
     * firstName
     * lastName
     * email
     * login.provider
     * login.id
     */
    return new Promise((resolve,reject) => {
        const ajv = require("system/validations");


        if(!ajv.validate('doregister',profile)){
            console.log("error e8001");
            return reject("e8001");
        }

        const user_model = require("models/user");

        switch (profile.login.provider) {
            case 'password':
                /* Comprobar si existe el mail  */
                    user_model.findOne({email : profile.email}).then((user,error) => {
                        if(error){ throw "e5301";  }
                        if(user){ throw "e4091"; }
                        const bcrypt = require('bcrypt');
                        return bcrypt.hash(profile.login.id,10);
                    })
                    .then((hash,err) => {
                        if (err){ throw "e8002"; }
                        profile.login.id = hash;
                        return createUser(profile);
                    })

                    //.then(() => { return createLogin(profile)})
                    .then(() => { return resolve({status: "ok", user_id : profile.user_id})})
                    .catch((error) => {return reject(error)});
                break;
            case 'google':
            case'facebook':
                //TODO: comprobar si existe este login
                createUser(profile)
                //.then(() => { return createLogin(profile)})
                .then(() => { return resolve({status: "ok", user_id : profile.user_id})})
                .catch((error) => {reject(error)});
                break;
            default :
                return reject({message: "doRegister: Undefined provider"});
        }
    }).then((status) => {
        console.log("async email user registered");
        return {
            user_id : profile.user_id,
            created : true
        };
    })
};

createUser = (profile) =>{
    const user_model = require("models/user");

    //idioma por defecto
    if(profile.language === undefined){
        profile.language = "en";
    }

    return user_model.create(
        {
            'name.first' : profile.firstName,
            'name.last' : profile.lastName,
            'email.address' : profile.email,
            'display_name' : profile.firstName.split(' ')[0] + " " + profile.lastName.substring(0, 1)+".",
            'login' : {
                [profile.login.provider] : profile.login.id
            },
            'language' : profile.language
        }).then(user => {
            //Guardamos la id del usuario
            profile.user_id = user.user_id;
        }).catch(error => {
            console.log(error);
            if(error.code = 11000){
                throw "e4091";
            }else{
                throw "e5031";
            }
        });

};

createLogin = (profile) => {
    const user_model = require("models/user");
    return new Promise((resolve, reject) => {
        user_model.create({user_id: profile.user_id, 'provider.name': profile.login.provider, 'provider.profile': profile.login.id
        }, (dberr, user) => {
            if (dberr) return reject("e5031");
            return resolve();
        })
    })
};

