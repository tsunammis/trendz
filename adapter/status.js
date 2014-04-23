var Configuration   = require('../config/configuration'),
    ArrayHelper     = require('../helpers/array');

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
var hateoasize = function(types, status) {

    if (-1 < types.indexOf('self')) {
        ArrayHelper.pushToPropertyUnknow(status, 'links', {
            'rel'   : 'self',
            'href'  : Configuration.getRootUrl() + '/status/' + status._id,
            'method': 'GET'
        });
    }

    return status;
};

/**
 * Add 'links' data to entity to respect the HATEOAS guidelines
 *
 * @param {Status} status
 */
var hateoasizeSelf = function(status) {

    return hateoasize(['self'], status);
};

module.exports.hiddenFields     = hiddenFields;
module.exports.hateoasize       = hateoasize;
module.exports.hateoasizeSelf   = hateoasizeSelf;
