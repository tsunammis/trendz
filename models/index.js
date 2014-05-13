var mongoose        = require('mongoose'),
    user            = require('./user'),
    status          = require('./status'),
    project         = require('./project'),
    configuration   = require('../config/configuration');
    
var conn = mongoose.createConnection(configuration.mongodb);

module.exports = {
    User:     user(mongoose, conn),
    Status:   status(mongoose, conn),
    Project:  project(mongoose, conn)
};