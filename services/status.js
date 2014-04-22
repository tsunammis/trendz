var Status = require('../models/status');

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
        .sort('-date')
        .exec();
};

module.exports.findReadOnlyByUserId = findReadOnlyByUserId;
