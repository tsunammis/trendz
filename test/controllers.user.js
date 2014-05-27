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
                    .to.have.property('links');
                    
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
            .expect(404)
            .end(function(err, res) {
                
                if (err) {
                    return done(err);
                }
                
                expect(res)
                    .to.have.property('body')
                    .that.is.an('object');
                
                expect(res.body)
                    .to.have.property('message')
                    .to.equal("user not found");
                    
                expect(res.body)
                    .to.have.property('code')
                    .to.equal(14);
                    
                return done();
            });
    });
    
    it("ID's format is not good (Bad Request)", function(done) {
        request(app)
            .get('/users/1234')
            .set('Authorization', testTools.buildBasicAuthorization('chuck@norris.com', 'chuck@norris.com'))
            .expect(400)
            .end(function(err, res) {
                
                if (err) {
                    return done(err);
                }
                
                expect(res)
                    .to.have.property('body')
                    .that.is.an('object');
                
                expect(res.body)
                    .to.have.property('message')
                    .to.equal("the id's format is not valid");
                    
                expect(res.body)
                    .to.have.property('code')
                    .to.equal(13);
                    
                return done();
            });
    });

});

describe('POST /users', function() {

    it('Password is too short', function(done) {
        
        request(app)
            .post('/users')
            .set('Content-Type', 'application/json')
            .send({ password: 'my', password_confirm: 'my', email: 'chuck@crosoft.com'})
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function(err, res) {
                
                if (err) {
                    return done(err);
                }
                
                expect(res)
                    .to.have.property('body')
                    .that.is.an('object');
                
                expect(res.body)
                    .to.have.property('message')
                    .to.equal("the password's length is too short (3 min caracters)");
                    
                expect(res.body)
                    .to.have.property('code')
                    .to.equal(5);
                    
                return done();
            });
    });
    
    it('Password is too long', function(done) {
        
        request(app)
            .post('/users')
            .set('Content-Type', 'application/json')
            .send({ password: 'azertyuiopqsdfgh', password_confirm: 'azertyuiopqsdfgh', email: 'chuck@crosoft.com'})
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function(err, res) {
                
                if (err) {
                    return done(err);
                }
                
                expect(res)
                    .to.have.property('body')
                    .that.is.an('object');
                
                expect(res.body)
                    .to.have.property('message')
                    .to.equal("the password's length is too long (15 caracters max)");
                    
                expect(res.body)
                    .to.have.property('code')
                    .to.equal(6);
                    
                return done();
            });
    });

    it('Password and his confirmation are not the same', function(done) {
        
        request(app)
            .post('/users')
            .set('Content-Type', 'application/json')
            .send({ password: 'myPassword', password_confirm: 'myPass', email: 'chuck@crosoft.com'})
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function(err, res) {
                
                if (err) {
                    return done(err);
                }
                
                expect(res)
                    .to.have.property('body')
                    .that.is.an('object');
                
                expect(res.body)
                    .to.have.property('message')
                    .to.equal('Both password are not the same');
                    
                expect(res.body)
                    .to.have.property('code')
                    .to.equal(9);
                    
                return done();
            });
    });
    
    it('Email already exist', function(done) {
        
        request(app)
            .post('/users')
            .set('Content-Type', 'application/json')
            .send({ password: 'myPassword', password_confirm: 'myPassword', email: 'chuck@norris.com'})
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function(err, res) {
                
                if (err) {
                    return done(err);
                }
                
                expect(res)
                    .to.have.property('body')
                    .that.is.an('object');
                
                expect(res.body)
                    .to.have.property('message')
                    .to.equal('this email is already registered');
                    
                expect(res.body)
                    .to.have.property('code')
                    .to.equal(8);
                    
                return done();
            });
    });
    
    it('Email format is not good', function(done) {
        
        request(app)
            .post('/users')
            .set('Content-Type', 'application/json')
            .send({ password: 'myPassword', password_confirm: 'myPassword', email: 'chuck@norris'})
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function(err, res) {
                
                if (err) {
                    return done(err);
                }
                
                expect(res)
                    .to.have.property('body')
                    .that.is.an('object');
                
                expect(res.body)
                    .to.have.property('message')
                    .to.equal("the email's format is not valid");
                    
                expect(res.body)
                    .to.have.property('code')
                    .to.equal(11);
                    
                return done();
            });
    });
    
    it('It is OK', function(done) {
        
        request(app)
            .post('/users')
            .set('Content-Type', 'application/json')
            .send({ password: 'myPassword', password_confirm: 'myPassword', email: 'chuck@god.com'})
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function(err, res) {
                
                if (err) {
                    return done(err);
                }
                
                expect(res)
                    .to.have.property('body')
                    .that.is.an('object');
                
                expect(res.body)
                    .to.have.property('email')
                    .to.equal('chuck@god.com');
                    
                expect(res.body)
                    .to.have.property('_id');
                    
                expect(res.body)
                    .to.have.property('links');
                    
                return done();
            });
    });

});