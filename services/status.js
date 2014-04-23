var Status = require('../models/status');

/**
 * Find status by ID.
 * The data return are Read Only (Plain Objet) instead of MongooseDocument
 *
 * @param {string} id
 */
var findReadOnlyById = function(id) {

    return Status
        .findOne({
            _id: id
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
        .find({ user: userId })
        .limit(20)
        .lean()
        .sort('-date')
        .exec();
};

module.exports.findReadOnlyById     = findReadOnlyById;
module.exports.findReadOnlyByUserId = findReadOnlyByUserId;