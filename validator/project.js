var validator       = require('validator'),
    ProjectService  = require('../services').Project,
    when            = require('when'),
    sequence        = require('when/sequence'),
    stringValidator = require('./string'),
    Errors          = require('./errors');

var name = function(name) {
    if (name.length <= 2 || name.length > 30) {
        return when.reject(Errors[1]);
    }
    return when.resolve(name);
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
                return when.resolve(slug);
            }
            return when.reject(Errors[2]);
        }, function(err) {
            return when.reject(Errors[3]);
        });
};

var slugNotExist = function(slug) {
    return ProjectService.findReadOnlyBySlug(slug)
        .then(function(data) {
            if (data !== null) {
                return when.reject(Errors[4]);
            }
            return when.resolve(slug);
        }, function(err) {
            return when.reject(Errors[3]); 
        });
};

module.exports = {
    name: name,
    slug: slug,
    slugExist: slugExist,
    slugNotExist: slugNotExist
};
