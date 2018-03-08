/**
 * Created by marcos on 20/11/17.
 */
const errorHandler = require('system/handlers/response').errorHandler;
const user_model = require('models/user');

exports.me =  (req,res) => {

    //Información a mostrar (privada)
    selection = ['user_id','email','display_name','avatar'];

    if (req.query.full !== undefined ) selection = selection.concat(['profile','name']);

    user_model.findOne({user_id : req.user_id} , selection ).then(user => {
        res.send(user);
    }).catch((error) => {
        errorHandler.handleResponse('e5301',res);
    });
};

exports.userID = (req,res) => {

    //Si se solicita el mismo perfil que el del usuario, redirigimos al /me
    if(req.params.user_id === req.user_id) return this.me(req,res);

    //Información a mostrar (publica)
    selection = ['user_id','display_name','avatar'];

    if (req.query.full !== undefined ) selection = selection.concat(['profile']);

    user_model.findOne({user_id : req.params.user_id} , selection ).then(user => {
        if(!user) return errorHandler.handleResponse('e4041',res);
        res.send(user);
    }).catch((error) => {
        errorHandler.handleResponse('e5301',res);
    });
};