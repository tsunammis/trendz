var express         = require('express'),
    Status          = require('../models').Status,
    StatusService   = require('../services').Status,
    StatusAdapter   = require('../adapter').Status,
    StatusValidator = require('../validator').Status,
    ObjectHelper    = require('../helpers/object'),
    UserService     = require('../services').User,
    ProjectService  = require('../services').Project,
    HttpErrors      = require('../helpers/http.errors'),
    StringValidator = require('../validator').String,
    when            = require('when'),
    _               = require('underscore'),
    errors          = require('../validator').Errors;

/**
 * POST  /status
 * 
 * Parameters:
 *  - content | Min length: 1 and max length: 300
 *  - project | Optional | Must be the same with 'password'
 */
var create = function(req, res, next) {

    StatusValidator.content(req.body.content)
    .then(function(content) {
        var status = {};
        status.content = content;
        status.owner = req.user._id;
        status.project = null;
        if (_.has(req.body, 'project') && req.body.project) {
            return StringValidator.isDocumentId(req.body.project)
                .then(function(value) {
                    return ProjectService.findReadOnlyById(value)
                            .then(function(project) {
                                if (!project) {
                                    return when.reject(new HttpErrors.BadRequest(errors[18].message, errors[18].code));
                                }
                                status.project = project._id;
                                return Status.create(status);
                            });
                });
        }
        return Status.create(status);
    })
    .then(function(status) {
        
        status = status.toObject();
        status = ObjectHelper.removeProperties(['__v'], status);
        status = StatusAdapter.hateoasize(['self'], status);
        res
            .contentType('application/json')
            .send(201, JSON.stringify(status));
    })
    .then(null, function(err) {
        if (_.has(err, 'code')) {
            return next(new HttpErrors.BadRequest(err.message, err.code));
        } else if (_.has(err, 'name') && err.name == 'CastError') {
            return next(new HttpErrors.BadRequest(errors[13].message, errors[13].code));
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

    StringValidator.isDocumentId(req.params.id)
    .then(function(value) {
        return StatusService.findReadOnlyById(value);
    })
    .then(function (data) {
        if (!data) {
            return when.reject(new HttpErrors.NotFound(errors[15].message, errors[15].code));
        }
        data = ObjectHelper.removeProperties(['__v'], data);
        data = StatusAdapter.hateoasize(['self'], data);
        res
            .contentType('application/json')
            .send(JSON.stringify(data));

    })
    .then(null, function(err) {
        if (_.has(err, 'code') && !(err instanceof HttpErrors.NotFound)) {
            return next(new HttpErrors.BadRequest(err.message, err.code));
        } else if (_.has(err, 'name') && err.name == 'CastError') {
            return next(new HttpErrors.BadRequest(errors[13].message, errors[13].code));
        }
        return next(err);
    });

};

/**
 * GET  /users/:id/status
 * 
 * Parameters:
 *  - id | Respect the format of Mongo's Id
 *  - page=1 | Pagination
 *  - per_page=10 | Pagination
 */
var listByUser = function(req, res, next) {
    
    StringValidator.isDocumentId(req.params.id)
    .then(function(value) {
        return UserService.findReadOnlyById(value);
    })
    .then(function (user) {
        if (!user) {
            return when.reject(new HttpErrors.BadRequest(errors[14].message, errors[14].code));
        }
        return StatusService.findReadOnlyByUserId(req.params.id);
    })
    .then(function (listStatus) {
        listStatus = listStatus
            .map(function(object) {
                return ObjectHelper.removeProperties(['__v'], object);
            })
            .map(function(object) {
                return StatusAdapter.hateoasize(['self'], object);
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
            return next(new HttpErrors.BadRequest(err.message, err.code));
        } else if (_.has(err, 'name') && err.name == 'CastError') {
            return next(new HttpErrors.BadRequest(errors[13].message, errors[13].code));
        }
        return next(err);
    });
};

module.exports = {
    create: create,
    show: show,
    listByUser: listByUser
};
