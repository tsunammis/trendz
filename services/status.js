var Status      = require('../models').Status,
    ObjectId    = require('mongoose').Types.ObjectId;

/**
 * Find status by ID.
 * The data return are Read Only (Plain Objet) instead of MongooseDocument
 *
 * @param {string} id
 */
var findOneReadOnlyById = function(id, select) {
    var query = Status
        .findOne({
            _id: new ObjectId(id)
        })
        .lean(true);

    if (select) {
        query.select(select);
    }

    return query.exec();
};

/**
 * Find status by UserID.
 * The data return are Read Only (Plain Objet) instead of MongooseDocument
 *
 * @param {string} userId
 */
var findReadOnlyByUserId = function(userId, select) {
    var query = Status
        .find({ 'owner': new ObjectId(userId) })
        .limit(20)
        .lean()
        .sort('-createdAt');

    if (select) {
        query.select(select);
    }

    return query.exec();
};

/**
 * Find status by ProjectID.
 * The data return are Read Only (Plain Objet) instead of MongooseDocument
 *
 * @param {string} projectId
 */
var findReadOnlyByProjectId = function(projectId, select) {
    var query = Status
        .find({ 'project': new ObjectId(projectId) })
        .limit(20)
        .lean()
        .sort('-createdAt');

    if (select) {
        query.select(select);
    }

    return query.exec();
};

module.exports = {
    findOneReadOnlyById: findOneReadOnlyById,
    findReadOnlyByUserId: findReadOnlyByUserId,
    findReadOnlyByProjectId: findReadOnlyByProjectId
};