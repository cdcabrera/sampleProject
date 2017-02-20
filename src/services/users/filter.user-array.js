(function(window, angular, undefined){

    'use strict';


    /**
     * Filter/sort users by ID.
     *
     * @namespace userFactory
     * @class userArrayFilter
     */
    angular
        .module('sampleProject.filters.userArrayFilter', [

        ])
        .filter('userArrayFilter', [
            function() {


                return function(userArr) {

                    var cloneArr = angular.copy(userArr);


                    cloneArr.sort(function(a, b) {

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


                    return cloneArr;
                };

            }]);


})(this, window.angular);