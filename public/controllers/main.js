angular.module('MyApp')
    .controller('MainCtrl', ['$scope', '$location', 'User', 'Rating', 'Week', function($scope, $location, User, Rating, Week) {
        /*$scope.max = 5;
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
*/

        moment.locale('es');

        $scope.events = [];
        var currentYear = moment().year();
        var currentMonth = moment().month();

        $scope.weeks = Week.query(function(){
            var i;
            $scope.events = [];
            for(i=0; i<$scope.weeks.length; ++i){
                $scope.events.push({id:$scope.weeks[i]._id, type: 'info', starts_at: new Date($scope.weeks[i].date), ends_at: new Date($scope.weeks[i].date)});
            }
        });

        /*$scope.events = [
            {
                title: 'Event 1',
                type: 'warning',
                starts_at: new Date(currentYear,currentMonth,25,8,30),
                ends_at: new Date(currentYear,currentMonth,25,9,30)
            },
            {
                title: 'Event 2',
                type: 'info',
                starts_at: new Date(currentYear,currentMonth,19,7,30),
                ends_at: new Date(currentYear,currentMonth,25,9,30)
            },
            {
                title: 'This is a really long event title',
                type: 'important',
                starts_at: new Date(currentYear,currentMonth,25,6,30),
                ends_at: new Date(currentYear,currentMonth,25,6,60)
            },
        ];*/


        $scope.calendarView = 'month';
        $scope.calendarDay = new Date();

        function showModal(action, event) {
            /*$modal.open({
                templateUrl: 'modalContent.html',
                controller: function($scope, $modalInstance) {
                    $scope.$modalInstance = $modalInstance;
                    $scope.action = action;
                    $scope.event = event;
                }
            });*/
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