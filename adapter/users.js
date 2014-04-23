var Configuration   = require('../config/configuration'),
    ArrayHelper     = require('../helpers/array');

/**
 * Hide data before exposing on Web services
 *
 * @param {User} user
 */
var hiddenFields = function(user) {

    user.password = undefined;
    user.__v = undefined;

    return user;
};

/**
 * Add 'links' data to entity to respect the HATEOAS guidelines
 *
 * @param {array} types
 */
var hateoasize = function(types, user) {

    if (-1 < types.indexOf('self')) {
        ArrayHelper.pushToPropertyUnknow(user, 'links', {
            'rel'   : 'self',
            'href'  : Configuration.getRootUrl() + '/users/' + user._id,
            'method': 'GET'
        });
    }

    if (-1 < types.indexOf('status')) {
        ArrayHelper.pushToPropertyUnknow(user, 'links', {
            'rel'   : 'status',
            'href'  : Configuration.getRootUrl() + '/users/' + user._id + '/status',
            'method': 'GET'
        });
    }


    return user;
};

/**
 * Add 'links' data to entity to respect the HATEOAS guidelines
 *
 * @param {User} user
 */
var hateoasizeSelf = function(user) {

    return hateoasize(['self'], user);
};

module.exports.hiddenFields     = hiddenFields;
module.exports.hateoasize       = hateoasize;
module.exports.hateoasizeSelf   = hateoasizeSelf;
