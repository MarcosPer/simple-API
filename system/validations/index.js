Ajv = require('ajv');

const ajv = new Ajv();

fs = require('fs');


schemasFolder = 'system/validations/schemas/';

fs.readdir(schemasFolder, (err, files) => {
    files.forEach(file => {
        schemaName = file.split(".")[0];
        ajv.addSchema(require(schemasFolder + file),schemaName)
    });
})

module.exports = ajv;

