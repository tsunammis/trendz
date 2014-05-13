var DefaultCtrl     = require('./default'),
    UsersCtr        = require('./users'),
    StatusCtrl      = require('./status'),
    ProjectCtrl     = require('./project');

module.exports = {
    Default: DefaultCtrl,
    User: UsersCtr,
    Status: StatusCtrl,
    Project: ProjectCtrl
};