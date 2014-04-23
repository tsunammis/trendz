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

    promiseUser.then(function (data) {

        data = UserAdapter.hiddenFields(data);
        data = UserAdapter.hateoasize(['self', 'status'], data);
        res
            .contentType('application/json')
            .send(JSON.stringify(data));

    }, function(err) {
        next(err);
    });

};

/**
 * GET  /:id/status
 */
var userStatus = function(req, res, next) {

    var promiseStatus = StatusService.findReadOnlyByUserId(req.params.id);

    promiseStatus.then(function (data) {

        data = data.map(StatusAdapter.hiddenFields);
        data = data.map(StatusAdapter.hateoasizeSelf);
        res
            .contentType('application/json')
            .send(JSON.stringify(data));

    }, function(err) {
        next(err);
    });
};

var router = express.Router();
router.route('/:id').get(user);
router.route('/:id/status').get(userStatus);

module.exports.router = router;