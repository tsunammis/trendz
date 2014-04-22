var request     = require('supertest'),
    testTools   = require('./tools');

var app = require('../config/app')();

describe('GET /users/534da334b9f6c07517f6cbb9', function() {
    it('it is OK', function(done) {
        request(app)
            .get('/users/534da334b9f6c07517f6cbb9')
            .set('Authorization', testTools.buildBasicAuthorization('user1@test.lan', 'user1@test.lan'))
            .expect('Content-Type', /json/)
            // .expect('Content-Length', '20')
            .expect(200, done);
    });

    it('Unauthorized', function(done) {
        request(app)
            .get('/users/534da334b9f6c07517f6cbb9')
            .expect(401, done);
    });
});

