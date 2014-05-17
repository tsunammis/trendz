var validator       = require('validator'),
    ProjectService  = require('../services').Project,
    when            = require('when'),
    sequence        = require('when/sequence'),
    stringValidator = require('./string');

var name = function(name) {
    if (name.length <= 2 || name.length > 30) {
        return when.reject({
            'name'      : 'project.name',
            'message'   : 'the length of name must contain between 3 and 30 characters'
        });
    }
    return when.resolve();
};

var slug = function(slug) {
    return sequence([
            stringValidator.isNotNull,
            stringValidator.isSlug
        ], slug);
};

var slugExist = function(slug) {
    return ProjectService.findReadOnlyBySlug(slug)
        .then(function(data) {
            if (data !== null) {
                return when.resolve();
            }
            return when.reject({
                'name'      : 'user.slug.doesnt_exist',
                'message'   : 'this slug doesn\'t exist'
            });
        }, function(err) {
            return when.reject({
                'name'      : 'connection.error',
                'message'   : 'Error durring connection with mongo'
            }); 
        });
};

var slugNotExist = function(slug) {
    return ProjectService.findReadOnlyBySlug(slug)
        .then(function(data) {
            if (data !== null) {
                return when.reject({
                    'name'      : 'user.slug.already_exist',
                    'message'   : 'this slug already exist'
                });
            }
            return when.resolve();
        }, function(err) {
            return when.reject({
                'name'      : 'connection.error',
                'message'   : 'Error durring connection with mongo'
            }); 
        });
};

module.exports = {
    name: name,
    slug: slug,
    slugExist: slugExist,
    slugNotExist: slugNotExist
};
