(function(window, angular, undefined) {

    'use strict';


    /**
     * Initialize app.
     *
     * @namespace Applications
     * @class sampleProject
     */
    angular
        .module('sampleProject', [

            'ngRoute',
            
            'sampleProject.constants.config',
            'sampleProject.controllers.homeController',
            'sampleProject.controllers.userDetailController'

        ])
        .config([
            '$routeProvider',
            'config',
            function($routeProvider, config) {

                var viewHome    = config.partials.viewHome,
                    viewDetail  = config.partials.viewDetail;


                $routeProvider
                    .when('/', {

                        templateUrl: viewHome,
                        caseInsensitiveMatch: true
                    })
                    .when('/detail/:user', {

                        templateUrl: viewDetail,
                        caseInsensitiveMatch: true
                    })
                    .otherwise({

                        redirectTo: '/'
                    });


            }]);


})(this, window.angular);