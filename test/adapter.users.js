var adapterUsers    = require('../adapter/users.js'),
    expect          = require("chai").expect;

describe('Users Adapter', function(){

    it('hiddenFields() - hidden fields for Web Services', function() {

        var user = {
            _id         : "534da334b9f6c07517f6cbb9",
            __v         : 1,
            email       : 'chuck.norris@god.com',
            password    : '$2a$08$6IOj1E7zkDTodpJq6OeH0.6P9LAMYtXlzrlZkdjAYr60CIduX8lHa'
        };

        user = adapterUsers.hiddenFields(user);

        expect(user)
            .to.not.have.property('password');

        expect(user)
            .to.not.have.property('__v');

        expect(user)
            .to.have.property('email')
                .to.equal('chuck.norris@god.com');

        expect(user)
            .to.have.property('_id')
                .to.equal('534da334b9f6c07517f6cbb9');
    });

    it('hateoasize() - Add HATEOAS data to object', function() {

        var user = {
            _id         : "534da334b9f6c07517f6cbb9",
            email       : 'chuck.norris@god.com'
        };

        user = adapterUsers.hateoasize(['self', 'status'], user);

        expect(user)
            .to.have.property('links')
                .that.is.an('array');

        var self = user.links[0];

        expect(self)
            .to.have.property('rel')
                .to.equal('self');

        expect(self)
            .to.have.property('method')
                .to.equal('GET');

        expect(self)
            .to.have.property('href');

        var status = user.links[1];

        expect(status)
            .to.have.property('rel')
            .to.equal('status');

        expect(status)
            .to.have.property('method')
            .to.equal('GET');

        expect(status)
            .to.have.property('href');

    });

    it('hateoasizeSelf() - Add HATEOAS data to object', function() {

        var user = {
            _id         : "534da334b9f6c07517f6cbb9",
            email       : 'chuck.norris@god.com'
        };

        user = adapterUsers.hateoasizeSelf(user);

        expect(user)
            .to.have.property('links')
            .that.is.an('array');

        var self = user.links[0];

        expect(self)
            .to.have.property('rel')
            .to.equal('self');

        expect(self)
            .to.have.property('method')
            .to.equal('GET');

        expect(self)
            .to.have.property('href');

    });

});