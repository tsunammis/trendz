var request     = require('supertest'),
    testTools   = require('./tools'),
    app         = require('./mock.app');

describe('GET /users/:id', function() {

    it('it is OK', function(done) {
        request(app)
            .get('/users/53584239a1294f5a24940590')
            .set('Authorization', testTools.buildBasicAuthorization('chuck@norris.com', 'chuck@norris.com'))
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('Unauthorized', function(done) {
        request(app)
            .get('/users/53584239a1294f5a24940590')
            .expect(401, done);
    });

});

