var validator       = require('validator'),
    errors          = require('./errors'),
    when            = require('when');

var content = function(content) {
    if (content.length <= 2 || content.length > 30) {
        return when.reject(errors[17]);
    }
    return when.resolve(content);
};

module.exports = {
    content: content
};
