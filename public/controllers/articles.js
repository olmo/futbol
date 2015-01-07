angular.module('MyApp')
    .controller('ArticlesCtrl', ['$scope', '$location', '$stateParams', '$http', 'Week', function($scope, $location, $stateParams, $http, Week) {

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

    }]);