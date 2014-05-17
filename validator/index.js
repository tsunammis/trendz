var UserValidator       = require('./user')
    ProjectValidator    = require('./project'),
    StringValidator     = require('./string');

module.exports = {
    User: UserValidator,
    Project: ProjectValidator,
    String: StringValidator
};