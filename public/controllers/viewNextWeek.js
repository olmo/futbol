angular.module('MyApp')
    .controller('viewNextWeekCtrl', ['$scope', '$location', '$stateParams', '$http', 'Week', 'WeekGenerate', function($scope, $location, $stateParams, $http, Week, WeekGenerate) {

        $http.get('/api/week/getNext')
            .success(function(week) {
                $scope.week = week;

                $scope.commas = function(players){
                    var names = [];
                    for(var player in players){
                        names.push(players[player].name);
                    }

                    return names.join(', ');
                }
            })
            .error(function() {

            })
        ;

        $scope.deleteWeek = function(){
            Week.delete({id:$scope.week._id});
        };

        $scope.generateTeams = function(){
            WeekGenerate.get({ _id: $scope.week._id }, function(week) {
                $scope.week = week;
            });
        };

    }]);