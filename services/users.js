var User = require('../models/user');

/**
 * Find user by ID.
 * The data return are Read Only (Plain Objet) instead of MongooseDocument
 *
 * @param {string} id
 */
var findReadOnlyById = function(id) {

    return User
        .findOne({
            _id: id
        })
        .lean(true)
        .exec();
};

module.exports.findReadOnlyById = findReadOnlyById;
