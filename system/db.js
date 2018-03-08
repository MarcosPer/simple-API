
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const connection = {
    useMongoClient: true,
    poolSize: 4
};

exports.connect = (config) => {
    mongoose.connect(config.db, connection , (err, res) => {
        if(err) {
            console.log(`MongoDB: ${err}`);
            process.exit();
        }else{
            console.log('MongoDB conectado correctamente')
        }
    });
};