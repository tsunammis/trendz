var Status      = require('../models').Status,
    ObjectId    = require('mongoose').Types.ObjectId;

/**
 * Find status by ID.
 * The data return are Read Only (Plain Objet) instead of MongooseDocument
 *
 * @param {string} id
 */
var findReadOnlyById = function(id) {
    return Status
        .findOne({
            _id: new ObjectId(id)
        })
        .lean(true)
        .exec();
};

/**
 * Find status by UserID.
 * The data return are Read Only (Plain Objet) instead of MongooseDocument
 *
 * @param {string} userId
 */
var findReadOnlyByUserId = function(userId) {
    return Status
        .find({ 'owner': new ObjectId(userId) })
        .limit(20)
        .lean()
        .sort('-createdAt')
        .exec();
};

module.exports = {
    findReadOnlyById: findReadOnlyById,
    findReadOnlyByUserId: findReadOnlyByUserId
};