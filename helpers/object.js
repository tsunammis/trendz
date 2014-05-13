/**
 * Remove property from object
 *
 * @param {Array} properties - Property to remove
 * @param {Object} object
 */
var removeProperties = function(properties, object) {
    // @TODO See to use node callback
    if (!Array.isArray(properties)) {
        throw new Error('properties is not an array');
    }

    var length = properties.length;

    for (var i=0; i < length; i++) {

        if (!object.hasOwnProperty(properties[i])) {
            continue;
        }

        object[properties[i]] = undefined;
    }

    return object;
};

module.exports.removeProperties = removeProperties;