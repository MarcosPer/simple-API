/**
 * Created by marcos on 20/11/17.
 */
const errorHandler = require('system/handlers/response').errorHandler;
const user_model = require('models/user');
const schema = require('./schema');
const validate = require('validate.js');

module.exports = (req,res) =>{
    const saveData = {};
    const processed = {};
    const result = { errors : {}, warns : {}};
    Object.keys(req.body).every( (value) => {
        //Comprobar si la key existe y es editable
        if(schema[value] === undefined || !schema[value].editable){
            result.errors[value] = ["is invalid param"];
            return false;
        }

        //Aplicamos el trim si procede
        if(schema[value].trim !== undefined && schema[value].trim) req.body[value] = req.body[value].trim();
        //Aplicamos el capitalize si procede
        if(schema[value].capitalize !== undefined && schema[value].capitalize) req.body[value] = req.body[value].charAt(0).toUpperCase() + req.body[value].slice(1);

        // Validación de los datos
        if(schema[value].validation !== undefined){
            error = validate.single(req.body[value],schema[value].validation);
            if(error !== undefined && error.size !== 0){
                if(schema[value].default === undefined){
                    result.errors[value] = error;
                    return false
                }
                result.warns.value = [req.body[value]+" is invalid for "+value+" set by default to: "+schema[value].default];
                req.body[value] = schema[value].default;
            }
        }

        //Marcamos este elemento como procesado
        processed[value] = true;


        //Si requiere elementos y no estan procesados los marcamos como no procesados
        if(schema[value].required !== undefined){
            schema[value].required.every( (val) => {
                if(!processed[val]){
                    processed[val] = false;
                }
            })
        }

        //Si hay update especifico, lo aplicamos
        if(schema[value].update !== undefined){
            try {
                schema[value].update(req.body[value],saveData);
                return true;
            }
            catch(err) {
                //Si el update falla
                result.errors[value] = [err];
                return false;
            }
        }

        //Guardar para actualizar
        if(schema[value].path !== undefined){
            saveData[schema[value].path] = req.body[value];
            return true;
        }

        result.errors[value] = ["is invalid param"];
        return false;

    });

    //Comprobar si hay algun dato que no se ha procesado
    Object.keys(processed).every( (value) => {
        if(!processed[value]){ result.errors[value] = ['is required by other element']; return false;}
        return true;
    });


    if(Object.keys(result.errors).length > 0) return errorHandler.handleResponseError("e4002",res,result.errors);

    result.status = "correcto actualizados los datos";
    //Finalizamos guardandolo en mongo.
    user_model.update({user_id : req.user_id},saveData).then((user) => {
        return res.send(result);
    }).catch((error) => {
        return errorHandler.handleResponse("e5031",res);
    });



};


