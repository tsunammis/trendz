var validator       = require('validator'),
    when            = require('when'),
    Errors          = require('./errors');

var content = function(content) {
    if (content.length <= 2 || content.length > 30) {
        return when.reject(Errors[17]);
    }
    return when.resolve(content);
};

module.exports = {
    content: content
};
