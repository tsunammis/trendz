var validator       = require('validator'),
    UserService     = require('../services').User,
    when            = require('when'),
    sequence        = require('when/sequence'),
    stringValidator = require('./string'),
    Errors          = require('./errors');

var email = function(email) {
    return sequence([
            stringValidator.isNotNull,
            stringValidator.isEmail
        ], email);
};

var password = function(password) {
    if (password.length < 3) {
        return when.reject(Errors[5]);
    }
    if (password.length > 15) {
        return when.reject(Errors[6]);
    }
    return when.resolve(password);
};

var emailExist = function(mail) {
    return UserService.findReadOnlyByEmail(mail)
        .then(function(data) {
            if (data !== null) {
                return when.resolve(mail);
            }
            return when.reject(Errors[7]);
        }, function(err) {
            return when.reject(Errors[3]); 
        });
};

var emailNotExist = function(mail) {
    return UserService.findReadOnlyByEmail(mail)
        .then(function(data) {
            if (data !== null) {
                return when.reject(Errors[8]);   
            }
            return when.resolve(mail);
        }, function(err) {
            return when.reject(Errors[3]); 
        });
};

var samePassword = function(password, confirmPassword) {
    if (password !== confirmPassword) {
        return when.reject(Errors[9]);
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