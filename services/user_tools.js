/**
 * Created by marcos on 15/11/17.
 */
const bcrypt = require('bcrypt');
const user_model = require("models/user");


exports.getUserIDfromEmail = (email) => {

    return  user_model.user.findOne({'email': email}, 'user_id' )
        .then((user) => {
            return new Promise((resolve, reject) => {
                if (!user) throw "e4041";
                return resolve(user.user_id);
            });
        })
};
exports.checkPassword = (user_id,password) => {

    return user_model.findOne({user_id : user_id },['login']).then((user) => {
        if(!user) throw "e4041";
        if(!user.login.password) throw "e4042";

        return bcrypt.compare(password, user.login.password);
    });

    //Devuelve true o false
};

exports.changePassword = (user_id,newpassword) => {
    return updatePassword(user_id,newpassword,'change');
};

exports.resetPassword = (user_id) => {
    const password_gen = require('generate-password');
    newpassword = password_gen.generate({
        length: 10,
        numbers: true
    });

    return updatePassword(user_id,newpassword,'reset');
};

updatePassword = (user_id,newpassword,type) => {

    return bcrypt.hash(newpassword,10).then((hash,err) => {
        if (err) throw 'e8002';

        return user_model.update({user_id : user_id},{login : {password : hash}});
    }).then((user,err) => {
        if(err) throw 'e5301';

        if(type === 'change'){
            console.log("async email change notification for user (password change)");
        }else{
            console.log("async email change notification for user (password reset)");
        }

        return Promise.resolve(true);
    });
};