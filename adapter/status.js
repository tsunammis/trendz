var Configuration = require('../config/configuration.js');

/**
 * Hide data before exposing on Web services
 *
 * @param {Status} status
 */
var hiddenFields = function(status) {

    status.__v = undefined;

    return status;
};

/**
 * Add 'links' data to entity to respect the HATEOAS guidelines
 *
 * @param {Status} status
 */
var hateoasize = function(status) {

    status.links = [{
        'rel'   : 'self',
        'href'  : Configuration.getRootUrl() + '/status/' + status._id,
        'method': 'GET'
    }];

    return status;
};

module.exports.hiddenFields = hiddenFields;
module.exports.hateoasize   = hateoasize;
