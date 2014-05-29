var defaultCtrl     = require('./default'),
    usersCtr        = require('./users'),
    statusCtrl      = require('./status'),
    projectCtrl     = require('./project');

module.exports = {
    Default: defaultCtrl,
    User: usersCtr,
    Status: statusCtrl,
    Project: projectCtrl
};