var request     = require('supertest'),
    testTools   = require('./tools'),
    app         = require('./mock.app'),
    expect      = require("chai").expect;

describe('GET /users/:id/status', function() {

    it('it is OK', function(done) {
        request(app)
            .get('/users/53584239a1294f5a24940590/status')
            .set('Authorization', testTools.buildBasicAuthorization('chuck@norris.com', 'chuck@norris.com'))
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res) {
                
                expect(res)
                    .to.have.property('body')
                    .that.is.an('object');
                
                var body = res.body;
                
                expect(body)
                    .to.have.property('data')
                    .that.is.an('array');
                    
                expect(body.data.length)
                    .to.equal(3);
                 
                status1 = body.data[0]; 
                    
                expect(status1)
                    .to.contain.keys('_id', 'content', 'owner', 'createdAt', 'project', 'links');
                    
                expect(status1)
                    .to.not.contain.keys('__v');
                    
                expect(status1.content)
                    .to.equal('there are somebody here ?');
                    
            })
            .expect(200, done);
    });

    it('Not authorized to access this data (Unauthorized)', function(done) {
        request(app)
            .get('/users/53584239a1294f5a24940590/status')
            .expect(401, done);
    });
    
    it("User doesn't exist (Not found)", function(done) {
        request(app)
            .get('/users/12584239a1294f5a24940590/status')
            .set('Authorization', testTools.buildBasicAuthorization('chuck@norris.com', 'chuck@norris.com'))
            .expect(404, done);
    });
    
    it("User ID's format is not good (Bad Request)", function(done) {
        request(app)
            .get('/users/1234/status')
            .set('Authorization', testTools.buildBasicAuthorization('chuck@norris.com', 'chuck@norris.com'))
            .expect(400, done);
    });

});

describe('GET /status/:id', function() {

    it('it is OK', function(done) {
        
        request(app)
            .get('/status/53584239a1294f5a24940690')
            .set('Authorization', testTools.buildBasicAuthorization('chuck@norris.com', 'chuck@norris.com'))
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res) {
                
                expect(res.body)
                    .to.contain.keys('_id', 'content', 'owner', 'createdAt', 'links');
                    
                expect(res.body)
                    .to.not.contain.keys('__v');
                    
                expect(res.body.content)
                    .to.equal('I begin my first project');
                    
            })
            .expect(200, done);
    });

    it("ID's format is not good (Bad Request)", function(done) {
        
        request(app)
            .get('/status/1234')
            .set('Authorization', testTools.buildBasicAuthorization('chuck@norris.com', 'chuck@norris.com'))
            .expect(400, done);
            
    });

});
