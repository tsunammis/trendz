var adapterStatus   = require('../adapter/status.js'),
    expect          = require("chai").expect;

describe('Status Adapter', function(){

    it('hiddenFields() - hidden fields for Web Services', function() {

        var status = {
            _id         : "534da334b9f6c07517f6cbb9",
            __v         : 1,
            content     : 'Content of status',
            date        : '2014-04-15T21:23:05.811Z',
            user        : '534da334b9f6c07517f6cbb9'
        };

        status = adapterStatus.hiddenFields(status);

        expect(status)
            .to.have.property('content')
                .to.equal('Content of status');

        expect(status)
            .to.not.have.property('__v');

        expect(status)
            .to.have.property('date');

        expect(status)
            .to.have.property('_id')
                .to.equal('534da334b9f6c07517f6cbb9');
    });

    it('hateoasize() - Add HATEOAS data to object', function() {

        var status = {
            _id         : "534da334b9f6c07517f6cbb9",
            __v         : 1,
            content     : 'Content of status',
            date        : '2014-04-15T21:23:05.811Z',
            user        : '534da334b9f6c07517f6cbb9'
        };

        status = adapterStatus.hateoasize(['self'], status);

        expect(status)
            .to.have.property('links')
                .that.is.an('array');

        var self = status.links[0];

        expect(self)
            .to.have.property('rel')
                .to.equal('self');

        expect(self)
            .to.have.property('method')
                .to.equal('GET');

        expect(self)
            .to.have.property('href');

    });

    it('hateoasizeSelf() - Add HATEOAS data to object', function() {

        var status = {
            _id         : "534da334b9f6c07517f6cbb9",
            __v         : 1,
            content     : 'Content of status',
            date        : '2014-04-15T21:23:05.811Z',
            user        : '534da334b9f6c07517f6cbb9'
        };

        status = adapterStatus.hateoasizeSelf(status);

        expect(status)
            .to.have.property('links')
            .that.is.an('array');

        var self = status.links[0];

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