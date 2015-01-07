angular.module('MyApp', ['ngCookies', 'ngResource', 'ngMessages', 'ngRoute', 'ui.router', 'mgcrea.ngStrap', 'ngSanitize', 'ui.select', 'mwl.calendar'])
    .config(['$locationProvider', '$routeProvider', '$stateProvider', '$urlRouterProvider', '$compileProvider',
        function($locationProvider, $routeProvider, $stateProvider, $urlRouterProvider, $compileProvider) {
        $locationProvider.html5Mode(true);
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|whatsapp):/);

        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('main', {
                //url: "/",
                templateUrl: "views/home.html",
                controller: 'MainCtrl'
                /*views: {
                    'principal': {
                        templateUrl: 'views/valoraciones.html',
                        controller: 'ValoracionesCtrl'
                    },
                    'calendar': {
                        templateUrl: 'views/calendar.html',
                        controller: 'CalendarCtrl'
                    }
                }*/
            })
            .state('main.articles', {
                url: "/",
                templateUrl: "views/viewWeek.html",
                controller: 'ArticlesCtrl'
            })
            .state('main.valoraciones', {
                url: "/valoraciones",
                templateUrl: "views/valoraciones.html",
                controller: 'ValoracionesCtrl'
            })
            .state('main.addWeek', {
                url: "/weeks/add",
                templateUrl: "views/addWeek.html",
                controller: 'AddWeekCtrl'
            })
            .state('main.viewWeek', {
                url: "/weeks/:id",
                templateUrl: "views/viewWeek.html",
                controller: 'ViewWeekCtrl'
            })
            .state('main.updateWeek', {
                url: "/weeks/update/:id",
                templateUrl: "views/addWeek.html",
                controller: 'UpdateWeekCtrl'
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
            });
    }]);