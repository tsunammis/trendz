var Project = require('../models').Project;

/**
 * Find project by ID.
 * The data return are Read Only (Plain Objet) instead of MongooseDocument
 *
 * @param {string} id
 */
var findReadOnlyById = function(id) {
    return Project
        .findOne({
            _id: id
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

module.exports = {
    findReadOnlyById: findReadOnlyById,
    findReadOnlyBySlug: findReadOnlyBySlug
};