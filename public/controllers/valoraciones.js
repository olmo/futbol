angular.module('MyApp')
    .controller('ValoracionesCtrl', ['$scope', '$location', 'User', 'Rating', function($scope, $location, User, Rating) {
        $scope.max = 5;
        $scope.isReadonly = true;
        $scope.rate = 2;
        $scope.animClass = 'animRotate';

        function getRatings() {

            $scope.vals = [];

            $scope.users = User.query(function () {
                var ratings = Rating.query(function () {
                    var i, j;
                    var added = false;
                    for (i = 0; i < $scope.users.length; ++i) {
                        added = false;
                        for (j = 0; j < ratings.length; ++j) {
                            if (ratings[j].player === $scope.users[i]._id) {
                                $scope.vals.push({
                                    _id: ratings[j]._id,
                                    user: ratings[j].user,
                                    player: ratings[j].player,
                                    value: ratings[j].value
                                });
                                added = true;
                                break;
                            }
                        }
                        if (added === false) {
                            $scope.vals.push({user: $scope.currentUser._id, player: $scope.users[i]._id, value: 0})
                        }
                    }

                    $scope.isReadonly = false;
                });
            });
        }

        getRatings();


        $scope.setRating = function(id) {
            var element = Rating.save($scope.vals[id], function(){
                $scope.vals[id]._id = element._id;
                $scope.vals[id].value = element.value;
            });
        };

    }]);