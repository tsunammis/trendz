var Configuration   = require('../config/configuration'),
    ArrayHelper     = require('../helpers/array'),
    _               = require('underscore');

/**
 * Add 'links' data to entity to respect the HATEOAS guidelines
 *
 * @param {Project} project
 */
var hateoasize = function(types, project) {
    if (_.contains(types, 'self')) {
        ArrayHelper.pushToPropertyUnknow(project, 'links', {
            'rel'   : 'self',
            'href'  : Configuration.getRootUrl() + '/project/' + project._id,
            'method': 'GET'
        });
    }

    if (_.contains(types, 'create')) {
        ArrayHelper.pushToPropertyUnknow(project, 'links', {
            'rel'   : 'create',
            'href'  : Configuration.getRootUrl() + '/project',
            'method': 'POST'
        });
    }

    if (_.contains(types, 'update')) {
        ArrayHelper.pushToPropertyUnknow(project, 'links', {
            'rel'   : 'update',
            'href'  : Configuration.getRootUrl() + '/project/' + project._id,
            'method': 'PUT'
        });
    }

    if (_.contains(types, 'users')) {
        ArrayHelper.pushToPropertyUnknow(project, 'links', {
            'rel'   : 'users',
            'href'  : Configuration.getRootUrl() + '/project/' + project._id + '/users',
            'method': 'GET'
        });
    }

    if (_.contains(types, 'status')) {
        ArrayHelper.pushToPropertyUnknow(project, 'links', {
            'rel'   : 'status',
            'href'  : Configuration.getRootUrl() + '/project/' + project._id + '/status',
            'method': 'GET'
        });
    }

    return project;
};

module.exports.hateoasize = hateoasize;
