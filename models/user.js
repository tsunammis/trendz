/**
 * User object model.
 */
module.exports = function(db, conn) {
    var userSchema = new db.Schema({
        email    : String,
        password : String
    });
    
    return conn.model('User', userSchema);
};
