var express         = require('express'),
    User            = require('../models/user'),
    UserService     = require('../services/users'),
    UserAdapter     = require('../adapter/users'),
    StatusService   = require('../services/status'),
    StatusAdapter   = require('../adapter/status'),
    ObjectHelper    = require('../helpers/object');

/**
 * GET  /:id
 */
var user = function(req, res, next) {

    var promiseUser = UserService.findReadOnlyById(req.params.id);

    promiseUser.then(function (data) {

        data = ObjectHelper.removeProperties(['__v', 'password'], data);
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

        data = data.map(function(object) {
            ObjectHelper.removeProperties(['__v', 'password'], object);
        });
        data = data.map(function(object) {
            StatusAdapter.hateoasize(['self'], object);
        });
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