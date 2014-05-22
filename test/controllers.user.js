var request     = require('supertest'),
    testTools   = require('./tools'),
    app         = require('./mock.app'),
    expect      = require("chai").expect;

describe('GET /users/:id', function() {

    it('it is OK', function(done) {
        request(app)
            .get('/users/53584239a1294f5a24940590')
            .set('Authorization', testTools.buildBasicAuthorization('chuck@norris.com', 'chuck@norris.com'))
            .expect('Content-Type', /json/)
            .expect(function(res) {
                
                expect(res)
                    .to.have.property('body')
                    .that.is.an('object');
                
                expect(res.body)
                    .to.have.property('email')
                    .to.equal('chuck@norris.com');
                    
                expect(res.body)
                    .to.have.property('_id')
                    .to.equal('53584239a1294f5a24940590');
                    
            })
            .expect(200, done);
    });

    it('Not authorized to access this data (Unauthorized)', function(done) {
        request(app)
            .get('/users/53584239a1294f5a24940590')
            .expect(401, done);
    });
    
    it("User doesn't exist (Not found)", function(done) {
        request(app)
            .get('/users/12584239a1294f5a24940590')
            .set('Authorization', testTools.buildBasicAuthorization('chuck@norris.com', 'chuck@norris.com'))
            .expect(404, done);
    });
    
    it("ID's format is not good (Bad Request)", function(done) {
        request(app)
            .get('/users/1234')
            .set('Authorization', testTools.buildBasicAuthorization('chuck@norris.com', 'chuck@norris.com'))
            .expect(400, done);
    });

});
