angular.module('MyApp')
    .factory('Rating', ['$resource', function($resource) {
        return $resource('/api/rating/:_id');
    }]);