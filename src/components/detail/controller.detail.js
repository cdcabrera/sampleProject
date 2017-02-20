(function(window, angular, undefined) {

    'use strict';


    /**
     * User detail controller.
     *
     * @namespace Controllers
     * @class userDetailController
     */
    angular
        .module('sampleProject.controllers.userDetailController', [

            'sampleProject.factories.userFactory',
            'sampleProject.directives.userAddress'

        ])
        .controller('userDetailController', [
            '$scope',
            '$routeParams',
            'userFactory',
            'config',
            function($scope, $routeParams, userFactory, config) {

                $scope.data = {

                    id:         $routeParams.user,
                    user:       null,
                    loading:    true,
                    error:      false
                };


                /**
                 * Get user details from route parameter.
                 *
                 * @memberof userDetailController
                 * @method getUser
                 */
                $scope.getUser = function() {

                    var id = $scope.data.id;

                    userFactory.getUser(id)
                        .then(function(response) {

                            $scope.data.user = response;
                            $scope.data.loading = false;

                        }, function() {

                            $scope.data.error = true;
                            $scope.data.loading = false;
                        });
                };

                $scope.getUser();

            }]);


})(this, window.angular);