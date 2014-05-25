var Project             = require('../models').Project,
    ProjectService      = require('../services').Project,
    ProjectAdapter      = require('../adapter').Project,
    ProjectValidator    = require('../validator').Project,
    UserService         = require('../services').User,
    UserValidator       = require('../validator').User,
    StringValidator     = require('../validator').String,
    HttpErrors          = require('../helpers/http.errors'),
    _                   = require('underscore'),
    ObjectHelper        = require('../helpers/object');

/**
 * POST  /project
 *
 * Parameters:
 *  - name | Min length: 2 and max length: 30
 *  - slug | Me be respect this regex /^[a-z0-9-_]+$/
 *  - owner | Id of the owner of the project
 */
var create = function(req, res, next) {

    var data = req.body;
    var user = req.user;

    ProjectValidator.name(data.name)
        .then(function() {
            return ProjectValidator.slug(data.slug);
        })
        .then(function() {
            return ProjectValidator.slugNotExist(data.slug);
        })
        .then(function() {
            return Project.create({
                name: data.name,
                slug: data.slug,
                owner: user._id,
                users: [user._id]
            });
        })
        .then(function(project) {

            project = project.toObject();
            project = ObjectHelper.removeProperties(['__v'], project);
            project = ProjectAdapter.hateoasize(['self'], project);

            res
                .contentType('application/json')
                .send(201, JSON.stringify(project));
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
 * GET  /:id
 */
var show = function(req, res, next) {
    var promiseProject = ProjectService.findReadOnlyById(req.params.id);

    promiseProject.then(function (data) {

        data = ObjectHelper.removeProperties(['__v'], data);
        data = ProjectAdapter.hateoasize(['self'], data);
        res
            .contentType('application/json')
            .send(JSON.stringify(data));

    }, function(err) {
        next(err);
    });

};

module.exports = {
    create: create,
    show: show
};
