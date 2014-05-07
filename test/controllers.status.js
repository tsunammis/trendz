var request     = require('supertest'),
    testTools   = require('./tools'),
    app         = require('./mock.app');

describe('GET /users/:id/status', function() {

    it('it is OK', function(done) {
        request(app)
            .get('/users/53584239a1294f5a24940590/status')
            .set('Authorization', testTools.buildBasicAuthorization('chuck@norris.com', 'chuck@norris.com'))
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('Unauthorized', function(done) {
        request(app)
            .get('/users/53584239a1294f5a24940590/status')
            .expect(401, done);
    });

});

describe('GET /status/:id', function() {

    it('it is OK', function(done) {
        request(app)
            .get('/status/53584239a1294f5a24940690')
            .set('Authorization', testTools.buildBasicAuthorization('chuck@norris.com', 'chuck@norris.com'))
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('Unauthorized', function(done) {
        request(app)
            .get('/status/53584239a1294f5a24940690')
            .expect(401, done);
    });

});



