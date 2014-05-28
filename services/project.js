var Project     = require('../models').Project,
    ObjectId    = require('mongoose').Types.ObjectId;

/**
 * Find project by ID.
 * The data return is a MongooseDocument
 *
 * @param {string} id
 * @return {MongooseDocument}
 */
var findById = function(id) {
    return Project
        .findOne({
            _id: new ObjectId(id)
        })
        .exec();
};

/**
 * Find project by ID.
 * The data return are Read Only (Plain Objet) instead of MongooseDocument
 *
 * @param {string} id
 */
var findReadOnlyById = function(id) {
    return Project
        .findOne({
            _id: new ObjectId(id)
        })
        .lean(true)
        .exec();
};

/**
 * Find project by Slug.
 * The data return are Read Only (Plain Objet) instead of MongooseDocument
 *
 * @param {string} slug
 */
var findReadOnlyBySlug = function(slug) {
    return Project
        .findOne({
            slug: slug
        })
        .lean(true)
        .exec();
};

/**
 * Find projects by user.
 * The data return are Read Only (Plain Objet) instead of MongooseDocument
 *
 * @param {string} userId
 * @param {string} select (Optional)
 */
var findReadOnlyByUser = function(userId, select) {

    var query = Project
        .find({})
        .where('users').in([new ObjectId(userId)])
        .lean(true)
        .sort('-updatedAt');

    if (select) {
        query.select(select);
    }

    return query.exec();
};

module.exports = {
    findById: findById,
    findReadOnlyById: findReadOnlyById,
    findReadOnlyBySlug: findReadOnlyBySlug,
    findReadOnlyByUser: findReadOnlyByUser
};