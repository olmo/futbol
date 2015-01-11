angular.module('MyApp')
    .controller('ViewWeekCtrl', ['$scope', '$location', '$stateParams', 'Week', 'WeekGenerate', function($scope, $location, $stateParams, Week, WeekGenerate) {

        Week.get({ _id: $stateParams.id }, function(week) {
            $scope.week = week;

        });

        $scope.deleteWeek = function(){
            Week.delete({id:$scope.week._id});
        };

        $scope.generateTeams = function(){
            WeekGenerate.get({ _id: $stateParams.id }, function(week) {
                $scope.week = week;
            });
        };

    }]);