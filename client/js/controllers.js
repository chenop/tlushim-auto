/**
 * Created by Chen on 23/02/2016.
 */

angular.module('tlushim-auto')
    .controller('mainController', function ($scope) {

        var lastEnter;
        init();

        function init() {
            debugger;
            console.log('init');
            chrome.storage.sync.get(['idNum', 'password'], function (items) {
                // Notify that we saved.
                console.log('items were retrieved')
                $scope.idNum = items['idNum'];
                $scope.password = items['password'];
                lastEnter = items['lastEnter'];
                $scope.$apply();

                if (isWorkDay() && !isUserEnteredToday()) {
                    console.log("You didn't enter today!")
                    chrome.storage.sync.set({'lastEnter': "today"});
                }
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
            chrome.storage.sync.set({'idNum': $scope.idNum}, function() {
                // Notify that we saved.
                console.log('id was saved')
            });
            chrome.storage.sync.set({'password': $scope.password}, function() {
                // Notify that we saved.
                console.log('password was saved')
            });


        }

        $scope.exitTlushim = function() {
            console.log("exit");
        }


    });

