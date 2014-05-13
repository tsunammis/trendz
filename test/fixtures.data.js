var UserHelper  = require('../helpers/user'),
    ObjectId    = require('mongodb').BSONNative.ObjectID;

module.exports.Users = [
    {
        _id         : new ObjectId('53584239a1294f5a24940590'),
        email       : 'chuck@norris.com',
        password    : UserHelper.generateHash('chuck@norris.com')
    },
    {
        _id         : new ObjectId('53584239a1294f5a24940591'),
        email       : 'mark.nuremberg@mail.com',
        password    : UserHelper.generateHash('mark.nuremberg@mail.com')
    }
];

module.exports.Status = [
    {
        _id         : new ObjectId('53584239a1294f5a24940690'),
        content     : 'first status of user 1',
        createdAt   : Date.now,
        user        : module.exports.Users[0]._id
    },
    {
        _id         : new ObjectId('53584239a1294f5a24940691'),
        content     : 'first status of user 2',
        createdAt   : Date.now,
        user        : module.exports.Users[1]._id
    }
];

module.exports.Projects = [
    {
        _id         : new ObjectId('53584239a1294f5a24940390'),
        name        : 'Make the new revolution',
        slug        : 'make_the_new_revolution',
        createdAt   : Date.now,
        users       : [
            module.exports.Users[1]._id
        ]
    },
    {
        _id         : new ObjectId('53584239a1294f5a24940391'),
        name        : 'Build new home',
        slug        : 'build_new_home',
        createdAt   : Date.now,
        users       : [
            module.exports.Users[1]._id,
            module.exports.Users[0]._id
        ]
    }
];