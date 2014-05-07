var ObjectHelper    = require('../helpers/object'),
    expect          = require("chai").expect;

describe('helpers.object', function(){

    it('removeProperties() - Remove properties from object', function() {

        var testObject = {
            property1: 'value',
            property2: 'value',
            property3: 'value',
            property4: 'value'
        };

        expect(testObject)
            .to.have.property('property1');

        expect(testObject)
            .to.have.property('property2');

        expect(testObject)
            .to.have.property('property3');

        expect(testObject)
            .to.have.property('property4');

        ObjectHelper.removeProperties(['property2', 'property4'], testObject);

        expect(testObject)
            .to.have.property('property1');

        expect(testObject)
            .to.not.have.property('property2');

        expect(testObject)
            .to.have.property('property3');

        expect(testObject)
            .to.not.have.property('property4');
    });

});