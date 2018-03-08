const router = require('express').Router();
const validate = require('middlewares/validation');
const check = validate.check;
const errorHandler = require('system/handlers/response').errorHandler;
const successHandler = require('system/handlers/response').successHandler;

const request_validations  = [
    check('old_password').exists(),
    check('new_password').exists().isLength({ min: 5 }).withMessage('new password must be more than 5 characters'),
    check('new_password').custom((value, {req}) => { return value !== req.body.old_password }).withMessage('new password cannot be same as old password')
];

router.post('/',request_validations,validate, (req,res) => {
    const user_tools = require('services/user_tools');

    user_tools.checkPassword(req.user_id,req.body.old_password).then((result) => {
        //Contraseña inválida
        if(!result) throw 'e4011';

        return user_tools.changePassword(req.user_id,req.body.new_password);

    }).then((result) => {
        if(result){ return successHandler.responseOk(res) }

        throw "e8000";

    }).catch((error) => {
        errorHandler.handleResponse(error,res);
    })
});

module.exports = router;