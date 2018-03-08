module.exports = {
    type: 'object',
    required: ["name", "email","password","language"],
    properties: {
        name: {type: 'string'},
        email: {type: 'string', format: 'email'},
        password: {type: 'string'},
        language: {type: 'string' /*, language : true*/}
    }
};