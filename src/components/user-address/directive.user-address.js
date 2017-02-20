(function(window, angular, undefined) {

    'use strict';


    /**
     * Display a user's address.
     *
     * @namespace Directives
     * @class userAddress
     */
    angular
        .module('sampleProject.directives.userAddress', [

            'sampleProject.factories.userFactory'

        ])
        .directive('userAddress', [
            'userFactory',
            'config',
            function(userFactory, config) {

                var templateUrl = config.partials.templateAddress;


                return {

                    restrict: 'AE',

                    scope: {

                        userId: '&'
                    },

                    templateUrl: templateUrl,

                    link: function($scope, element, attrs, ctrl) {

                        $scope.data = {

                            userId: $scope.userId(),
                            address: {}
                        };


                        $scope.getUser = function() {

                            var id = $scope.data.userId;

                            userFactory.getUser(id)
                                .then(function(response) {

                                    $scope.data.address = response.address;
                                });
                        };

                        $scope.getUser();
                    }
                };

            }]);

})(this, window.angular);