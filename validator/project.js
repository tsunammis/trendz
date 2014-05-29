var validator       = require('validator'),
    projectService  = require('../services').Project,
    stringValidator = require('./string'),
    errors          = require('./errors'),
    when            = require('when');

var name = function(name) {
    if (name.length <= 2 || name.length > 30) {
        return when.reject(errors[1]);
    }
    return when.resolve(name);
};

var slug = function(slug) {
    if (validator.isNull(slug) || slug.length <= 2 || slug.length > 30) {
        return when.reject(errors[20]);
    }
    return stringValidator.isSlug(slug);
};

var slugExist = function(slug) {
    return projectService.findOneReadOnlyBySlug(slug)
        .then(function(data) {
            if (data !== null) {
                return when.resolve(slug);
            }
            return when.reject(errors[2]);
        }, function(err) {
            return when.reject(errors[3]);
        });
};

var slugNotExist = function(slug) {
    return projectService.findOneReadOnlyBySlug(slug)
        .then(function(data) {
            if (data !== null) {
                return when.reject(errors[4]);
            }
            return when.resolve(slug);
        }, function(err) {
            return when.reject(errors[3]); 
        });
};

module.exports = {
    name: name,
    slug: slug,
    slugExist: slugExist,
    slugNotExist: slugNotExist
};