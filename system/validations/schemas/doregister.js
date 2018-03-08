module.exports = {
    type: 'object',
    required: ["email", "firstName"],
    properties: {
        firstName: {type: 'string'},
        lastName: {type: 'string'},
        email: {type: 'string', format: 'email'},
        login: {
            type: 'object',
            properties: {
                provider: {enum: ['google', 'facebook', 'password']},
                id: {type: 'string'}
            }
        },
        language: {type: 'string'}
    }
};