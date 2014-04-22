var request     = require('supertest'),
    testTools   = require('./tools');

var app = require('../config/app')();

describe('GET /users/534da334b9f6c07517f6cbb9/status', function() {
    it('it is OK', function(done) {
        request(app)
            .get('/users/534da334b9f6c07517f6cbb9/status')
            .set('Authorization', testTools.buildBasicAuthorization('user1@test.lan', 'user1@test.lan'))
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

