(function(window, angular, undefined){

    'use strict';


    /**
     * Filter/sort users by ID.
     *
     * @namespace userFactory
     * @class userObjectFilter
     */
    angular
        .module('sampleProject.filters.userObjectFilter', [

        ])
        .filter('userObjectFilter', [
            function() {


                return function(userArr) {

                    var byId = {};

                    angular.forEach(userArr, function(userObj, index) {

                        byId[userObj.id] = userObj;
                    });

                    return byId;
                };

            }]);


})(this, window.angular);