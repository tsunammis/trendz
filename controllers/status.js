var security = require('../middlewares/security.js'),
    User     = require('../models/user.js'),
    Status   = require('../models/status.js'),
    console  = require('console');

module.exports = function(app) {

    'use strict';

    // ============
    // [GET] /
    // Desc: Status list
    // ============
    app.route('/')
        .all(security.isLogged)
        .get(function(req, res, next) {

            console.log('GET /status');

            var result = [];

            Status
                .find({})
                .limit(20)
                .sort('-date')
                .populate('user')
                .exec(function (err, result) {
                    if (err) {
                        return handleError(err);
                    }

                    console.log(result);

                    res.render('status.ejs', { listStatus: result });
                });
        });

    // ============
    // [GET] /me
    // Desc: Status list for connected user
    // ============
    app.route('/me')
        .all(security.isLogged)
        .get(function(req, res, next) {

            console.log('GET /me');

            var result = [];

            Status
                .find({ user: req.user._id })
                .limit(20)
                .sort('-date')
                .populate('user')
                .exec(function (err, result) {
                    if (err) {
                        return handleError(err);
                    }

                    console.log(result);

                    res.render('status.ejs', { listStatus: result });
                });

        });

    // ============
    // [POST] /status
    // Desc: Add status
    // ============
    app.route('/status')
        .all(security.isLogged)
        .post(function(req, res, next) {

            console.log('POST /status');

            var newStatus = new Status({ user: req.user, content: req.body.status.content });

            newStatus.save(function (err) {
                // err is our ValidationError object
                // err.errors.color is a ValidatorError object
                console.log(err); // prints "ValidationError"
            });

            res.redirect('/');
        });
	
};