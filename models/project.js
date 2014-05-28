/**
 * Project object model.
 */
module.exports = function(db, conn) {
    var projectSchema = new db.Schema({
        name        : String,
        slug        : String,
        createdAt   : { type: Date, default: Date.now },
        updatedAt   : { type: Date, default: Date.now },
        owner       : { type: db.Schema.Types.ObjectId, ref: 'User' },
        users       : [{ type: db.Schema.Types.ObjectId, ref: 'User' }]
    });

    return conn.model('Project', projectSchema);
};
