/**
 * Created by Chen on 23/02/2016.
 */

angular.module('tlushim-auto')
    .controller('popupController', function ($scope, managerService, $timeout) {

        var lastEnter;

        function init() {
            $scope.shouldShowPassword = false;
            $scope.calcPasswordVisibility();
            $scope.loading = false;

            managerService.getUserData(function(data) {
                $scope.idNum = data['idNum'];
                $scope.password = data['password'];
                $scope.selectedMission = (!data['selectedMission']) ? null : data['selectedMission'];

                if ($scope.idNum && $scope.password) {
                    var userData = {
                        'idNum': $scope.idNum
                        , 'password': $scope.password
                        , 'selectedMission': $scope.selectedMission
                    }

                    managerService.fetchMissions(userData)
                        .then(function (missions) {
                            $scope.missions = missions;
                        })
                }

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

        $scope.calcPasswordVisibility = function() {
            if ($scope.shouldShowPassword === true)
                $scope.inputType = 'text';
            else
                $scope.inputType = 'password';
        }

        $scope.shouldDisable = function() {
            return !($scope.idNum && $scope.password);
        }

        function updateUserData(callBack) {
            var userData = {
                'idNum': $scope.idNum
                , 'password': $scope.password
                , 'selectedMission': $scope.selectedMission
            }

            managerService.setUserData(userData, function() {
                if (callBack)
                    callBack(userData);
            });

        }

        $scope.enterTlushim = function() {
            $scope.enterLoading = true;

            updateUserData(function(userData) {
                return managerService.tlushimLogin(userData, function() {
                    $scope.enterLoading = false;
                });
            })
        }

        $scope.exitTlushim = function() {
            $scope.exitLoading = true;

            updateUserData(function(userData) {
                managerService.tlushimLogout(userData, function() {
                    $scope.exitLoading = false;
                });
            })
        }

        init();
    });

