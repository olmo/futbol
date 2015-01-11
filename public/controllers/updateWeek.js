angular.module('MyApp')
    .controller('UpdateWeekCtrl', ['$scope', '$location', '$stateParams', 'Week', 'User', function($scope, $location, $stateParams, Week, User) {
        $scope.selected = {};
        $scope.selected.selectedPlayers = [];
        $scope.selected.selectedSubstitutes = [];
        $scope.substitutes = [];
        $scope.disableDate = true;
        $scope.titulo = 'Modificar Jornada';

        $scope.users = User.query();


        Week.get({ _id: $stateParams.id }, function(week) {
            $scope.week = week;
            $scope.date = week.date;

            $scope.selected.selectedPlayers = week.players;

            //$scope.selected.selectedSubstitutes = week.substitutes;

            while($scope.users === undefined){}

            var found = false;

            for(var i=0; i<$scope.users.length; ++i){
                found = false;
                for(var j=0; j<week.players.length; ++j){
                    if($scope.users[i]._id == week.players[j]._id){
                        $scope.selected.selectedPlayers.push($scope.users[i]._id);
                        found = true;
                        break;
                    }
                }
                if(!found){
                    $scope.selected.selectedSubstitutes.push($scope.users[i]._id);
                }
            }
        });

        /*$scope.users = User.query(function(){
            var i;
            for(i=0; i<$scope.users.length; ++i){
                $scope.selected.selectedPlayers.push($scope.users[i]._id)
            }

            //$scope.substitutes = $scope.users;
        });*/

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
            Week.update({id:$scope.week._id}, {_id:$scope.week._id, date:$scope.date, players: $scope.selected.selectedPlayers, substitutes: $scope.selected.selectedSubstitutes});
            $location.path('/');
        };

        $scope.dateOptions = {
            startingDay: 1
        };

    }]);