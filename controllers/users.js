var User            = require('../models').User,
    userAdapter     = require('../adapter').User,
    objectHelper    = require('../helpers/object'),
    httpErrors      = require('../helpers/http.errors'),
    userService     = require('../services').User,
    projectService  = require('../services').Project,
    stringValidator = require('../validator').String,
    userValidator   = require('../validator').User,
    errors          = require('../validator').Errors,
    when            = require('when'),
    _               = require('underscore');

/**
 * POST  /users
 * 
 * Parameters:
 *  - email | Respect email format
 *  - password | Min length: 3 and Max length: 15
 *  - password_confirm | Must be the same with 'password'
 */
var create = function(req, res, next) {
    userValidator.samePassword(req.body.password, req.body.password_confirm)
        .then(function() {
            return userValidator.password(req.body.password);
        })
        .then(function() {
            return userValidator.email(req.body.email);
        })
        .then(function() {
            return userValidator.emailNotExist(req.body.email);
        })
        .then(function() {
            return User.create({
                email: req.body.email,
                password: req.body.password
            });
        })
        .then(function(user) {
            user = user.toObject();
            user = objectHelper.removeProperties(['__v', 'password'], user);
            user = userAdapter.hateoasize(['self', 'status'], user);
            res
                .contentType('application/json')
                .send(201, JSON.stringify(user));
        })
        .then(null, function(err) {
            if (_.has(err, 'code')) {
                return next(new httpErrors.BadRequest(err.message, err.code));
            }
            return next(err);
        });
};

/**
 * PUT  /me
 *
 * Parameters:
 *  - email | Optional | Respect email format
 *  - password | Optional | Min length: 3 and Max length: 15
 *  - password_confirm | Optional | Must be the same with 'password'
 */
var update = function(req, res, next) {

    var changes         = req.body,
        promisePassword = null,
        promiseEmail    = null;

    if (_.has(changes, 'password') && _.has(changes, 'password_confirm')) {
        promisePassword = userValidator.samePassword(changes.password, changes.password_confirm)
            .then(function() {
                return userValidator.password(changes.password);
            });
    }

    if (_.has(changes, 'email')) {
        promiseEmail = userValidator.email(changes.email)
            .then(function() {
                return userService.findReadOnlyByEmail(changes.email);
            })
            .then(function(user) {
                if (user && user._id !== req.user._id) {
                    return when.reject(errors[8]);
                } else {
                    return when.resolve();
                }
            });
    }

    userService.findById(req.user._id)
        .then(function() {
            return (promisePassword !== null) ? promisePassword : when.resolve();
        })
        .then(function() {
            return (promiseEmail !== null) ? promiseEmail : when.resolve();
        })
        .then(function() {
            // Update object with changes
            Object.keys(changes).forEach(function(key) {
                req.user.set(key, changes[key]);
            });
            return req.user.save();
        })
        .then(function() {
            user = req.user.toObject();
            user = objectHelper.removeProperties(['__v', 'password'], user);
            user = userAdapter.hateoasize(['self', 'status'], user);
            res
                .contentType('application/json')
                .send(JSON.stringify(user));
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
 * GET  /me
 */
var self = function(req, res, next) {
    var user = req.user;
    if (!user) {
        next(errors[14]);
    }
    user = user.toObject();
    user = objectHelper.removeProperties(['__v', 'password'], user);
    user = userAdapter.hateoasize(['self', 'status'], user);
    res
        .contentType('application/json')
        .send(JSON.stringify(user));
};

/**
 * GET  /users/:id
 * 
 * Parameters:
 *  - id | Respect the format of Mongo's Id
 */
var show = function(req, res, next) {
    stringValidator.isDocumentId(req.params.id)
        .then(function(value) {
            return userService.findReadOnlyById(value);
        })
        .then(function (data) {
            if (!data) {
                return when.reject(new httpErrors.NotFound(errors[14].message, errors[14].code));
            }
            data = objectHelper.removeProperties(['__v', 'password'], data);
            data = userAdapter.hateoasize(['self', 'status'], data);
            res
                .contentType('application/json')
                .send(JSON.stringify(data));

        }).then(null, function(err) {
            if (_.has(err, 'code') && !(err instanceof httpErrors.NotFound)) {
                return next(new httpErrors.BadRequest(err.message, err.code));
            } else if (_.has(err, 'name') && err.name === 'CastError') {
                return next(new httpErrors.BadRequest(errors[13].message, errors[13].code));
            }
            return next(err);
        });
};

/**
 * GET  /project/:id/users
 *
 * Parameters:
 *  - id | Respect the format of Mongo's Id
 */
var listByProject = function(req, res, next) {
    stringValidator.isDocumentId(req.params.id)
        .then(function(value) {
            return projectService.findOneReadOnlyById(value);
        })
        .then(function(project) {
            // Check if the project doesn't exist
            if (!project) {
                return when.reject(new httpErrors.NotFound(errors[18].message, errors[18].code));
            }
            // User is able to access this project
            // @Todo Use query to mongo to determine ability
            var isAble = _.find(project.users, function(userId) {
                return userId.toString() === req.user._id.toString();
            });
            if (!isAble) {
                return when.reject(new httpErrors.Unauthorized(errors[19].message, errors[19].code));
            }
            return userService.findReadOnlyByIds(project.users, '_id email');
        })
        .then(function(users) {
            users = users
                .map(function(object) {
                    return objectHelper.removeProperties(['__v', 'password'], object);
                })
                .map(function(object) {
                    return userAdapter.hateoasize(['self'], object);
                });

            var data = {
                data: users
            };

            res
                .contentType('application/json')
                .send(200, JSON.stringify(data));
        })
        .then(null, function(err) {
            if (_.has(err, 'code') && !(err instanceof httpErrors.NotFound) && !(err instanceof httpErrors.Unauthorized)) {
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
    self: self,
    show: show,
    listByProject: listByProject
};