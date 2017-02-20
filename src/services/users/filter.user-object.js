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

                function descendingSort(a, b) {

                    return b - a;
                }


                return function(userArr) {

                    var byId = {};

                    userArr.sort(descendingSort);

                    angular.forEach(userArr, function(userObj, index) {

                        byId[userObj.id] = userObj;
                        
                        //angular.forEach(userObj, function(userProps, key) {

                        //});
                    });

                    return byId;
                };

            }]);


})(this, window.angular);