var request     = require('supertest'),
    testTools   = require('./tools'),
    app         = require('./mock.app');

describe('POST /project', function() {

    it('it is OK (without additional users)', function(done) {
        done();
    });

    it('it is OK (with additional users)', function(done) {
        done();
    });

    it("Additional user(s) doesn't exists", function(done) {
        done();
    });
    
    it('Name bad format', function(done) {
        done();
    });
    
    it('Slug bad format', function(done) {
        done();
    });
    
    it('Slug already exist', function(done) {
        done();
    });

    it('Unauthorized', function(done) {
        done();
    });

});

describe('PUT /project', function() {

    it('it is OK (with additional users)', function(done) {
        done();
    });

    it("Additional user(s) doesn't exists", function(done) {
        done();
    });
    
    it('Name bad format', function(done) {
        done();
    });
    
    it('Slug bad format', function(done) {
        done();
    });
    
    it('Slug already exist', function(done) {
        done();
    });

    it('Unauthorized', function(done) {
        done();
    });

});

describe('GET /project/:id', function() {

    it('it is OK', function(done) {
        done();
    });

    it("Project's ID format is not good (Bad Request)", function(done) {
        done();
    });

    it('Project not found', function(done) {
        done();
    });

    it('Unauthorized (without credentials)', function(done) {
        done();
    });
    
    it('Unauthorized (not rights on this project)', function(done) {
        done();
    });

});

describe('GET /project/:id/status', function() {

    it('it is OK', function(done) {
        done();
    });

    it("Project's ID format is not good (Bad Request)", function(done) {
        done();
    });

    it('Project not found', function(done) {
        done();
    });

    it('Unauthorized (without credentials)', function(done) {
        done();
    });
    
    it('Unauthorized (not rights on this project)', function(done) {
        done();
    });

});
