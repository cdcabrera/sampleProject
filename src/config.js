(function(window, angular, undefined) {

    'use strict';


    /**
     * Create a configuration object.
     *
     * @namespace Constant
     * @class config
     */
    angular
        .module('sampleProject.constants.config',[])
        .constant('config', {

            namespace:'sampleProject',
            partials: {

                viewHome: 'components/home/view.home.html',
                viewDetail: 'components/detail/view.detail.html',
                templateAddress: 'components/user-address/template.user-address.html'
            },
            services: {

                users: 'http://jsonplaceholder.typicode.com/users',
                reverseGeoCode: 'http://nominatim.openstreetmap.org/reverse?format=json&lat={0}&lon={1}&json_callback={2}'
            }

        });


})(this, window.angular);