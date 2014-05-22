var validator   = require('validator'),
    when        = require('when'),
    Errors      = require('./errors');

var isNotNull = function(value) {
    if (validator.isNull(value)) {
        return when.reject(Errors[10]);
    }
    return when.resolve(value);
};

var isEmail = function(mail) {
    if (mail !== null && mail.length > 0 && !validator.isEmail(mail)) {
        return when.reject(Errors[11]);
    }
    return when.resolve(mail);
};

var isSlug = function(slug) {
    if (slug !== null && slug.length > 0 && !slug.match(/^[a-z0-9-]+$/)) {
        return when.reject(Errors[12]);
    }
    return when.resolve(slug);
};

var isDocumentId = function(str) {
    if (!/^[0-9a-fA-F]{24}$/.test(str)) {
        return when.reject(Errors[13]);
    }
    return when.resolve(str);
};

module.exports = {
    isNotNull: isNotNull,
    isEmail: isEmail,
    isSlug: isSlug,
    isDocumentId: isDocumentId
};