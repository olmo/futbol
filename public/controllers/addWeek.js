angular.module('MyApp')
    .controller('AddWeekCtrl', ['$scope', '$location', 'Week', 'User', function($scope, $location, Week, User) {
        $scope.selected = {};
        $scope.selected.selectedPlayers = [];
        $scope.selected.selectedSubstitutes = [];
        $scope.substitutes = [];
        $scope.date = undefined;
        $scope.disableDate = false;
        $scope.titulo = 'Añadir Jornada';

        $scope.users = User.query(function(){
            var i;
            for(i=0; i<$scope.users.length; ++i){
                $scope.selected.selectedPlayers.push($scope.users[i]._id)
            }

            //$scope.substitutes = $scope.users;
        });

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.$watch('selected.selectedPlayers', function () {
            $scope.substitutes = [];
            $scope.selected.selectedSubstitutes = [];

            var i, j,k;
            for(i=0; i<$scope.users.length; ++i){
                var found = false;

                for(j=0; j<$scope.selected.selectedPlayers.length; ++j){
                    if($scope.users[i]._id === $scope.selected.selectedPlayers[j]){
                        found = true;
                        break;
                    }
                }
                if(!found){
                    $scope.substitutes.push($scope.users[i]);
                    $scope.selected.selectedSubstitutes.push($scope.users[i]._id);
                }
            }

            for(j=0; j<$scope.selected.selectedPlayers.length; ++j){
                for(k=0; k<$scope.selected.selectedSubstitutes.length; ++k)
                    if($scope.selected.selectedSubstitutes[k] === $scope.selected.selectedPlayers[j]){
                        $scope.selected.selectedSubstitutes.splice(k,1);
                        break;
                    }
            }

        }, true);

        $scope.addWeek = function() {
            Week.save({date:$scope.date, players: $scope.selected.selectedPlayers, substitutes: $scope.selected.selectedSubstitutes});
            $location.path('/');
        };

        $scope.dateOptions = {
            startingDay: 1
        };

    }]);