var userService    = require('./user'),
    statusService  = require('./status'),
    projectService = require('./project');

module.exports = {
    User: userService,
    Status: statusService,
    Project: projectService
};