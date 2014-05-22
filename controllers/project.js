var express         = require('express'),
    Project         = require('../models').Project,
    ProjectService  = require('../services').Project,
    ProjectAdapter  = require('../adapter').Project,
    ObjectHelper    = require('../helpers/object');

/**
 * POST  /
 */
var create = function(req, res, next) {
    var project = new Project();
    project.name = req.body.name;
    // project.slug = req.body.name;
    project.users.push(req.user._id);

    // @TODO See to use promise
    project.save(function (err) {
        if (err) {
            return next(err);
        }

        var data = project.toObject();

        data = ObjectHelper.removeProperties(['__v'], data);
        data = ProjectAdapter.hateoasize(['self'], data);

        res
            .contentType('application/json')
            .send(201, JSON.stringify(data));
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
