var request     = require('supertest'),
    testTools   = require('./tools'),
    app         = require('./mock.app'),
    expect      = require("chai").expect;

describe('POST /project', function() {

    it('it is OK', function(done) {
        request(app)
            .post('/project')
            .set('Authorization', testTools.buildBasicAuthorization('chuck@norris.com', 'chuck@norris.com'))
            .set('Content-Type', 'application/json')
            .send({
                name: 'My new project',
                slug: 'my_new_project'
            })
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function(err, res) {

                if (err) {
                    return done(err);
                }

                expect(res.body)
                    .to.contain.keys('_id', 'name', 'slug', 'createdAt', 'links');

                expect(res.body)
                    .to.not.contain.keys('__v');

                expect(res.body.name)
                    .to.equal('My new project');

                expect(res.body.slug)
                    .to.equal('my_new_project');

                return done();
            });
    });
    
    it("Name's length is too short", function(done) {
        request(app)
            .post('/project')
            .set('Authorization', testTools.buildBasicAuthorization('chuck@norris.com', 'chuck@norris.com'))
            .set('Content-Type', 'application/json')
            .send({
                name: 'my',
                slug: 'my_new_project'
            })
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
                    .to.equal("project.name's length must be between 3 and 30 caracters");

                expect(res.body)
                    .to.have.property('code')
                    .to.equal(1);

                return done();
            });
    });

    it("Name's length is too long", function(done) {
        request(app)
            .post('/project')
            .set('Authorization', testTools.buildBasicAuthorization('chuck@norris.com', 'chuck@norris.com'))
            .set('Content-Type', 'application/json')
            .send({
                name: 'My new project My new project M',
                slug: 'my_new_project'
            })
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
                    .to.equal("project.name's length must be between 3 and 30 caracters");

                expect(res.body)
                    .to.have.property('code')
                    .to.equal(1);

                return done();
            });
    });

    it("Slug's length is too short", function(done) {
        request(app)
            .post('/project')
            .set('Authorization', testTools.buildBasicAuthorization('chuck@norris.com', 'chuck@norris.com'))
            .set('Content-Type', 'application/json')
            .send({
                name: 'My new project',
                slug: 'my'
            })
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
                    .to.equal("project.slug's length must be between 3 and 30 caracters");

                expect(res.body)
                    .to.have.property('code')
                    .to.equal(20);

                return done();
            });
    });

    it("Slug's length is too long", function(done) {
        request(app)
            .post('/project')
            .set('Authorization', testTools.buildBasicAuthorization('chuck@norris.com', 'chuck@norris.com'))
            .set('Content-Type', 'application/json')
            .send({
                name: 'My new project',
                slug: 'my_new_project_my_new_project_m'
            })
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
                    .to.equal("project.slug's length must be between 3 and 30 caracters");

                expect(res.body)
                    .to.have.property('code')
                    .to.equal(20);

                return done();
            });
    });

    it("Slug's format is not valid", function(done) {
        request(app)
            .post('/project')
            .set('Authorization', testTools.buildBasicAuthorization('chuck@norris.com', 'chuck@norris.com'))
            .set('Content-Type', 'application/json')
            .send({
                name: 'My new project',
                slug: 'my new_project'
            })
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
                    .to.equal("the slug's format is not valid");

                expect(res.body)
                    .to.have.property('code')
                    .to.equal(12);

                return done();
            });
    });
    
    it('Slug already exist', function(done) {
        request(app)
            .post('/project')
            .set('Authorization', testTools.buildBasicAuthorization('chuck@norris.com', 'chuck@norris.com'))
            .set('Content-Type', 'application/json')
            .send({
                name: 'Make the new revolution',
                slug: 'make_the_new_revolution'
            })
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
                    .to.equal("project.slug already exist");

                expect(res.body)
                    .to.have.property('code')
                    .to.equal(4);

                return done();
            });
    });

    it('Not authorized to access this data (Unauthorized)', function(done) {
        request(app)
            .post('/project')
            .set('Content-Type', 'application/json')
            .send({})
            .expect(401, done);
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
