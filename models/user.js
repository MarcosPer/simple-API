const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const User = Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true , select : false, unique: true},
    user_id : { type: String, default : require('shortid').generate() , unique: true},
    roles : { type: String , enum : ['user', 'admin' , 'owner' , 'service'] , default : ['user'] },
    login : {
        password : { type: String },
        google : { type: String },
        facebook : { type: String }
    },
    name: {
            first : { type : String},
            last : {type : String},
    },
    display_name : { type: String },
    avatar : { type: String, default: "noneURL" },
    email :
    {
        address: { type: String , unique: true },
        verified: { type: Boolean, default: false}
    },
    profile : {
        bio : { type: String, maxlength: 2500 },
        city : { type: String },
        birthday : { date: { type: Date }, display : { type: Number } },
        join_date : { type: Date , default: Date.now() }
    },
    rating: {
        value : { type: Number , min: 0, max: 5 }, //El Number tambien almacena decimales
        count : { type: Number }
    },
    language: { type: String, maxlength:3 },
    push : [
        {
            service : { type : String },
            device : { type: String },
            token : { type: String },
            added : { type: String }
        }
    ],
    locale : { type: String }

});


module.exports = mongoose.model('users', User);
//module.exports = mongoose.model('user', Prod);
//module.exports = mongoose.model('user_profile', ProdUploadModel);