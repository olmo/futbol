angular.module('MyApp')
    .controller('ViewWeekCtrl', ['$scope', '$location', '$stateParams', 'User', 'Week', function($scope, $location, $stateParams, User, Week) {

        Week.get({ _id: $stateParams.id }, function(week) {
            $scope.week = week;

        });

        $scope.deleteWeek = function(){
            Week.delete({id:$scope.week._id});
        };

    }]);