var express         = require('express'),
    User            = require('../models/user'),
    UserService     = require('../services/users'),
    UserAdapter     = require('../adapter/users'),
    StatusService   = require('../services/status'),
    StatusAdapter   = require('../adapter/status');

/**
 * GET  /:id
 */
var user = function(req, res, next) {

    var promiseUser = UserService.findReadOnlyById(req.params.id);

    promiseUser.then(function (user) {

        user = UserAdapter.hiddenFields(user);
        user = UserAdapter.hateoasize(user);
        res
            .contentType('application/json')
            .send(JSON.stringify(user));

    }, function(err) {
        handleError(err);
    });

};

/**
 * GET  /:id/status
 */
var userStatus = function(req, res, next) {

    var promiseStatus = StatusService.findReadOnlyByUserId(req.params.id);

    promiseStatus.then(function (status) {

        res
            .contentType('application/json')
            .send(JSON.stringify(
                status
                    .map(StatusAdapter.hiddenFields)
                    .map(StatusAdapter.hateoasize)
            ));

    }, function(err) {
        handleError(err);
    });
};

var router = express.Router();
router.route('/:id').get(user);
router.route('/:id/status').get(userStatus);

module.exports.router = router;