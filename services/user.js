var User        = require('../models').User,
    ObjectId    = require('mongoose').Types.ObjectId,
    when        = require('when');

/**
 * Find user by ID.
 * The data return are a MongooseDocument
 *
 * @param {string} id
 * @return {MongooseDocument}
 */
var findById = function(id) {
    return User
        .findOne({
            _id: new ObjectId(id)
        })
        .exec();
};

/**
 * Find user by ID.
 * The data return are Read Only (Plain Objet) instead of MongooseDocument
 *
 * @param {string} id
 */
var findReadOnlyById = function(id) {
    return User
        .findOne({
            _id: new ObjectId(id)
        })
        .lean(true)
        .exec();
};

/**
 * Find user by list of IDs.
 * The data return are Read Only (Plain Objet) instead of MongooseDocument
 *
 * @param {array} ids
 */
var findReadOnlyByIds = function(ids, select) {

    var query = User
        .find({})
        .where('_id').in(ids)
        .lean(true)
        .sort('email');

    if (select) {
        query.select(select);
    }

    return query.exec();
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
    findById: findById,
    findReadOnlyById: findReadOnlyById,
    findReadOnlyByIds: findReadOnlyByIds,
    findReadOnlyByEmail: findReadOnlyByEmail
};
