angular.module('MyApp')
    .controller('AdminUsersCtrl', ['$scope', '$location', 'User', 'UserToggle', function($scope, $location, User, UserToggle) {

        $scope.users = User.query({all:true});

        $scope.toggleClicked = function(userId){
            UserToggle.get({ _id: userId });
        };

    }]);