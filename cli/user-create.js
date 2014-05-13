#!/usr/bin/env node

var readline        = require('readline'),
    clc             = require('cli-color'),
    cli             = require('../helpers/console'),
    Asker           = require('../helpers/asker'),
    UserHelper      = require('../helpers/user'),
    User            = require('../models').User,
    userValidator   = require('../validator').User,
    when            = require('when');

cli.banner();
cli.ok("Interactive command to add new user");
cli.line();

var a = new Asker([
    { key: 'email',     ask: 'email',       validate: [userValidator.email, userValidator.emailExist] },
    { key: 'password',  ask: 'password',    validate: [userValidator.password] }
]);

a.ask(function(response) {
    var password = response.password;
    response.password = UserHelper.generateHash(response.password);
    
    var createPromise = User.create(response)
        .then(function (createdUser) {
            cli.line();
            cli.line(cli.colorOk("The user ") 
                + cli.colorHighlightOk(createdUser.email) 
                + cli.colorOk(" has been registered with ") 
                + cli.colorHighlightOk(password) 
                + cli.colorOk(" password.")
            );
            cli.ok("Thanks.");
            a.close();
        }, function() {
            cli.line();
            cli.error("An error occured during saving ...");
            a.close(1);
        });
});

