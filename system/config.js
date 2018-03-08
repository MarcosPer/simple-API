module.exports = {
    port: process.env.PORT || 3001,
    db: process.env.MONGODB_URI || 'mongodb://192.168.1.46:27017/nonlu',
    token_salt: 'miclavedetokens'
};