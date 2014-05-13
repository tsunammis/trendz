var User    = require('../models').User,
    when    = require('when');

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

/**
 * Find user by email.
 * The data return are Read Only (Plain Objet) instead of MongooseDocument
 *
 * @param {string} email
 */
var findReadOnlyByEmail = function(email) {
    return User
        .findOne({
            email: email
        })
        .lean(true)
        .exec();
};

module.exports = {
    findReadOnlyById:    findReadOnlyById,
    findReadOnlyByEmail: findReadOnlyByEmail
};
