angular.module('MyApp', ['ngCookies', 'ngResource', 'ngMessages', 'ngRoute', 'ui.router', 'ngAnimate',
    'mgcrea.ngStrap', 'ngSanitize', 'ui.select', 'mwl.calendar'])
    .constant('AUTH_EVENTS', {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
    })

    .config(['$locationProvider', '$routeProvider', '$stateProvider', '$urlRouterProvider', '$compileProvider', '$httpProvider',
        function($locationProvider, $routeProvider, $stateProvider, $urlRouterProvider, $compileProvider, $httpProvider) {
        $locationProvider.html5Mode(true);
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|whatsapp):/);

        $httpProvider.interceptors.push([
            '$injector',
            function ($injector) {
                return $injector.get('AuthInterceptor');
            }
        ]);

        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('main', {
                //url: "/",
                templateUrl: "views/home.html",
                controller: 'CalendarCtrl'
            })
            .state('main.nextWeek', {
                url: "/",
                templateUrl: "views/viewWeek.html",
                controller: 'ViewWeekCtrl'
            })
            .state('main.valoraciones', {
                url: "/valoraciones",
                templateUrl: "views/valoraciones.html",
                controller: 'ValoracionesCtrl',
                authorizedRoles: ['user']
            })
            .state('main.addWeek', {
                url: "/weeks/add",
                templateUrl: "views/addWeek.html",
                controller: 'AddWeekCtrl',
                authorizedRoles: ['admin']
            })
            .state('main.viewWeek', {
                url: "/weeks/:id",
                templateUrl: "views/viewWeek.html",
                controller: 'ViewWeekCtrl'
            })
            .state('main.updateWeek', {
                url: "/weeks/update/:id",
                templateUrl: "views/addWeek.html",
                controller: 'UpdateWeekCtrl',
                authorizedRoles: ['admin']
            })
            .state('login', {
                url: "/login",
                templateUrl: "views/login.html",
                controller: 'LoginCtrl'
            })
            .state('signup', {
                url: "/signup",
                templateUrl: "views/signup.html",
                controller: 'SignupCtrl'
            }).state('adminUsers', {
                url: "/admin/users",
                templateUrl: "views/adminUsers.html",
                controller: 'AdminUsersCtrl',
                authorizedRoles: ['admin']
            }).state('upload', {
                url: "/upload",
                templateUrl: "views/upload.html",
                controller: 'UploadCtrl'
            });


    }])


    .run(['$rootScope', 'AUTH_EVENTS', 'Auth',
        function ($rootScope, AUTH_EVENTS, Auth) {
            $rootScope.$on('$stateChangeStart', function (event, next) {
                if(typeof next.authorizedRoles !== "undefined") {
                    if (!Auth.isAuthorized(next.authorizedRoles)) {

                        if (Auth.isAuthenticated()) {
                            event.preventDefault();
                            $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                        } else {
                            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                        }
                    }
                }
            });
    }])
;