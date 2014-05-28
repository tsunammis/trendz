var request     = require('supertest'),
    testTools   = require('./tools'),
    app         = require('./mock.app'),
    expect      = require("chai").expect;

describe('GET /project/:id', function() {

    it('it is OK', function(done) {
        request(app)
            .get('/project/53584239a1294f5a24940391')
            .set('Authorization', testTools.buildBasicAuthorization('chuck@norris.com', 'chuck@norris.com'))
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {

                if (err) {
                    return done(err);
                }

                expect(res.body)
                    .to.contain.keys('_id', 'name', 'slug', 'owner', 'users', 'createdAt', 'links');

                expect(res.body)
                    .to.not.contain.keys('__v');

                expect(res.body.name)
                    .to.equal('Build new home');

                expect(res.body.slug)
                    .to.equal('build_new_home');

                return done();
            });
    });

    it("Project's ID format is not good (Bad Request)", function(done) {
        request(app)
            .get('/project/1234')
            .set('Authorization', testTools.buildBasicAuthorization('chuck@norris.com', 'chuck@norris.com'))
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });

    it('Project not found', function(done) {
        request(app)
            .get('/project/aaa84239a1294f5a24940390')
            .set('Authorization', testTools.buildBasicAuthorization('chuck@norris.com', 'chuck@norris.com'))
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404, done);
    });

    it('Unauthorized (without credentials)', function(done) {
        request(app)
            .get('/project/53584239a1294f5a24940390')
            .set('Content-Type', 'application/json')
            .expect(401, done);
    });
    
    it('Unauthorized (not rights on this project)', function(done) {
        request(app)
            .get('/project/53584239a1294f5a24940390')
            .set('Authorization', testTools.buildBasicAuthorization('chuck@norris.com', 'chuck@norris.com'))
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(401, done);
    });

});

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

describe('PUT /project/:id', function() {

    it('it is OK (with additional users)', function(done) {
        done();
    });

    it("Name's length is too short", function(done) {
        request(app)
            .put('/project/53584239a1294f5a24940393')
            .set('Authorization', testTools.buildBasicAuthorization('larry@mail.com', 'larry@mail.com'))
            .set('Content-Type', 'application/json')
            .send({
                name: 'my'
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
            .put('/project/53584239a1294f5a24940393')
            .set('Authorization', testTools.buildBasicAuthorization('larry@mail.com', 'larry@mail.com'))
            .set('Content-Type', 'application/json')
            .send({
                name: 'My new project My new project M'
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
            .put('/project/53584239a1294f5a24940393')
            .set('Authorization', testTools.buildBasicAuthorization('larry@mail.com', 'larry@mail.com'))
            .set('Content-Type', 'application/json')
            .send({
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
            .put('/project/53584239a1294f5a24940393')
            .set('Authorization', testTools.buildBasicAuthorization('larry@mail.com', 'larry@mail.com'))
            .set('Content-Type', 'application/json')
            .send({
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
            .put('/project/53584239a1294f5a24940393')
            .set('Authorization', testTools.buildBasicAuthorization('larry@mail.com', 'larry@mail.com'))
            .set('Content-Type', 'application/json')
            .send({
                slug: 'my n'
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
            .put('/project/53584239a1294f5a24940393')
            .set('Authorization', testTools.buildBasicAuthorization('larry@mail.com', 'larry@mail.com'))
            .set('Content-Type', 'application/json')
            .send({
                slug: 'build_new_home'
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

    it('Project not found', function(done) {
        request(app)
            .put('/project/aaa84239a1294f5a24940390')
            .set('Authorization', testTools.buildBasicAuthorization('chuck@norris.com', 'chuck@norris.com'))
            .set('Content-Type', 'application/json')
            .send({})
            .expect(404, done);
    });

    it('Unauthorized (without credentials)', function(done) {
        request(app)
            .put('/project/53584239a1294f5a24940390')
            .set('Content-Type', 'application/json')
            .send({})
            .expect(401, done);
    });

    it('Unauthorized (not rights on this project)', function(done) {
        request(app)
            .put('/project/53584239a1294f5a24940390')
            .set('Authorization', testTools.buildBasicAuthorization('chuck@norris.com', 'chuck@norris.com'))
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .send({})
            .expect(401)
            .end(function(err, res) {

                if (err) {
                    return done(err);
                }

                expect(res)
                    .to.have.property('body')
                    .that.is.an('object');

                expect(res.body)
                    .to.have.property('message')
                    .to.equal("user not belong to project");

                expect(res.body)
                    .to.have.property('code')
                    .to.equal(19);

                return done();
            });
    });

});

describe('GET /users/:id/project', function() {

    it('it is OK', function(done) {
        request(app)
            .get('/users/53584239a1294f5a24940591/project')
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

                project1 = body.data[0];

                expect(project1)
                    .to.contain.keys('_id', 'name', 'slug', 'links');

                expect(project1)
                    .to.not.contain.keys('__v');

                expect(project1.slug)
                    .to.equal('build_new_home');

            })
            .expect(200, done);
    });

    it("User's ID format is not good (Bad Request)", function(done) {
        request(app)
            .get('/users/84239a1294f5a24940591/project')
            .set('Authorization', testTools.buildBasicAuthorization('chuck@norris.com', 'chuck@norris.com'))
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });

    it('User not found', function(done) {
        request(app)
            .get('/users/aaa84239a1294f5a24940390/project')
            .set('Authorization', testTools.buildBasicAuthorization('chuck@norris.com', 'chuck@norris.com'))
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404, done);
    });

    it('Unauthorized (without credentials)', function(done) {
        request(app)
            .get('/users/53584239a1294f5a24940390/project')
            .set('Content-Type', 'application/json')
            .expect(401, done);
    });

});

describe('GET /me/project', function() {

    it('it is OK', function(done) {
        request(app)
            .get('/me/project')
            .set('Authorization', testTools.buildBasicAuthorization('mark.nuremberg@mail.com', 'mark.nuremberg@mail.com'))
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

                project1 = body.data[0];

                expect(project1)
                    .to.contain.keys('_id', 'name', 'slug', 'links');

                expect(project1)
                    .to.not.contain.keys('__v');

                expect(project1.slug)
                    .to.equal('build_new_home');

            })
            .expect(200, done);
    });

    it('Unauthorized (without credentials)', function(done) {
        request(app)
            .get('/me/project')
            .set('Content-Type', 'application/json')
            .expect(401, done);
    });

});