var mongoose = require('mongoose'),
    bcrypt   = require('bcrypt-nodejs'),
    Schema   = mongoose.Schema;

var userSchema = new Schema({
    email    : String,
    password : String
});

/**
 * Generating a hash
 *
 * @param {string} password
 * @returns {string}
 */
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

/**
 * Checking if password is valid
 *
 * @param {string} password
 * @returns {boolean}
 */
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);