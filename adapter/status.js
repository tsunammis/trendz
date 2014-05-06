var Configuration   = require('../config/configuration'),
    ArrayHelper     = require('../helpers/array'),
    _               = require('underscore');

/**
 * Add 'links' data to entity to respect the HATEOAS guidelines
 *
 * @param {Status} status
 */
var hateoasize = function(types, status) {

    if (_.contains(types, 'self')) {
        ArrayHelper.pushToPropertyUnknow(status, 'links', {
            'rel'   : 'self',
            'href'  : Configuration.getRootUrl() + '/status/' + status._id,
            'method': 'GET'
        });
    }

    return status;
};

module.exports.hateoasize = hateoasize;