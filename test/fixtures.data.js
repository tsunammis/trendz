var UserHelper  = require('../helpers/user'),
    ObjectId    = require('mongoose').Types.ObjectId;

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

module.exports.Projects = [
    {
        _id         : new ObjectId('53584239a1294f5a24940390'),
        name        : 'Make the new revolution',
        slug        : 'make_the_new_revolution',
        createdAt   : Date.now,
        owner       : module.exports.Users[1]._id,
        users       : [
            module.exports.Users[1]._id
        ]
    },
    {
        _id         : new ObjectId('53584239a1294f5a24940391'),
        name        : 'Build new home',
        slug        : 'build_new_home',
        createdAt   : Date.now,
        owner       : module.exports.Users[0]._id,
        users       : [
            module.exports.Users[1]._id,
            module.exports.Users[0]._id
        ]
    }
];

module.exports.Status = [
    {
        _id         : new ObjectId('53584239a1294f5a24940690'),
        content     : 'I begin my first project',
        createdAt   : new Date(2014, 5, 21, 14, 30, 15),
        owner       : module.exports.Users[0]._id
    },
    {
        _id         : new ObjectId('53584239a1294f5a24940691'),
        content     : 'Hello everybody',
        createdAt   : new Date(2014, 5, 21, 15, 31, 45),
        owner       : module.exports.Users[1]._id,
        project     : module.exports.Projects[0]._id
    },
    {
        _id         : new ObjectId('53584239a1294f5a24940692'),
        content     : 'the new fruit juice of MissFruit is awesome !',
        createdAt   : new Date(2014, 5, 21, 17, 30, 45),
        owner       : module.exports.Users[0]._id
    },
    {
        _id         : new ObjectId('53584239a1294f5a24940693'),
        content     : 'there are somebody here ?',
        createdAt   : new Date(2014, 5, 21, 18, 30, 45),
        owner       : module.exports.Users[0]._id,
        project     : module.exports.Projects[0]._id
    },
];
