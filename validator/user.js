var validator   = require('validator'),
    UserService = require('../services').User,
    when        = require('when');

var email = function(mail) {
    if (!validator.isEmail(mail)) {
        return when.reject({
            'name'      : 'user.email',
            'message'   : 'the email format is not valid'
        });
    }
    
    return when.resolve();
};

var emailExist = function(mail) {
    return UserService.findReadOnlyByEmail(mail)
        .then(function(data) {
            if (data !== null) {
                return when.reject({
                    'name'      : 'user.email.already_exist',
                    'message'   : 'this email is already registered'
                });   
            }
            
            return when.resolve();
        }, function(err) {
            return when.reject({
                'name'      : 'connection.error',
                'message'   : 'Error durring connection with mongo'
            }); 
        });
};

var password = function(password) {
    if (password.length < 3) {
        return when.reject({
            'name'      : 'user.password.length.too_short',
            'message'   : 'the password\'s length is too short (3 min caracters)'
        });
    }
    
    if (password.length > 15) {
        return when.reject({
            'name'      : 'user.password.length.too_long',
            'message'   : 'the password\'s length is too long (15 caracters max)'
        });
    }
    
    return when.resolve();
};

module.exports = {
    email: email,
    emailExist: emailExist,
    password: password
};