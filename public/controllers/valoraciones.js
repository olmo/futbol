angular.module('MyApp')
    .controller('ValoracionesCtrl', ['$scope', '$location', 'User', 'Rating', function($scope, $location, User, Rating) {
        $scope.max = 5;
        $scope.isReadonly = false;
        $scope.rate = 2;

        function getRatings() {
            var rats = Rating.query();
            $scope.vals = [];

            $scope.users = User.query(function () {
                var i, j;
                var added = false;
                for (i = 0; i < $scope.users.length; ++i) {
                    added = false;
                    for (j = 0; j < rats.length; ++j) {
                        if (rats[j].player === $scope.users[i]._id) {
                            $scope.vals.push({
                                _id: rats[j]._id,
                                user: rats[j].user,
                                player: rats[j].player,
                                value: rats[j].value
                            });
                            added = true;
                            break;
                        }
                    }
                    if (added === false) {
                        $scope.vals.push({user: $scope.currentUser._id, player: $scope.users[i]._id, value: 0})
                    }
                }
            });
        }

        getRatings();


        $scope.setRating = function(id) {
            Rating.save($scope.vals[id], function(){
                getRatings();
            });
        };

    }]);