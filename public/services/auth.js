angular.module('MyApp')
    .factory('Auth', ['$http', '$location', '$rootScope', '$cookieStore', '$alert',
        function($http, $location, $rootScope, $cookieStore, $alert) {
            $rootScope.currentUser = $cookieStore.get('user');
            $cookieStore.remove('user');

            return {
                login: function(user) {
                    return $http.post('/api/users/login', user)
                        .success(function(data) {
                            $rootScope.currentUser = data;
                            $location.path('/');

                            $alert({
                                title: '¡Yeah!',
                                content: 'Has entrado correctamente.',
                                placement: 'top-right',
                                type: 'success',
                                duration: 3
                            });
                        })
                        .error(function() {
                            $alert({
                                title: '¡Error!',
                                content: 'Nombre de usuario o contraseña incorrecto.',
                                placement: 'top-right',
                                type: 'danger',
                                duration: 3
                            });
                        });
                },
                signup: function(user) {
                    return $http.post('/api/users/signup', user)
                        .success(function() {
                            $location.path('/login');

                            $alert({
                                title: '¡Yeah!',
                                content: 'Tu cuenta se ha creado correctamente.',
                                placement: 'top-right',
                                type: 'success',
                                duration: 3
                            });
                        })
                        .error(function(response) {
                            $alert({
                                title: '¡Error!',
                                content: response.data,
                                placement: 'top-right',
                                type: 'danger',
                                duration: 3
                            });
                        });
                },
                logout: function() {
                    return $http.get('/api/users/logout').success(function() {
                        $rootScope.currentUser = null;
                        $cookieStore.remove('user');
                        $alert({
                            content: 'Te has desconectado.',
                            placement: 'top-right',
                            type: 'info',
                            duration: 3
                        });
                    });
                }
            };
        }]);