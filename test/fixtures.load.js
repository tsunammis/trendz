var MongoClient     = require('mongodb').MongoClient,
    DataFixtures    = require('./fixtures.data'),
    Configuration   = require('../config/configuration');

// Connect to the db
MongoClient.connect(Configuration.mongodb, function(err, db) {

    if (err) {
        return console.dir(err);
    }

    var collectionUsers     = db.collection('users');
    var collectionStatus    = db.collection('status');
    var collectionProject   = db.collection('projects');

    collectionUsers.remove(function(err) {
        collectionUsers.insert(DataFixtures.Users, {w:1}, function(err, result) {});
    });
    collectionStatus.remove(function(err) {
        collectionStatus.insert(DataFixtures.Status, {w:1}, function(err, result) {});
    });
    collectionProject.remove(function(err) {
        collectionProject.insert(DataFixtures.Projects, {w:1}, function(err, result) {});
    });

});