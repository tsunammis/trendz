var ProjectAdapter  = require('./project'),
    StatusAdapter   = require('./status'),
    UserAdapter     = require('./user');

module.exports = {
    Project: ProjectAdapter,
    Status: StatusAdapter,
    User: UserAdapter
};