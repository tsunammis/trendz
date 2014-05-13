/**
 * Project object model.
 */
module.exports = function(db, conn) {
    var projectSchema = new db.Schema({
        name        : String,
        slug        : String,
        createdAt   : { type: Date, default: Date.now },
        users       : [ db.Schema.Types.ObjectId ]
    });

    return conn.model('Project', projectSchema);
};
