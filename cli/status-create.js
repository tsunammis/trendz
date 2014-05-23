#!/usr/bin/env node

var readline            = require('readline'),
    CommandAsker        = require('command-asker'),
    cli                 = require('../helpers/console'),
    Status              = require('../models').Status,
    statusValidator     = require('../validator').Status,
    userService         = require('../services').User,
    userValidator       = require('../validator').User,
    projectValidator    = require('../validator').Project,
    projectService      = require('../services').Project,
    when                = require('when');

cli.banner();
cli.ok("Interactive command to add new status");
cli.line();

var a = new CommandAsker([
    { key: 'content',   ask: 'content',         validators: [] },
    { key: 'owner',     ask: 'user (email)',    validators: [userValidator.email, userValidator.emailExist] },
    { key: 'project',   ask: 'project (slug)',  validators: [projectValidator.slug, projectValidator.slugExist], optional: true }
]);

a.ask(function(response) {
    userService.findReadOnlyByEmail(response.owner)
    .then(function(user) {
        response.owner = user._id;
        if (response.project && response.length > 0) {
            return projectService.findReadOnlyBySlug(response.project)
                .then(function(project) {
                    response.project = project._id;
                    return Status.create(response);
                });
        } else {
            response.project = null;
        }
        return Status.create(response);
    })
    .then(function (createdStatus) {
        cli.line();
        cli.line(
            cli.colorOk('The status "') + cli.colorHighlightOk(createdStatus.content) + cli.colorOk('" has been created.')
        );
        cli.ok("Thanks.");
        a.close();
    }, function() {
        cli.line();
        cli.error("An error occured during saving ...");
        a.close(1);
    }); 
});
