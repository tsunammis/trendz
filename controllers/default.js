var _ = require('underscore');

/**
 * Error handler
 *
 * @param {Request}     request
 * @param {Response}    response
 * @param {function}    next
 */
var errorHandler = function(err, req, res, next) {
    res.status(err.status || 500);
    var error = _.isString(err) ? err : (_.isObject(err) ? err.message : 'Unknown Error');
    res.send(res.json({error: error}));
};

module.exports.errorHandler = errorHandler;