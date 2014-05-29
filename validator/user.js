var validator       = require('validator'),
    userService     = require('../services').User,
    stringValidator = require('./string'),
    errors          = require('./errors'),
    when            = require('when'),
    sequence        = require('when/sequence');

var email = function(email) {
    return sequence([
            stringValidator.isNotNull,
            stringValidator.isEmail
        ], email);
};

var password = function(password) {
    if (password.length < 3) {
        return when.reject(errors[5]);
    }
    if (password.length > 15) {
        return when.reject(errors[6]);
    }
    return when.resolve(password);
};

var emailExist = function(mail) {
    return userService.findReadOnlyByEmail(mail)
        .then(function(data) {
            if (data !== null) {
                return when.resolve(mail);
            }
            return when.reject(errors[7]);
        }, function(err) {
            return when.reject(errors[3]); 
        });
};

var emailNotExist = function(mail) {
    return userService.findReadOnlyByEmail(mail)
        .then(function(data) {
            if (data !== null) {
                return when.reject(errors[8]);   
            }
            return when.resolve(mail);
        }, function(err) {
            return when.reject(errors[3]); 
        });
};

var samePassword = function(password, confirmPassword) {
    if (password !== confirmPassword) {
        return when.reject(errors[9]);
    }
    return when.resolve(password);
};

module.exports = {
    email: email,
    password: password,
    emailExist: emailExist,
    emailNotExist: emailNotExist,
    samePassword: samePassword
};