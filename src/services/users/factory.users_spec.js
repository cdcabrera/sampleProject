
describe('Service, Users', function () {

    var injected = {
        service:        undefined,
        mockData:       undefined,
        $httpBackend:   undefined
    };


    /**
     * Load
     */
    beforeEach( module('mocks/users.json') );
    beforeEach( module('sampleProject') );


    /**
     * Capture
     */
    beforeEach( inject( function ($httpBackend, userFactory, mocksUsers) {

        injected.service = userFactory;
        injected.$httpBackend = $httpBackend;
        injected.mockData = mocksUsers;

        $httpBackend.when('GET', 'mocks/users.json').respond(200, mocksUsers);
    }));

    afterEach(function () {

        injected.$httpBackend.verifyNoOutstandingExpectation();
        injected.$httpBackend.verifyNoOutstandingRequest();
    });


    /**
     * Does service exist
     */
    it('should be a defined service', function () {

        expect(injected.service).toBeDefined();

    });


    /**
     * Does mock data exist
     */
    it('should have data available as array', function () {

        var valueType = Object.prototype.toString.call(injected.mockData);

        expect(valueType).toEqual('[object Array]');
    });


    /**
     * Do service methods exist
     */
    it('should have specific methods defined', function () {

        var service = injected.service;

        expect(Object.keys(service)).toContain('getUsers');
        expect(Object.keys(service)).toContain('getUser');
    });


    /**
     * Does the service response contain data.
     */
    it('should return filtered data', function () {

        var service = injected.service,
            serviceResponse;

        service.getUsers()
            .then(function(response) {

                serviceResponse = response;
            });

        injected.$httpBackend.flush();

        expect(Object.keys(serviceResponse)).toContain('byObject');
        expect(Object.keys(serviceResponse)).toContain('byArray');
    });
});