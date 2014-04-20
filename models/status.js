var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;
  
var statusSchema = new Schema({
    content  : String,
    date     : { type: Date, default: Date.now },
    user     : { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Status', statusSchema);