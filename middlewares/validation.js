const { check, validationResult } = require('express-validator/check');


module.exports = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        const errorData = errors.mapped();
        errorsArray = [];
        Object.keys(errorData).forEach((key) => {
            //errorsArray.push({ param : errorData[key].param , error  : errorData[key].msg  });
            errorsArray.push(errorData[key].param +': '+ errorData[key].msg );
        });
        return res.status(422).send({error: 402, error_msg : "invalid params" , errors: errorsArray});
    }
    next();
};

module.exports.check = check;