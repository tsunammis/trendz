var Configuration   = require('../config/configuration'),
    ArrayHelper     = require('../helpers/array'),
    _               = require('underscore');

/**
 * Add 'links' data to entity to respect the HATEOAS guidelines
 *
 * @param {array} types
 */
var hateoasize = function(types, user) {
    if (_.contains(types, 'self')) {
        ArrayHelper.pushToPropertyUnknow(user, 'links', {
            'rel'   : 'self',
            'href'  : Configuration.getRootUrl() + '/users/' + user._id,
            'method': 'GET'
        });
    }

    if (_.contains(types, 'status')) {
        ArrayHelper.pushToPropertyUnknow(user, 'links', {
            'rel'   : 'status',
            'href'  : Configuration.getRootUrl() + '/users/' + user._id + '/status',
            'method': 'GET'
        });
    }


    return user;
};

module.exports.hateoasize = hateoasize;