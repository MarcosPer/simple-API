/* Errores validacion */
/*
* v001 => No válido solo puede contener letras (a-z)
* v002 => Campo vacio
* v003 => No se ajusta a medidas de longitud
*
 */

exports.format_onlyLetters = { pattern: "[a-zA-z ]+", flags: "i", message: "is not valid (can only contain a-z)"};

exports.validation_name = {format: this.format_onlyLetters ,presence: true , length: {minimum: 3, maximun : 20}};