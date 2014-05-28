var User            = require('../models').User,
    UserService     = require('../services').User,
    UserAdapter     = require('../adapter').User,
    ObjectHelper    = require('../helpers/object'),
    HttpErrors      = require('../helpers/http.errors'),
    StringValidator = require('../validator').String,
    UserValidator   = require('../validator').User,
    when            = require('when'),
    _               = require('underscore'),
    errors          = require('../validator').Errors;

/**
 * POST  /users
 * 
 * Parameters:
 *  - email | Respect email format
 *  - password | Min length: 3 and Max length: 15
 *  - password_confirm | Must be the same with 'password'
 */
var create = function(req, res, next) {
    
    UserValidator.samePassword(req.body.password, req.body.password_confirm)
    .then(function() {
        return UserValidator.password(req.body.password);
    })
    .then(function() {
        return UserValidator.email(req.body.email);
    })
    .then(function() {
        return UserValidator.emailNotExist(req.body.email);
    })
    .then(function() {
        return User.create({
            email: req.body.email,
            password: req.body.password
        });
    })
    .then(function(user) {
        user = user.toObject();
        user = ObjectHelper.removeProperties(['__v', 'password'], user);
        user = UserAdapter.hateoasize(['self', 'status'], user);
        res
            .contentType('application/json')
            .send(201, JSON.stringify(user));
    })
    .then(null, function(err) {
        if (_.has(err, 'code')) {
            return next(new HttpErrors.BadRequest(err.message, err.code));
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
        promisePassword = UserValidator.samePassword(changes.password, changes.password_confirm)
            .then(function() {
                return UserValidator.password(changes.password);
            });
    }

    if (_.has(changes, 'email')) {
        promiseEmail = UserValidator.email(changes.email)
            .then(function() {
                return UserService.findReadOnlyByEmail(changes.email);
            })
            .then(function(user) {
                if (user && user._id !== req.user._id) {
                    return when.reject(errors[8]);
                } else {
                    return when.resolve();
                }
            });
    }

    UserService.findById(req.user._id)
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
            user = ObjectHelper.removeProperties(['__v', 'password'], user);
            user = UserAdapter.hateoasize(['self', 'status'], user);
            res
                .contentType('application/json')
                .send(JSON.stringify(user));
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
 * GET  /users/:id
 * 
 * Parameters:
 *  - id | Respect the format of Mongo's Id
 */
var show = function(req, res, next) {

    StringValidator.isDocumentId(req.params.id)
    .then(function(value) {
        return UserService.findReadOnlyById(value);
    })
    .then(function (data) {
        if (!data) {
            return when.reject(new HttpErrors.NotFound(errors[14].message, errors[14].code));
        }
        data = ObjectHelper.removeProperties(['__v', 'password'], data);
        data = UserAdapter.hateoasize(['self', 'status'], data);
        res
            .contentType('application/json')
            .send(JSON.stringify(data));

    }).then(null, function(err) {
        if (_.has(err, 'code') && !(err instanceof HttpErrors.NotFound)) {
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
    show: show
};
