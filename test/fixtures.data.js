var userHelper  = require('../helpers/user'),
    ObjectId    = require('mongoose').Types.ObjectId;

module.exports.Users = [
    // Immutable users
    {
        _id         : new ObjectId('53584239a1294f5a24940590'),
        email       : 'chuck@norris.com',
        password    : userHelper.generateHash('chuck@norris.com')
    },
    {
        _id         : new ObjectId('53584239a1294f5a24940591'),
        email       : 'mark.nuremberg@mail.com',
        password    : userHelper.generateHash('mark.nuremberg@mail.com')
    },
    // Mutable users
    {
        _id         : new ObjectId('53584239a1294f5a24940593'),
        email       : 'larry@mail.com',
        password    : userHelper.generateHash('larry@mail.com')
    },
    {
        _id         : new ObjectId('53584239a1294f5a24940594'),
        email       : 'put_user@mail.com',
        password    : userHelper.generateHash('put_user@mail.com')
    },
    {
        _id         : new ObjectId('53584239a1294f5a24940595'),
        email       : 'delete_status@mail.com',
        password    : userHelper.generateHash('delete_status@mail.com')
    }
];

module.exports.Projects = [
    // Immutable projects
    {
        _id         : new ObjectId('53584239a1294f5a24940390'),
        name        : 'Make the new revolution',
        slug        : 'make_the_new_revolution',
        createdAt   : new Date(2014, 3, 1, 16, 46, 50),
        updatedAt   : new Date(2014, 3, 1, 16, 46, 50),
        owner       : module.exports.Users[1]._id,
        users       : [
            module.exports.Users[1]._id
        ]
    },
    {
        _id         : new ObjectId('53584239a1294f5a24940391'),
        name        : 'Build new home',
        slug        : 'build_new_home',
        createdAt   : new Date(2014, 4, 14, 9, 10, 10),
        updatedAt   : new Date(2014, 4, 14, 9, 10, 10),
        owner       : module.exports.Users[0]._id,
        users       : [
            module.exports.Users[1]._id,
            module.exports.Users[0]._id
        ]
    },
    // Mutable projects
    {
        _id         : new ObjectId('53584239a1294f5a24940392'),
        name        : 'Project mutable',
        slug        : 'project_mutable',
        createdAt   : new Date(2014, 4, 15, 9, 15, 10),
        updatedAt   : new Date(2014, 4, 15, 9, 15, 10),
        owner       : module.exports.Users[2]._id,
        users       : [
            module.exports.Users[2]._id
        ]
    },
    {
        _id         : new ObjectId('53584239a1294f5a24940393'),
        name        : 'Project mutable (put)',
        slug        : 'project_mutable_put',
        createdAt   : new Date(2014, 4, 15, 10, 15, 10),
        updatedAt   : new Date(2014, 4, 15, 10, 15, 10),
        owner       : module.exports.Users[2]._id,
        users       : [
            module.exports.Users[2]._id
        ]
    }
];

module.exports.Status = [
    // Immutable status
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
    {
        _id         : new ObjectId('53584239a1294f5a24940694'),
        content     : 'World cup ! In soccer',
        createdAt   : new Date(2014, 5, 21, 19, 35, 50),
        owner       : module.exports.Users[2]._id,
        project     : module.exports.Projects[3]._id
    },
    {
        _id         : new ObjectId('53584239a1294f5a24940695'),
        content     : 'Status to delete',
        createdAt   : new Date(2014, 5, 21, 19, 35, 50),
        owner       : module.exports.Users[4]._id
    }
];
