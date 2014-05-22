var express         = require('express'),
    User            = require('../models').User,
    UserService     = require('../services').User,
    UserAdapter     = require('../adapter').User,
    StatusService   = require('../services').Status,
    StatusAdapter   = require('../adapter').Status,
    ObjectHelper    = require('../helpers/object'),
    HttpErrors      = require('../helpers/http.errors'),
    StringValidator = require('../validator').String,
    UserValidator   = require('../validator').User,
    when            = require('when'),
    _               = require('underscore');

/**
 * POST  /
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
        console.dir(err);
        if (_.has(err, 'code')) {
            return next(new HttpErrors.BadRequest(err.message, err.code));
        } else {
            return next(new HttpErrors.BadRequest(err.message));
        }
    });
};

/**
 * GET  /:id
 */
var show = function(req, res, next) {

    StringValidator.isDocumentId(req.params.id)
    .then(function(value) {
        return UserService.findReadOnlyById(value);
    })
    .then(function (data) {
        if (!data) {
            return when.reject(new HttpErrors.NotFound('User not found'));
        }

        data = ObjectHelper.removeProperties(['__v', 'password'], data);
        data = UserAdapter.hateoasize(['self', 'status'], data);

        res
            .contentType('application/json')
            .send(JSON.stringify(data));

    }).then(null, function(err) {
        if (_.has(err, 'name') 
                && (err.name == 'CastError' || err.name == 'string.document_id' )) {
            return next(new HttpErrors.BadRequest("The id's format isn't valid"));
        }
        return next(err);
    });

};

module.exports = {
    create: create,
    show: show
};
