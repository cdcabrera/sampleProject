
describe('Directive, Address', function () {

    var injected = {

        $compile: null,
        html: '<user-address user-id="1"></user-address>'
    };


    /**
     * Load
     */
    beforeEach( module('htmlTemplates') );
    beforeEach( module('mocks/users.json') );
    beforeEach( module('sampleProject') );


    /**
     * Capture
     */
    beforeEach( inject( function ($rootScope, $httpBackend, $compile, mocksUsers) {

        injected.$rootScope = $rootScope;
        injected.$httpBackend = $httpBackend;
        injected.$compile = $compile;
        injected.mockData = mocksUsers;

        $httpBackend.when('GET', 'mocks/users.json').respond(200, mocksUsers);
    }));

    afterEach(function () {

        injected.$httpBackend.verifyNoOutstandingExpectation();
        injected.$httpBackend.verifyNoOutstandingRequest();
    });


    /**
     * Check to see if data being returned from mock.
     */
    it('should rendered properties', function() {

        var element = injected.$compile(injected.html)(injected.$rootScope);

        injected.$httpBackend.flush();
        injected.$rootScope.$digest();

        expect(element[0].querySelectorAll('span').length).toBeGreaterThanOrEqual(4);

        Array.prototype.slice.call(element[0].querySelectorAll('span > span')).map(function(value, index) {

            expect(value.innerText.length).toBeGreaterThan(1);
        });
    });

});