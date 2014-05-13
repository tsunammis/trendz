var UserService    = require('./user'),
    StatusService  = require('./status'),
    ProjectService = require('./project');

module.exports = {
    User: UserService,
    Status: StatusService,
    Project: ProjectService
};