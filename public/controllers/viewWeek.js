angular.module('MyApp')
    .controller('ViewWeekCtrl', ['$scope', '$location', '$stateParams', 'Week', 'WeekGenerate', '$state', '$http',
        function($scope, $location, $stateParams, Week, WeekGenerate, $state, $http) {

        $scope.animClass = 'animScale';

        if($state.current.name==='main.viewWeek'){
            Week.get({ _id: $stateParams.id }, function(week) {
                $scope.week = week;

            });
        }
        else {
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
        }

        $scope.deleteWeek = function(){
            Week.delete({id:$scope.week._id});
        };

        $scope.generateTeams = function(){
            WeekGenerate.get({ _id: $stateParams.id }, function(week) {
                $scope.week = week;
            });
        };

    }]);