var express         = require('express'),
    User            = require('../models').User,
    UserService     = require('../services').User,
    UserAdapter     = require('../adapter').User,
    StatusService   = require('../services').Status,
    StatusAdapter   = require('../adapter').Status,
    ObjectHelper    = require('../helpers/object');

/**
 * POST  /
 */
var create = function(req, res, next) {
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
 * GET  /:id
 */
var show = function(req, res, next) {
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
router.route('/').post(create);
router.route('/:id').get(show);
router.route('/:id/status').get(userStatus);

module.exports.router = router;