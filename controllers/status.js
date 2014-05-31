var statusAdapter   = require('../adapter').Status,
    Status          = require('../models').Status,
    objectHelper    = require('../helpers/object'),
    httpErrors      = require('../helpers/http.errors'),
    statusService   = require('../services').Status,
    userService     = require('../services').User,
    projectService  = require('../services').Project,
    statusValidator = require('../validator').Status,
    stringValidator = require('../validator').String,
    errors          = require('../validator').Errors,
    when            = require('when'),
    _               = require('underscore');

/**
 * POST  /status
 * 
 * Parameters:
 *  - content | Min length: 1 and max length: 300
 *  - project | Optional | Must be the same with 'password'
 */
var create = function(req, res, next) {
    statusValidator.content(req.body.content)
        .then(function(content) {
            var status = {};
            status.content = content;
            status.owner = req.user._id;
            status.project = null;
            if (_.has(req.body, 'project') && req.body.project) {
                return stringValidator.isDocumentId(req.body.project)
                    .then(function(id) {
                        return projectService.findOneReadOnlyById(id);
                    })
                    .then(function(project) {
                        if (!project) {
                            return when.reject(new httpErrors.BadRequest(errors[18].message, errors[18].code));
                        }
                        // User is able to access this project
                        // @Todo Use request to mongo to determine ability
                        var isAble = _.find(project.users, function(userId) {
                            return userId.toString() === req.user._id.toString();
                        });
                        if (!isAble) {
                            return when.reject(new httpErrors.Unauthorized(errors[19].message, errors[19].code));
                        }
                        status.project = project._id;
                        return Status.create(status);
                    });
            }
            return Status.create(status);
        })
        .then(function(status) {
            status = status.toObject();
            status = objectHelper.removeProperties(['__v'], status);
            status = statusAdapter.hateoasize(['self'], status);
            res
                .contentType('application/json')
                .send(201, JSON.stringify(status));
        })
        .then(null, function(err) {
            if (_.has(err, 'code') && !(err instanceof httpErrors.Unauthorized)) {
                return next(new httpErrors.BadRequest(err.message, err.code));
            } else if (_.has(err, 'name') && err.name === 'CastError') {
                return next(new httpErrors.BadRequest(errors[13].message, errors[13].code));
            }
            return next(err);
        });
};

/**
 * GET  /status/:id
 * 
 * Parameters:
 *  - id | Respect the format of Mongo's Id
 */
var show = function(req, res, next) {
    stringValidator.isDocumentId(req.params.id)
        .then(function(id) {
            return statusService.findOneReadOnlyById(id);
        })
        .then(function (status) {
            if (!status) {
                return when.reject(new httpErrors.NotFound(errors[15].message, errors[15].code));
            }
            if (_.has(status, 'project') && status.project) {
                return stringValidator.isDocumentId(status.project)
                    .then(function(id) {
                        return projectService.findOneReadOnlyById(id);
                    })
                    .then(function(project) {
                        if (!project) {
                            return when.reject(new httpErrors.BadRequest(errors[19].message, errors[19].code));
                        }
                        // User is able to access this project
                        // @Todo Use request to mongo to determine ability
                        var isAble = _.find(project.users, function(userId) {
                            return userId.toString() === req.user._id.toString();
                        });
                        if (!isAble) {
                            return when.reject(new httpErrors.Forbidden(errors[19].message, errors[19].code));
                        }
                        return when.resolve(status);
                    });
            } else {
                return when.resolve(status);
            }
        })
        .then(function(status) {
            status = objectHelper.removeProperties(['__v'], status);
            status = statusAdapter.hateoasize(['self'], status);
            res
                .contentType('application/json')
                .send(JSON.stringify(status));
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
 * DELETE  /status/:id
 *
 * Parameters:
 *  - id | Respect the format of Mongo's Id
 */
var remove = function(req, res, next) {
    stringValidator.isDocumentId(req.params.id)
        .then(function(id) {
            return statusService.findOneReadOnlyById(id);
        })
        .then(function (status) {
            if (!status) {
                return when.reject(new httpErrors.NotFound(errors[15].message, errors[15].code));
            }
            // Check if the user is the owner
            if (status.owner.toString() !== req.user._id.toString()) {
                return when.reject(new httpErrors.Forbidden(errors[21].message, errors[21].code));
            }
            return statusService.removeById(status._id);
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
 * GET  /users/:id/status
 * 
 * Parameters:
 *  - id | Respect the format of Mongo's Id
 */
var listByUser = function(req, res, next) {
    stringValidator.isDocumentId(req.params.id)
        .then(function(id) {
            return userService.findOneReadOnlyById(id);
        })
        .then(function (user) {
            if (!user) {
                return when.reject(new httpErrors.BadRequest(errors[14].message, errors[14].code));
            }
            return statusService.findReadOnlyByUserId(req.params.id);
        })
        .then(function (listStatus) {
            listStatus = listStatus
                .map(function(object) {
                    return objectHelper.removeProperties(['__v'], object);
                })
                .map(function(object) {
                    return statusAdapter.hateoasize(['self'], object);
                });

            var data = {
                data: listStatus
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
            if (_.has(err, 'code')) {
                return next(new httpErrors.BadRequest(err.message, err.code));
            } else if (_.has(err, 'name') && err.name === 'CastError') {
                return next(new httpErrors.BadRequest(errors[13].message, errors[13].code));
            }
            return next(err);
        });
};

/**
 * GET  /me/status
 */
var listByCurrentUser = function(req, res, next) {
    statusService.findReadOnlyByUserId(req.user._id)
        .then(function (listStatus) {
            listStatus = listStatus
                .map(function(object) {
                    return objectHelper.removeProperties(['__v'], object);
                })
                .map(function(object) {
                    return statusAdapter.hateoasize(['self'], object);
                });

            var data = {
                data: listStatus
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
            if (_.has(err, 'code')) {
                return next(new httpErrors.BadRequest(err.message, err.code));
            } else if (_.has(err, 'name') && err.name === 'CastError') {
                return next(new httpErrors.BadRequest(errors[13].message, errors[13].code));
            }
            return next(err);
        });
};

/**
 * GET  /project/:id/status
 *
 * Parameters:
 *  - id | Respect the format of Mongo's Id
 */
var listByProject = function(req, res, next) {
    stringValidator.isDocumentId(req.params.id)
        .then(function(id) {
            return projectService.findOneReadOnlyById(id);
        })
        .then(function (project) {
            if (!project) {
                return when.reject(new httpErrors.BadRequest(errors[18].message, errors[18].code));
            }
            // User is able to access this project
            // @Todo Use request to mongo to determine ability
            var isAble = _.find(project.users, function(userId) {
                return userId.toString() === req.user._id.toString();
            });
            if (!isAble) {
                return when.reject(new httpErrors.Forbidden(errors[19].message, errors[19].code));
            }
            return statusService.findReadOnlyByProjectId(req.params.id);
        })
        .then(function (listStatus) {
            listStatus = listStatus
                .map(function(object) {
                    return objectHelper.removeProperties(['__v'], object);
                })
                .map(function(object) {
                    return statusAdapter.hateoasize(['self'], object);
                });

            var data = {
                data: listStatus
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
    show: show,
    remove: remove,
    listByUser: listByUser,
    listByCurrentUser: listByCurrentUser,
    listByProject: listByProject
};