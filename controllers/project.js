var Project             = require('../models').Project,
    projectAdapter      = require('../adapter').Project,
    statusService       = require('../services').Status,
    projectService      = require('../services').Project,
    userService         = require('../services').User,
    httpErrors          = require('../helpers/http.errors'),
    objectHelper        = require('../helpers/object'),
    projectValidator    = require('../validator').Project,
    stringValidator     = require('../validator').String,
    errors              = require('../validator').Errors,
    _                   = require('underscore'),
    when                = require('when');

/**
 * POST  /project
 *
 * Parameters:
 *  - name | Min length: 2 and max length: 30
 *  - slug | Me be respect this regex /^[a-z0-9-_]+$/
 *  - owner | Id of the owner of the project
 */
var create = function(req, res, next) {

    var data = req.body,
        user = req.user;

    projectValidator.name(data.name)
        .then(function() {
            return projectValidator.slug(data.slug);
        })
        .then(function() {
            return projectValidator.slugNotExist(data.slug);
        })
        .then(function() {
            return Project.create({
                name: data.name,
                slug: data.slug,
                owner: user._id,
                users: [user._id]
            });
        })
        .then(function(project) {
            project = project.toObject();
            project = objectHelper.removeProperties(['__v'], project);
            project = projectAdapter.hateoasize(['self'], project);
            res
                .contentType('application/json')
                .send(201, JSON.stringify(project));
        })
        .then(null, function(err) {
            if (_.has(err, 'code')) {
                return next(new httpErrors.BadRequest(err.message, err.code));
            } else if (_.has(err, 'name') && err.name === 'CastError') {
                return next(new httpErrors.BadRequest(errors[13].message, errors[13].code));
            }
            return next(err);
        });
};

/**
 * PUT  /project/:id
 *
 * Parameters:
 *  - name | Min length: 2 and max length: 30
 *  - slug | Me be respect this regex /^[a-z0-9-_]+$/
 */
var update = function(req, res, next) {

    var changes = req.body,
        project = null;

    stringValidator.isDocumentId(req.params.id)
        .then(function(id) {
            return projectService.findOneById(id);
        })
        .then(function(p) {

            // Use variable inside different then()
            project = p;

            // Check if the project doesn't exist
            if (!project) {
                return when.reject(new httpErrors.NotFound(errors[18].message, errors[18].code));
            }

            var projectOld = project.toObject();

            // User is able to access this project
            // @Todo Use request to mongo to determine ability
            var isAble = _.find(project.users, function(userId) {
                return userId.toString() === req.user._id.toString();
            });

            if (!isAble) {
                return when.reject(new httpErrors.Forbidden(errors[19].message, errors[19].code));
            }

            // Update object with changes
            Object.keys(changes).forEach(function(key) {
                project.set(key, changes[key]);
            });

            // Check if the project has been modified
            if (objectHelper.areEqual(projectOld, project.toObject())) {
                return when.resolve(project);
            }

            return projectValidator.name(project.name);
        })
        .then(function() {
            return projectValidator.slug(project.slug);
        })
        .then(function() {
            return projectService.findOneReadOnlyBySlug(project.slug);
        })
        .then(function(obj) {
            if (obj && obj._id !== project._id) {
                return when.reject(errors[4]);
            } else {
                return when.resolve(project);
            }
        })
        .then(function() {
            project.set('updatedAt', Date.now);
            return project.save();
        })
        .then(function() {
            var projectJson = project.toObject();
            projectJson = objectHelper.removeProperties(['__v'], projectJson);
            projectJson = projectAdapter.hateoasize(['self'], projectJson);
            res
                .contentType('application/json')
                .send(200, JSON.stringify(projectJson));
        })
        .then(null, function(err) {
            if (_.has(err, 'code') && !(err instanceof httpErrors.NotFound) && !(err instanceof httpErrors.Forbidden)) {
                return next(new httpErrors.BadRequest(err.message, err.code));
            } else if (_.has(err, 'name') && err.name === 'CastError') {
                return next(new httpErrors.BadRequest(errors[13].message, errors[13].code));
            }
            return next(err);
        });
};

/**
 * GET  /project/:id
 */
var show = function(req, res, next) {
    stringValidator.isDocumentId(req.params.id)
        .then(function(id) {
            return projectService.findOneReadOnlyById(id);
        })
        .then(function(project) {

            if (!project) {
                return when.reject(new httpErrors.NotFound(errors[18].message, errors[18].code));
            }

            // User is able to access this project
            // @Todo Use request to mongo to determine ability
            var isAble = _.find(project.users, function(userId) {
                return userId.toString() === req.user._id.toString();
            });

            if (!isAble) {
                return when.reject(new httpErrors.Forbidden(errors[19].message, errors[19].code));
            }

            project = objectHelper.removeProperties(['__v'], project);
            project = projectAdapter.hateoasize(['self'], project);
            res
                .contentType('application/json')
                .send(JSON.stringify(project));
        })
        .then(null, function(err) {
            if (_.has(err, 'code') && !(err instanceof httpErrors.NotFound) && !(err instanceof httpErrors.Forbidden)) {
                return next(new httpErrors.BadRequest(err.message, err.code));
            } else if (_.has(err, 'name') && err.name === 'CastError') {
                return next(new httpErrors.BadRequest(errors[13].message, errors[13].code));
            }
            return next(err);
        });
};

