#!/usr/bin/env node

var readline        = require('readline'),
    CommandAsker    = require('command-asker'),
    cli             = require('../helpers/console'),
    UserHelper      = require('../helpers/user'),
    User            = require('../models').User,
    userValidator   = require('../validator').User;

cli.banner();
cli.ok("Interactive command to add new user");
cli.line();

var a = new CommandAsker([
    { key: 'email',     ask: 'email',       validators: [userValidator.email, userValidator.emailNotExist] },
    { key: 'password',  ask: 'password',    validators: [userValidator.password] }
]);

a.ask(function(response) {
    var plainPassword = response.password;
    response.password = UserHelper.generateHash(response.password);
    
    var createPromise = User.create(response)
        .then(function (createdUser) {
            cli.line();
            cli.line(
                cli.colorOk("The user ") + cli.colorHighlightOk(createdUser.email) +
                cli.colorOk(" has been registered with ") + cli.colorHighlightOk(plainPassword) +
                cli.colorOk(" password.")
            );
            cli.ok("Thanks.");
            a.close();
        }, function() {
            cli.line();
            cli.error("An error occured during saving ...");
            a.close(1);
        });
});
