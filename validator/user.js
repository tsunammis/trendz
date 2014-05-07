var validator = require('validator');

var schemaValidator = [];

schemaValidator.email = function(email) {

    if (!validator.isEmail(email)) {
        return {
            'name'      : 'user.email',
            'message'   : 'the email format is not valid'
        };
    }

    return null;
};

module.exports.schemaValidator = schemaValidator;