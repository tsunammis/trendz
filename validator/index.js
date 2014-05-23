var UserValidator       = require('./user')
    ProjectValidator    = require('./project'),
    StringValidator     = require('./string'),
    StatusValidator     = require('./status'),
    Errors              = require('./errors');

module.exports = {
    User: UserValidator,
    Project: ProjectValidator,
    String: StringValidator,
    Status: StatusValidator,
    Errors: Errors
};