/**
 * DELETE  /project/:id
 */
var remove = function(req, res, next) {
    stringValidator.isDocumentId(req.params.id)
        .then(function(id) {
            return projectService.findOneReadOnlyById(id);
        })
        .then(function (project) {
            if (!project) {
                return when.reject(new httpErrors.NotFound(errors[18].message, errors[18].code));
            }
            // Check if the user is the owner
            if (project.owner.toString() !== req.user._id.toString()) {
                return when.reject(new httpErrors.Forbidden(errors[22].message, errors[22].code));
            }
            return projectService.removeById(project._id);
        })
        .then(function() {
            return statusService.removeByProject(req.params.id);
        })
        .then(function() {
            res
                .contentType('application/json')
                .status(200)
                .send();
        })
        .then(null, function(err) {
            if (_.has(err, 'code') && !(err instanceof httpErrors.NotFound) && !(err instanceof httpErrors.Forbidden)) {
                return next(new httpErrors.BadRequest(err.message, err.code));
            } else if (_.has(err, 'name') && err.name === 'CastError') {
                return next(new httpErrors.BadRequest(errors[13].message, errors[13].code));
            }
            return next(err);
        });
};

/**
 * GET  /me/project
 */
var listByCurrentUser = function(req, res, next) {
    userService.findOneReadOnlyById(req.user._id)
        .then(function(user) {
            if (!user) {
                return when.reject(new httpErrors.NotFound(errors[14].message, errors[14].code));
            }
            return projectService.findReadOnlyByUser(user._id, '_id name slug');
        })
        .then(function(projects) {

            projects = projects
                .map(function(object) {
                    return objectHelper.removeProperties(['__v'], object);
                })
                .map(function(object) {
                    return projectAdapter.hateoasize(['self'], object);
                });

            var data = {
                data: projects
            };

            /*
             @Todo Hyperlinks
             next	Shows the URL of the immediate next page of results.
             last	Shows the URL of the last page of results.
             first	Shows the URL of the first page of results.
             prev	Shows the URL of the immediate previous page of results.
             */

            res
                .contentType('application/json')
                .send(JSON.stringify(data));
        })
        .then(null, function(err) {
            if (_.has(err, 'code') && !(err instanceof httpErrors.NotFound) && !(err instanceof httpErrors.ForbiddenForbidden)) {
                return next(new httpErrors.BadRequest(err.message, err.code));
            } else if (_.has(err, 'name') && err.name === 'CastError') {
                return next(new httpErrors.BadRequest(errors[13].message, errors[13].code));
            }
            return next(err);
        });
};

/**
 * GET  /users/:id/project
 */
var listByUser = function(req, res, next) {
    stringValidator.isDocumentId(req.params.id)
        .then(function(value) {
            return userService.findOneReadOnlyById(value);
        })
        .then(function(user) {
            if (!user) {
                return when.reject(new httpErrors.NotFound(errors[14].message, errors[14].code));
            }
            return projectService.findReadOnlyByUser(user._id, '_id name slug');
        })
        .then(function(projects) {

            projects = projects
                .map(function(object) {
                    return objectHelper.removeProperties(['__v'], object);
                })
                .map(function(object) {
                    return projectAdapter.hateoasize(['self'], object);
                });

            var data = {
                data: projects
            };

            /*
             @Todo Hyperlinks
             next	Shows the URL of the immediate next page of results.
             last	Shows the URL of the last page of results.
             first	Shows the URL of the first page of results.
             prev	Shows the URL of the immediate previous page of results.
             */

            res
                .contentType('application/json')
                .send(JSON.stringify(data));
        })
        .then(null, function(err) {
            if (_.has(err, 'code') && !(err instanceof httpErrors.NotFound) && !(err instanceof httpErrors.Forbidden)) {
                return next(new httpErrors.BadRequest(err.message, err.code));
            } else if (_.has(err, 'name') && err.name === 'CastError') {
                return next(new httpErrors.BadRequest(errors[13].message, errors[13].code));
            }
            return next(err);
        });
};

module.exports = {
    create: create,
    update: update,
    show: show,
    remove: remove,
    listByCurrentUser: listByCurrentUser,
    listByUser: listByUser
};
