(function(window, angular, undefined) {

    'use strict';


    /**
     * User factory/service.
     *
     * @namespace Factories
     * @class userFactory
     */
    angular
        .module('sampleProject.factories.userFactory',[

            'sampleProject.filters.userObjectFilter',
            'sampleProject.filters.userArrayFilter'

        ])
        .factory('userFactory',[
            '$http',
            '$q',
            '$filter',
            'config',
            function($http, $q, $filter, config) {

                var getUrl = config.services.users;


                return {


                    /**
                     * Return an array of users.
                     *
                     * @memberof userFactory
                     * @method getUsers
                     * @returns {Object} Promise
                     */
                    getUsers: function() {

                        var url = getUrl;

                        var filteredResponse = {

                            byObject: {},
                            byArray: []
                        };

                        return $http
                            .get(url, {
                                cache:true
                            })
                            .then(function(response) {

                                if (angular.isArray(response.data)) {

                                    filteredResponse.byObject = $filter('userObjectFilter')(response.data);
                                    filteredResponse.byArray = $filter('userArrayFilter')(response.data);
                                }

                                return filteredResponse;

                            }, function(error) {

                                return $q.reject(filteredResponse);
                            });
                    },


                    /**
                     * Return a specific user by ID.
                     *
                     * @memberof userFactory
                     * @method getUser
                     * @param id {String|Number}
                     * @returns {*}
                     */
                    getUser: function(id) {

                        var passedId = id;

                        return this
                            .getUsers()
                            .then(function(response) {

                                var user= null;

                                if (passedId in response.byObject) {

                                    user = response.byObject[passedId];
                                }

                                return user;
                            });
                    }
                };

            }]);


})(this, window.angular);