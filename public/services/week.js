angular.module('MyApp')
    .factory('Week', ['$resource', function($resource) {
        return $resource('/api/week/:_id', null,
            {
                'update': { method:'PUT' }
            }
        );
    }])
    .factory('WeekGenerate', ['$resource', function($resource) {
        return $resource('/api/week/:_id/generateTeams');
    }]);