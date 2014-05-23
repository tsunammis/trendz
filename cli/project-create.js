#!/usr/bin/env node

var readline            = require('readline'),
    CommandAsker        = require('command-asker'),
    cli                 = require('../helpers/console'),
    Project             = require('../models').Project,
    projectValidator    = require('../validator').Project,
    userService         = require('../services').User,
    userValidator       = require('../validator').User;

cli.banner();
cli.ok("Interactive command to add new project");
cli.line();

var a = new CommandAsker([
    { key: 'name',      ask: 'name',    validators: [projectValidator.name] },
    { key: 'slug',      ask: 'slug',    validators: [projectValidator.slug, projectValidator.slugNotExist] },
    { key: 'owner',     ask: 'owner',   validators: [userValidator.email, userValidator.emailExist] }
]);

a.ask(function(response) {
    userService.findReadOnlyByEmail(response.owner)
    .then(function(user) {
        response.owner = user._id;
        response.users = [user._id];
        return Project.create(response);
    })
    .then(function (createdProject) {
        cli.line();
        cli.line(
            cli.colorOk("The project ")  + cli.colorHighlightOk(response.name) + cli.colorOk(" has been created.")
        );
        cli.ok("Thanks.");
        a.close();
    }, function() {
        cli.line();
        cli.error("An error occured during saving ...");
        a.close(1);
    });  
});
