var userHelper  = require('../helpers/user'),
    ObjectId    = require('mongoose').Types.ObjectId;

module.exports.Users = [
    // Immutable users
    {
        // 0
        _id         : new ObjectId('53584239a1294f5a24940590'),
        email       : 'chuck@norris.com',
        password    : userHelper.generateHash('chuck@norris.com')
    },
    {
        // 1
        _id         : new ObjectId('53584239a1294f5a24940591'),
        email       : 'mark.nuremberg@mail.com',
        password    : userHelper.generateHash('mark.nuremberg@mail.com')
    },
    // Mutable users
    {
        // 2
        _id         : new ObjectId('53584239a1294f5a24940593'),
        email       : 'larry@mail.com',
        password    : userHelper.generateHash('larry@mail.com')
    },
    {
        // 3
        _id         : new ObjectId('53584239a1294f5a24940594'),
        email       : 'put_user@mail.com',
        password    : userHelper.generateHash('put_user@mail.com')
    },
    {
        // 4
        _id         : new ObjectId('53584239a1294f5a24940595'),
        email       : 'delete_status@mail.com',
        password    : userHelper.generateHash('delete_status@mail.com')
    },
    {
        // 5
        _id         : new ObjectId('53584239a1294f5a24940596'),
        email       : 'delete_project@mail.com',
        password    : userHelper.generateHash('delete_project@mail.com')
    },
    {
        // 6
        _id         : new ObjectId('53584239a1294f5a24940597'),
        email       : 'push_user_to_project@mail.com',
        password    : userHelper.generateHash('push_user_to_project@mail.com')
    },
    {
        // 7
        _id         : new ObjectId('53584239a1294f5a24940598'),
        email       : 'push_user_to_project2@mail.com',
        password    : userHelper.generateHash('push_user_to_project2@mail.com')
    }
];

module.exports.Projects = [
    // Immutable projects
    {
        // 0
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
        // 1
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
        // 2
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
        // 3
        _id         : new ObjectId('53584239a1294f5a24940393'),
        name        : 'Project mutable (put)',
        slug        : 'project_mutable_put',
        createdAt   : new Date(2014, 4, 15, 10, 15, 10),
        updatedAt   : new Date(2014, 4, 15, 10, 15, 10),
        owner       : module.exports.Users[2]._id,
        users       : [
            module.exports.Users[2]._id
        ]
    },
    {
        // 4
        _id         : new ObjectId('53584239a1294f5a24940394'),
        name        : 'Project mutable (delete)',
        slug        : 'project_mutable_delete',
        createdAt   : new Date(2014, 4, 15, 10, 15, 10),
        updatedAt   : new Date(2014, 4, 15, 10, 15, 10),
        owner       : module.exports.Users[5]._id,
        users       : [
            module.exports.Users[5]._id
        ]
    },
    {
        // 5
        _id         : new ObjectId('53584239a1294f5a24940395'),
        name        : 'Project mutable (push user)',
        slug        : 'project_mutable_push_user',
        createdAt   : new Date(2014, 4, 16, 11, 15, 10),
        updatedAt   : new Date(2014, 4, 16, 11, 15, 10),
        owner       : module.exports.Users[6]._id,
        users       : [
            module.exports.Users[6]._id
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
