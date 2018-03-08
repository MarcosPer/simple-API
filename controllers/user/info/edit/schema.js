

const validations = require("./validations");

module.exports =
{

    'firstname' : { editable: true, trim: true, capitalize: true, required : ['lastname'], validation : validations.validation_name , update : (value,saveData) => {
            if(saveData.display_name === undefined) saveData.display_name = "";

            saveData.display_name = value.split(" ")[0] + " " + saveData.display_name;
            saveData['name.first'] = value;
            return true;
        }
    },
    'lastname' : { editable: true, trim: true, capitalize: true, required : ['firstname'], validation : validations.validation_name , update : (value,saveData) => {
            if(saveData.display_name === undefined) saveData.display_name = "";

            saveData.display_name = saveData.display_name + value.substring(0, 1)+".";
            saveData['name.last'] = value;
            return true;
        }
    },
    'bio' : { path: "profile.bio" , editable: true, trim: true},
    'birthday' : { editable: true , update : (value,saveData) => {
            DateTime = require('luxon').DateTime;
            fecha = DateTime.fromISO(value).toISODate();
            if(fecha){
                saveData['profile.birthday.date'] = fecha;
                return true;
            }
            throw "invalid date";
        }
    },
    'birthday_display' : {editable : true, path : 'profile.birthday.display' , validation : {numericality: { notGreaterThan: 4,notLessThan: 0}}}, // del 0-4 para display
    'config_language' : {editable : true, path : 'language', validation : { inclusion : ['es','en']}, default: 'en'}
    
};