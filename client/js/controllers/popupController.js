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
                $scope.isNotificationAllowed = false; //managerService.isNotificationAllowed();

                if ($scope.idNum && $scope.password) {
                    var userData = {
                        'idNum': $scope.idNum
                        , 'password': $scope.password
                        , 'selectedMission': $scope.selectedMission
                    }

                    managerService.fetchMissions(userData)
                        .then(function (missions) {
                            $scope.missions = missions;
                            if (!$scope.selectedMission)
                                $scope.selectedMission = $scope.missions[0];
                        })
                }
            });
        }

        $scope.requestNotificationPermission = function() {
            managerService.requestNotificationPermission();
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

        function getUserData() {
            return {
                'idNum': $scope.idNum
                , 'password': $scope.password
                , 'selectedMission': $scope.selectedMission
            }
        }
        $scope.enterTlushim = function() {
            $scope.enterLoading = true;

            managerService.tlushimLogin(getUserData(), function () {
                $scope.enterLoading = false;
            });
        }

        $scope.exitTlushim = function() {
            $scope.exitLoading = true;

            managerService.tlushimLogout(getUserData(), function () {
                $scope.exitLoading = false;
            });
        }

        init();
    });

