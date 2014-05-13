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

module.exports = {
    findReadOnlyById: findReadOnlyById
};