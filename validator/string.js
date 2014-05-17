var validator   = require('validator'),
    when        = require('when');

var isNotNull = function(value) {
    if (validator.isNull(value)) {
        return when.reject({
            'name'      : 'string.not_null',
            'message'   : 'the string must be not null'
        });
    }
    return when.resolve();
};

var isEmail = function(mail) {
    if (mail !== null && mail.length > 0 && !validator.isEmail(mail)) {
        return when.reject({
            'name'      : 'email.format',
            'message'   : 'the email format is not valid'
        });
    }
    return when.resolve();
};

var isSlug = function(slug) {
    if (slug !== null && slug.length > 0 && !slug.match(/^[a-z0-9-]+$/)) {
        return when.reject({
            'name'      : 'string.slug',
            'message'   : 'the slug format is not valid'
        });
    }
    return when.resolve();
};

module.exports = {
    isNotNull: isNotNull,
    isEmail: isEmail,
    isSlug: isSlug
};