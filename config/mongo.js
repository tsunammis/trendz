var mongoose            = require('mongoose'),
    Configuration       = require('../config/configuration.js');

module.exports = function() {

    mongoose.connect(Configuration.mongodb);
};