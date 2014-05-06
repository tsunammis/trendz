var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;
  
var statusSchema = new Schema({
    content     : String,
    createdAt   : { type: Date, default: Date.now },
    user        : { type: Schema.Types.ObjectId, ref: 'User' },
    project     : { type: Schema.Types.ObjectId, ref: 'Project' }
});

module.exports = mongoose.model('Status', statusSchema);