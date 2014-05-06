var mongoose            = require('mongoose'),
    Configuration       = require('../config/configuration');

module.exports = function() {

    mongoose.connect(Configuration.mongodb);
};