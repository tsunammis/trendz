var express         = require('express'),
    StatusService   = require('../services').Status,
    StatusAdapter   = require('../adapter').Status,
    ObjectHelper    = require('../helpers/object'),
    UserService     = require('../services').User,
    HttpErrors      = require('../helpers/http.errors'),
    StringValidator = require('../validator').String,
    when            = require('when'),
    _               = require('underscore');

/**
 * GET  /status/:id
 */
var show = function(req, res, next) {

    StringValidator.isDocumentId(req.params.id)
    .then(function(value) {
        return StatusService.findReadOnlyById(value);
    })
    .then(function (data) {
        if (!data) {
            return when.reject(new HttpErrors.NotFound('Status not found'));
        }
        
        data = ObjectHelper.removeProperties(['__v'], data);
        data = StatusAdapter.hateoasize(['self'], data);
        res
            .contentType('application/json')
            .send(JSON.stringify(data));

    })
    .then(null, function(err) {
        if (_.has(err, 'name') 
                && (err.name == 'CastError' || err.name == 'string.document_id' )) {
            return next(new HttpErrors.BadRequest("The id's format isn't valid"));
        }
        return next(err);
    });

};

/**
 * GET  /users/:id/status
 * Parameters: page=1 / per_page=10
 */
var listByUser = function(req, res, next) {
    
    StringValidator.isDocumentId(req.params.id)
    .then(function(value) {
        return UserService.findReadOnlyById(value);
    })
    .then(function (user) {
        if (!user) {
            return when.reject(new HttpErrors.NotFound('User not found'));
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
        var result = {
            next	Shows the URL of the immediate next page of results.
            last	Shows the URL of the last page of results.
            first	Shows the URL of the first page of results.
            prev	Shows the URL of the immediate previous page of results.
        };
        */
        
        res
            .contentType('application/json')
            .send(JSON.stringify(data));
            
    })
    .then(null, function(err) {
        if (_.has(err, 'name') 
                && (err.name == 'CastError' || err.name == 'string.document_id' )) {
            return next(new HttpErrors.BadRequest("The id's format isn't valid"));
        }
        return next(err);
    });
};

module.exports = {
    show: show,
    listByUser: listByUser
};
