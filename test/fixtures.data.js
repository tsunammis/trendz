var bcrypt      = require('bcrypt-nodejs'),
    ObjectId    = require('mongodb').BSONNative.ObjectID;

var generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

module.exports.User = {
    user1: {
        _id         : new ObjectId(),
        email       : 'chuck@norris.com',
        password    : generateHash('chuck@norris.com')
    },
    user2: {
        _id         : new ObjectId(),
        email       : 'mark.nuremberg@mail.com',
        password    : generateHash('mark.nuremberg@mail.com')
    }
};

module.exports.Status = {
    status1: {
        _id         : new ObjectId(),
        content     : 'first status of user 1',
        date        : Date.now,
        user        : module.exports.User.user1
    },
    status2: {
        _id         : new ObjectId(),
        content     : 'first status of user 2',
        date        : Date.now,
        user        : module.exports.User.user2
    }
};