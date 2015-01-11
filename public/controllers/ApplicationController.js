angular.module('MyApp')
    .controller('ApplicationController', ['$scope', 'Auth', 'AUTH_EVENTS', '$location', '$alert',
        function ($scope, Auth, AUTH_EVENTS, $location, $alert) {
            $scope.isAuthenticated = Auth.isAuthenticated();
            $scope.isAuthorized = Auth.isAuthorized;

            $scope.$on(AUTH_EVENTS.notAuthenticated, function(){
                $location.path('/login');
            });
            $scope.$on(AUTH_EVENTS.sessionTimeout, function(){
                $location.path('/login');
            });
            $scope.$on(AUTH_EVENTS.notAuthorized, function(){
                $alert({
                    title: '¡Error!',
                    content: 'No tienes autorización para acceder a esta zona.',
                    placement: 'top-right',
                    type: 'danger',
                    duration: 3
                });
            });


        }
    ]);