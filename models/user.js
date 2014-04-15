var mongoose = require('mongoose'),
    bcrypt   = require('bcrypt-nodejs'),
    Schema   = mongoose.Schema;

var userSchema = Schema({
    email    : String,
    password : String
});

// Generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);