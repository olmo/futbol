angular.module('MyApp')
    .controller('SignupCtrl', ['$scope', 'Auth', function($scope, Auth) {
        $scope.signup = function() {
            Auth.signup({
                username: $scope.username,
                password: $scope.password,
                name: $scope.name
            });
        };
    }]);