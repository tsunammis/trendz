var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    User     = require('./user');
  
var projectSchema = new Schema({
    name        : String,
    slug        : String,
    createdAt   : { type: Date, default: Date.now },
    users       : [ Schema.Types.ObjectId ]
});

module.exports = mongoose.model('Project', projectSchema);