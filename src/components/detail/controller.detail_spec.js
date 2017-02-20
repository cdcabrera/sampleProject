
describe('Controller, Detail', function () {

    var injected = {

        controller: null
    };


    /**
     * Load
     */
    beforeEach( module('mocks/users.json') );
    beforeEach( module('sampleProject') );


    /**
     * Capture
     */
    beforeEach( inject( function ($httpBackend, $controller, userFactory, mocksUsers) {

        injected.$httpBackend = $httpBackend;
        injected.controller = $controller;
        injected.service = userFactory;
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
    it('should get a user object', function() {

        var $scope = {};

        injected.controller('userDetailController', {$scope:$scope, $routeParams: {user: '1'}});

        $scope.getUser();

        injected.$httpBackend.flush();

        expect($scope.data.user).not.toEqual(null);

    });


    /**
     * Check to see if data has basic properties.
     */
    it('should have users with specific properties', function() {

        var $scope = {};

        injected.controller('userDetailController', {$scope: $scope, $routeParams: {user: '1'}});

        $scope.getUser();

        injected.$httpBackend.flush();

        expect($scope.data.user.name).toBeDefined();
        expect($scope.data.user.username).toBeDefined();
        expect($scope.data.user.email).toBeDefined();
        expect($scope.data.user.address).toBeDefined();

    });


});