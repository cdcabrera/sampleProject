
describe('Controller, Home', function () {

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
    it('should get an array of users', function() {

        var $scope = {};

        injected.controller('homeController', {$scope:$scope});

        $scope.getUsers();

        injected.$httpBackend.flush();

        expect(Array.isArray($scope.data.users)).toEqual(true);

    });


    /**
     * Check to see if data has properties.
     */
    it('should have users with specific properties', function() {

        var $scope = {};

        injected.controller('homeController', {$scope: $scope});

        $scope.getUsers();

        injected.$httpBackend.flush();

        $scope.data.users.map(function(value, index) {

            expect(value.name).toBeDefined();
            expect(value.username).toBeDefined();
            expect(value.email).toBeDefined();
            expect(value.address).toBeDefined();
        });

    });


    /**
     * Sorting check
     */
    it('should have users sorted by descending name', function() {

        var $scope = {},
            cloneUsersArr;

        injected.controller('homeController', {$scope: $scope});

        $scope.getUsers();

        injected.$httpBackend.flush();

        cloneUsersArr = $scope.data.users.slice(0);


        cloneUsersArr.sort(function(a, b) {

            var ret     = 0,
                aName   = a.name.toLowerCase(),
                bName   = b.name.toLowerCase();

            if(bName < aName) {

                ret = -1;

            } else if(bName > aName) {

                ret = 1;
            }

            return ret;
        });


        cloneUsersArr.map(function(value, index) {

            expect($scope.data.users[index].name).toEqual(value.name);
        });
    });
    

    /*beforeEach(module('app'));

    var $controller;

    beforeEach(inject(function(_$controller_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));

    describe('$scope.grade', function() {
        it('sets the strength to "strong" if the password length is >8 chars', function() {
            var $scope = {};
            var controller = $controller('PasswordController', { $scope: $scope });
            $scope.password = 'longerthaneightchars';
            $scope.grade();
            expect($scope.strength).toEqual('strong');
        });
    });*/
});