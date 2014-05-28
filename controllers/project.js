var Project             = require('../models').Project,
    ProjectService      = require('../services').Project,
    ProjectAdapter      = require('../adapter').Project,
    ProjectValidator    = require('../validator').Project,
    UserService         = require('../services').User,
    UserValidator       = require('../validator').User,
    StringValidator     = require('../validator').String,
    HttpErrors          = require('../helpers/http.errors'),
    errors              = require('../validator').Errors,
    _                   = require('underscore'),
    ObjectHelper        = require('../helpers/object'),
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

    var data = req.body;
    var user = req.user;

    ProjectValidator.name(data.name)
        .then(function() {
            return ProjectValidator.slug(data.slug);
        })
        .then(function() {
            return ProjectValidator.slugNotExist(data.slug);
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
            project = ObjectHelper.removeProperties(['__v'], project);
            project = ProjectAdapter.hateoasize(['self'], project);

            res
                .contentType('application/json')
                .send(201, JSON.stringify(project));
        })
        .then(null, function(err) {
            if (_.has(err, 'code')) {
                return next(new HttpErrors.BadRequest(err.message, err.code));
            } else if (_.has(err, 'name') && err.name === 'CastError') {
                return next(new HttpErrors.BadRequest(errors[13].message, errors[13].code));
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

    var changes = req.body;
    var projectUpdated = null;

    StringValidator.isDocumentId(req.params.id)
        .then(function(value) {
            return ProjectService.findById(value)
                .then(function(project) {

                    // Check if the project doesn't exist
                    if (!project) {
                        return when.reject(new HttpErrors.NotFound(errors[18].message, errors[18].code));
                    }

                    var projectOld = project.toObject();

                    // User is able to access this project
                    // @Todo Use request to mongo to determine ability
                    var isAble = _.find(project.users, function(userId) {
                        return userId.toString() === req.user._id.toString();
                    });

                    if (!isAble) {
                        return when.reject(new HttpErrors.Unauthorized(errors[19].message, errors[19].code));
                    }

                    // Update object with changes
                    Object.keys(changes).forEach(function(key) {
                        project.set(key, changes[key]);
                    });

                    projectUpdated = project;

                    // Check if the project has been modified
                    if (ObjectHelper.areEqual(projectOld, project.toObject())) {
                        return when.resolve(project);
                    }

                    return ProjectValidator.name(project.name)
                        .then(function() {
                            return ProjectValidator.slug(project.slug);
                        })
                        .then(function() {
                            return ProjectService.findReadOnlyBySlug(project.slug);
                        })
                        .then(function(obj) {
                            if (obj && obj._id !== project._id) {
                                return when.reject(errors[4]);
                            } else {
                                return when.resolve(project);
                            }
                        })
                        .then(function() {
                            return project.save();
                        });
                });
        })
        .then(function() {
            projectUpdated = projectUpdated.toObject();
            projectUpdated = ObjectHelper.removeProperties(['__v'], projectUpdated);
            projectUpdated = ProjectAdapter.hateoasize(['self'], projectUpdated);
            res
                .contentType('application/json')
                .send(200, JSON.stringify(projectUpdated));
        })
        .then(null, function(err) {
            if (_.has(err, 'code') && !(err instanceof HttpErrors.NotFound) && !(err instanceof HttpErrors.Unauthorized)) {
                return next(new HttpErrors.BadRequest(err.message, err.code));
            } else if (_.has(err, 'name') && err.name === 'CastError') {
                return next(new HttpErrors.BadRequest(errors[13].message, errors[13].code));
            }
            return next(err);
        });
};

/**
 * GET  /project/:id
 */
var show = function(req, res, next) {
    StringValidator.isDocumentId(req.params.id)
        .then(function(value) {
            return ProjectService.findReadOnlyById(value)
                .then(function(project) {

                    if (!project) {
                        return when.reject(new HttpErrors.NotFound(errors[18].message, errors[18].code));
                    }

                    // User is able to access this project
                    // @Todo Use request to mongo to determine ability
                    var isAble = _.find(project.users, function(userId) {
                        return userId.toString() === req.user._id.toString();
                    });

                    if (!isAble) {
                        return when.reject(new HttpErrors.Unauthorized(errors[19].message, errors[19].code));
                    }

                    project = ObjectHelper.removeProperties(['__v'], project);
                    project = ProjectAdapter.hateoasize(['self'], project);
                    res
                        .contentType('application/json')
                        .send(JSON.stringify(project));
                });
        })
        .then(null, function(err) {
            if (_.has(err, 'code') && !(err instanceof HttpErrors.NotFound) && !(err instanceof HttpErrors.Unauthorized)) {
                return next(new HttpErrors.BadRequest(err.message, err.code));
            } else if (_.has(err, 'name') && err.name === 'CastError') {
                return next(new HttpErrors.BadRequest(errors[13].message, errors[13].code));
            }
            return next(err);
        });
};

/**
 * GET  /me/project
 */
var listByCurrentUser = function(req, res, next) {
    UserService.findReadOnlyById(req.user._id)
        .then(function(user) {
            if (!user) {
                return when.reject(new HttpErrors.NotFound(errors[14].message, errors[14].code));
            }
            return ProjectService.findReadOnlyByUser(user._id, '_id name slug');
        })
        .then(function(projects) {

            projects = projects
                .map(function(object) {
                    return ObjectHelper.removeProperties(['__v'], object);
                })
                .map(function(object) {
                    return ProjectAdapter.hateoasize(['self'], object);
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
            if (_.has(err, 'code') && !(err instanceof HttpErrors.NotFound) && !(err instanceof HttpErrors.Unauthorized)) {
                return next(new HttpErrors.BadRequest(err.message, err.code));
            } else if (_.has(err, 'name') && err.name === 'CastError') {
                return next(new HttpErrors.BadRequest(errors[13].message, errors[13].code));
            }
            return next(err);
        });

};

/**
 * GET  /users/:id/project
 */
var listByUser = function(req, res, next) {

    StringValidator.isDocumentId(req.params.id)
        .then(function(value) {
            return UserService.findReadOnlyById(value);
        })
        .then(function(user) {
            if (!user) {
                return when.reject(new HttpErrors.NotFound(errors[14].message, errors[14].code));
            }
            return ProjectService.findReadOnlyByUser(user._id, '_id name slug');
        })
        .then(function(projects) {

            projects = projects
                .map(function(object) {
                    return ObjectHelper.removeProperties(['__v'], object);
                })
                .map(function(object) {
                    return ProjectAdapter.hateoasize(['self'], object);
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
            if (_.has(err, 'code') && !(err instanceof HttpErrors.NotFound) && !(err instanceof HttpErrors.Unauthorized)) {
                return next(new HttpErrors.BadRequest(err.message, err.code));
            } else if (_.has(err, 'name') && err.name === 'CastError') {
                return next(new HttpErrors.BadRequest(errors[13].message, errors[13].code));
            }
            return next(err);
        });
};

module.exports = {
    create: create,
    update: update,
    show: show,
    listByCurrentUser: listByCurrentUser,
    listByUser: listByUser
};
