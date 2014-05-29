var userValidator       = require('./user'),
    projectValidator    = require('./project'),
    stringValidator     = require('./string'),
    statusValidator     = require('./status'),
    errors              = require('./errors');

module.exports = {
    User: userValidator,
    Project: projectValidator,
    String: stringValidator,
    Status: statusValidator,
    Errors: errors
};