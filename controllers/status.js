var express         = require('express'),
    StatusService   = require('../services').Status,
    StatusAdapter   = require('../adapter').Status,
    ObjectHelper    = require('../helpers/object');

/**
 * GET  /:id
 */
var status = function(req, res, next) {
    var promiseStatus = StatusService.findReadOnlyById(req.params.id);

    promiseStatus.then(function (data) {
        data = ObjectHelper.removeProperties(['__v'], data);
        data = StatusAdapter.hateoasize(['self'], data);
        res
            .contentType('application/json')
            .send(JSON.stringify(data));

    }, function(err) {
        next(err);
    });

};

var router = express.Router();
router.route('/:id').get(status);

module.exports.router = router;