var bcrypt      = require('bcrypt-nodejs'),
    ObjectId    = require('mongodb').BSONNative.ObjectID;

var generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

module.exports.Users = [
    {
        _id         : new ObjectId('53584239a1294f5a24940590'),
        email       : 'chuck@norris.com',
        password    : generateHash('chuck@norris.com')
    },
    {
        _id         : new ObjectId('53584239a1294f5a24940591'),
        email       : 'mark.nuremberg@mail.com',
        password    : generateHash('mark.nuremberg@mail.com')
    }
];

module.exports.Status = [
    {
        _id         : new ObjectId('53584239a1294f5a24940690'),
        content     : 'first status of user 1',
        date        : Date.now,
        user        : module.exports.Users[0]._id
    },
    {
        _id         : new ObjectId('53584239a1294f5a24940691'),
        content     : 'first status of user 2',
        date        : Date.now,
        user        : module.exports.Users[1]._id
    }
];