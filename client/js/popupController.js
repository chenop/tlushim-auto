/**
 * Created by Chen on 23/02/2016.
 */

angular.module('tlushim-auto')
    .controller('popupController', function ($scope, notificationService, chromeApi) {

        var lastEnter;

        init();

        function init() {
            managerService.getUserData(function(data) {
                $scope.idNum = data['idNum'];
                $scope.password = data['password'];
                $scope.$apply();
            });
        }

        function isUserEnteredToday() {
            if (!lastEnter)
                return false;

            return false;
        }

        function isWorkDay() {
            return true;
        }

        $scope.shouldDisable = function() {
            return !($scope.idNum && $scope.password);
        }

        $scope.enterTlushim = function() {
            var data = {
                'idNum': $scope.idNum
                , 'password': $scope.password
            }

            managerService.setUserData(data);

            managerService.displayEnterNotification();
        }

        $scope.exitTlushim = function() {
            managerService.displayExitNotification();
        }


    });

