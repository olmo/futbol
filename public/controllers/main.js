angular.module('MyApp')
    .controller('MainCtrl', ['$scope', '$location', 'User', 'Rating', 'Week', function($scope, $location, User, Rating, Week) {

        moment.locale('es');

        $scope.events = [];

        $scope.weeks = Week.query(function(){
            var i;
            $scope.events = [];
            for(i=0; i<$scope.weeks.length; ++i){
                $scope.events.push({id:$scope.weeks[i]._id, type: 'info', starts_at: new Date($scope.weeks[i].date), ends_at: new Date($scope.weeks[i].date)});
            }
        });



        $scope.calendarView = 'month';
        $scope.calendarDay = new Date();

        function showModal(action, event) {

        }

        $scope.eventClicked = function(event) {
            if(event !== undefined) {
                $location.path('weeks/' + event.id);
            }
        };

        $scope.eventEdited = function(event) {
            showModal('Edited', event);
        };

        $scope.eventDeleted = function(event) {
            showModal('Deleted', event);
        };

        $scope.setCalendarToToday = function() {
            $scope.calendarDay = new Date();
        };

        $scope.toggle = function($event, field, event) {
            $event.preventDefault();
            $event.stopPropagation();

            event[field] = !event[field];
        };


    }]);