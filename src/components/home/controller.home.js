(function(window, angular, undefined) {

    'use strict';


    /**
     * Home controller.
     *
     * @namespace Controllers
     * @class homeController
     */
    angular
        .module('sampleProject.controllers.homeController', [

            'sampleProject.factories.userFactory',
            'sampleProject.directives.userAddress'

        ])
        .controller('homeController', [
            '$scope',
            'userFactory',
            'config',
            function($scope, userFactory, config) {

                $scope.data = {

                    users: [],
                    loading: true,
                    error: false
                };


                /**
                 * Get users for display.
                 *
                 * @memberof homeController
                 * @method getUsers
                 */
                $scope.getUsers = function() {

                    userFactory.getUsers()
                        .then(function (response) {

                            $scope.data.users = response.byArray;
                            $scope.data.loading = false;

                        }, function() {

                            $scope.data.error = true;
                            $scope.data.loading = false;
                        });
                };

                $scope.getUsers();

            }]);


})(this, window.angular);