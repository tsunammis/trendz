var Configuration = require('../config/configuration.js');

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
 * @param {User} user
 */
var hateoasize = function(user) {

    user.links = [{
        'rel'   : 'self',
        'href'  : Configuration.getRootUrl() + '/users/' + user._id,
        'method': 'GET'
    }];

    return user;
};

module.exports.hiddenFields = hiddenFields;
module.exports.hateoasize   = hateoasize;
