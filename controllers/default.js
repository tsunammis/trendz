
/**
 * Handler for 404 HTTP Error
 *
 * @param {Request}     request
 * @param {Response}    response
 * @param {function}    next
 */
var error404 = function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Not found');
};

module.exports.error404 = error404;