var fixtures = require('pow-mongoose-fixtures');

module.exports = function() {
    fixtures.load(__dirname + '/fixtures.data.js');
}