var request     = require('supertest'),
    testTools   = require('./tools'),
    app         = require('./mock.app'),
    expect      = require("chai").expect;

describe('GET /me', function() {

    it('it is OK', function(done) {
        request(app)
            .get('/me')
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
            .get('/me')
            .expect(401, done);
    });

});

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

describe('PUT /me', function() {

    it('Password is too short', function(done) {
        request(app)
            .put('/me')
            .set('Content-Type', 'application/json')
            .set('Authorization', testTools.buildBasicAuthorization('put_user@mail.com', 'put_user@mail.com'))
            .send({ password: 'my', password_confirm: 'my'})
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
            .put('/me')
            .set('Content-Type', 'application/json')
            .set('Authorization', testTools.buildBasicAuthorization('put_user@mail.com', 'put_user@mail.com'))
            .send({ password: 'azertyuiopqsdfgh', password_confirm: 'azertyuiopqsdfgh' })
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
            .put('/me')
            .set('Content-Type', 'application/json')
            .set('Authorization', testTools.buildBasicAuthorization('put_user@mail.com', 'put_user@mail.com'))
            .send({ password: 'myPassword', password_confirm: 'myPass' })
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
            .put('/me')
            .set('Content-Type', 'application/json')
            .set('Authorization', testTools.buildBasicAuthorization('put_user@mail.com', 'put_user@mail.com'))
            .send({ email: 'chuck@norris.com'})
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
            .put('/me')
            .set('Content-Type', 'application/json')
            .set('Authorization', testTools.buildBasicAuthorization('put_user@mail.com', 'put_user@mail.com'))
            .send({ email: 'chuck@norris'})
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

    it('Not authorized to access this data (Unauthorized)', function(done) {
        request(app)
            .put('/me')
            .expect(401, done);
    });

    describe('It is ok', function() {

        it('It is ok (email)', function() {
            request(app)
                .put('/me')
                .set('Content-Type', 'application/json')
                .set('Authorization', testTools.buildBasicAuthorization('put_user@mail.com', 'put_user@mail.com'))
                .send({ email: 'put_user_updated@mail.com'})
                .expect('Content-Type', /json/)
                .expect(function(res) {

                    expect(res)
                        .to.have.property('body')
                        .that.is.an('object');

                    expect(res.body)
                        .to.have.property('email')
                        .to.equal('put_user_updated@mail.com');

                    expect(res.body)
                        .to.have.property('links');

                    expect(res.body)
                        .to.have.property('_id')
                        .to.equal('53584239a1294f5a24940594');

                })
                .expect(200);
        });

        it('It is ok (password)', function() {
            request(app)
                .put('/me')
                .set('Content-Type', 'application/json')
                .set('Authorization', testTools.buildBasicAuthorization('put_user_updated@mail.com', 'put_user_updated@mail.com'))
                .send({ password: 'put_user_updated@mail.com', password_confirm: 'put_user_updated@mail.com' })
                .expect('Content-Type', /json/)
                .expect(function(res) {

                    expect(res)
                        .to.have.property('body')
                        .that.is.an('object');

                    expect(res.body)
                        .to.have.property('email')
                        .to.equal('put_user_updated@mail.com');

                    expect(res.body)
                        .to.have.property('links');

                    expect(res.body)
                        .to.have.property('_id')
                        .to.equal('53584239a1294f5a24940594');

                })
                .expect(200);
        });

    });

});

describe('GET /project/:id/users', function() {

    it('it is OK', function(done) {
        request(app)
            .get('/project/53584239a1294f5a24940391/users')
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
                    .to.equal(2);

                user1 = body.data[0];

                expect(user1)
                    .to.contain.keys('_id', 'email', 'links');

                expect(user1)
                    .to.not.contain.keys('__v');

                expect(user1.email)
                    .to.equal('chuck@norris.com');

            })
            .expect(200, done);
    });

    it("Project's ID format is not good (Bad Request)", function(done) {
        request(app)
            .get('/project/239a1294f5a24940591/users')
            .set('Authorization', testTools.buildBasicAuthorization('chuck@norris.com', 'chuck@norris.com'))
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });

    it('Project not found', function(done) {
        request(app)
            .get('/project/aaa84239a1294f5a24940390/users')
            .set('Authorization', testTools.buildBasicAuthorization('chuck@norris.com', 'chuck@norris.com'))
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404, done);
    });

    it('Unauthorized (without credentials)', function(done) {
        request(app)
            .get('/project/53584239a1294f5a24940390/users')
            .set('Content-Type', 'application/json')
            .expect(401, done);
    });

});

describe('POST /project/:id/users', function() {

    it('User not found', function(done) {
        request(app)
            .post('/project/53584239a1294f5a24940395/users')
            .set('Authorization', testTools.buildBasicAuthorization('push_user_to_project@mail.com', 'push_user_to_project@mail.com'))
            .set('Content-Type', 'application/json')
            .send({ user: 'aaa84239a1294f5a24940598' })
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
                    .to.equal("user not found");

                expect(res.body)
                    .to.have.property('code')
                    .to.equal(14);

                return done();
            });
    });

    it('User already assigned', function(done) {
        request(app)
            .post('/project/53584239a1294f5a24940395/users')
            .set('Authorization', testTools.buildBasicAuthorization('push_user_to_project@mail.com', 'push_user_to_project@mail.com'))
            .set('Content-Type', 'application/json')
            .send({ user: '53584239a1294f5a24940597' })
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
                    .to.equal("the user is already assigned to the project");

                expect(res.body)
                    .to.have.property('code')
                    .to.equal(23);

                return done();
            });
    });

    it('Project not found', function(done) {
        request(app)
            .post('/project/aaa84239a1294f5a24940395/users')
            .set('Authorization', testTools.buildBasicAuthorization('push_user_to_project@mail.com', 'push_user_to_project@mail.com'))
            .set('Content-Type', 'application/json')
            .send({ user: '53584239a1294f5a24940598' })
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
                    .to.equal("project not found");

                expect(res.body)
                    .to.have.property('code')
                    .to.equal(18);

                return done();
            });
    });

    it("ID's format is not good (Bad Request)", function(done) {
        request(app)
            .post('/project/1234/users')
            .set('Authorization', testTools.buildBasicAuthorization('push_user_to_project@mail.com', 'push_user_to_project@mail.com'))
            .set('Content-Type', 'application/json')
            .send({ user: '53584239a1294f5a24940598' })
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

    it('Requester is not the owner', function(done) {
        request(app)
            .post('/project/53584239a1294f5a24940395/users')
            .set('Authorization', testTools.buildBasicAuthorization('chuck@norris.com', 'chuck@norris.com'))
            .set('Content-Type', 'application/json')
            .send({ user: '53584239a1294f5a24940598' })
            .expect(403)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }

                expect(res)
                    .to.have.property('body')
                    .that.is.an('object');

                expect(res.body)
                    .to.have.property('message')
                    .to.equal("you are not the owner of the project");

                expect(res.body)
                    .to.have.property('code')
                    .to.equal(22);

                return done();
            });
    });

    it('It is ok', function(done) {
        request(app)
            .post('/project/53584239a1294f5a24940395/users')
            .set('Authorization', testTools.buildBasicAuthorization('push_user_to_project@mail.com', 'push_user_to_project@mail.com'))
            .set('Content-Type', 'application/json')
            .send({ user: '53584239a1294f5a24940598' })
            .expect(200, done);
    });

});