var BasicStrategy = require('passport-http').BasicStrategy,
    User          = require('../models/user.js');

module.exports = function(passport) {

    // ============
    // Authentication
    // ============
    passport.use(new BasicStrategy({},
        function(username, password, done) {

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({ 'email' :  username }, function(err, user) {

                // if there are any errors, return the error before anything else
                if (err) {
                    return done(err);
                }

                // if no user is found, return the message
                if (!user) {
                    return done(null, false);
                }

                // if the user is found but the password is wrong
                if (!user.validPassword(password)) {
                    return done(null, false);
                }

                return done(null, user);
            });
        }
    ));

    /*
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {

        console.error('local-signup: Start');

		// find a user whose email is the same as the forms email
		// we are checking to see if the user trying to login already exists
        User.findOne({ 'email' :  email }, function(err, user) {
            
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {
				// if there is no user with that email
                // create the user
                var newUser            = new User();

                // set the user's local credentials
                newUser.email    = email;
                newUser.password = newUser.generateHash(password);

				// save the user
                newUser.save(function(err) {
                    if (err) {
                        throw err;
                    }
                    return done(null, newUser);
                });
            }

        });

    }));
    */

};