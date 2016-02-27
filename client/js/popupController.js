/**
 * Created by Chen on 23/02/2016.
 */

angular.module('tlushim-auto')
    .controller('popupController', function ($scope, managerService) {

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

        function updateUserData(callBack) {
            var userData = {
                'idNum': $scope.idNum
                , 'password': $scope.password
            }

            managerService.setUserData(userData);

            if (callBack)
                callBack(userData);
        }

        $scope.enterTlushim = function() {
            updateUserData(function(userData) {
                managerService.tlushimLogin(userData);
            })
        }

        $scope.exitTlushim = function() {
            updateUserData(function(userData) {
                managerService.tlushimLogout(userData);
            })
        }
    });

