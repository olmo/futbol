angular.module('MyApp')
    .controller('LoginCtrl', ['$scope', '$rootScope', 'Auth', function($scope, $rootScope, Auth) {
        $scope.login = function() {
            Auth.login({
                username: $scope.username,
                password: $scope.password
            });

        };
    }]);