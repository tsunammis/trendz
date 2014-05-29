var projectAdapter  = require('./project'),
    statusAdapter   = require('./status'),
    userAdapter     = require('./user');

module.exports = {
    Project: projectAdapter,
    Status: statusAdapter,
    User: userAdapter
};