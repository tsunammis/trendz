var User = require('../models/user.js');

exports.list = function(req, res) {
  User.find(function(err, users) {
    res.send(users);
  });
}